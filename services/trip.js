const Trips = require('../models/Trips');
const rp = require('request-promise');
const config = require('../config');
const dingding = require('../core/dingding');
const constants = require('../config/constants');
const btripPaths = constants.btrip;
const Staffs = require('../models/Staffs');
const moment = require('moment');
class TripService {
	/**
   * 获取审批单详情
   * @param {String} processInstanceId 审批单id
   */
	static async getInstance (processInstanceId) {
		let accessToken = await dingding.getAccessToken();
		return rp({
			uri: `https://oapi.dingtalk.com/topapi/processinstance/get?access_token=${accessToken}`,
			method: 'POST',
			body: { process_instance_id: processInstanceId },
			json: true
		}).then(res => {
			return res.process_instance;
		}).catch(error => {
			return Promise.reject(error);
		});
	}

	static async createProcess (trip) {
		const data = {
			process_code: config.processCode,
			originator_user_id: trip.userId,
			dept_id: trip.deptId,
			approvers: '4508346521365159'
		};
		let components = [
			{
				name: '出差事由',
				value: trip.reason
			},
			{
				name: '部门预算',
				value: trip.balance
			},
			{
				name: 'SYS-ATC',
				value: JSON.stringify({
					startTime: trip.startTime,
					finishTime: trip.finishTime,
					unit: 'day'
				})
			}
		];
		if (trip.remark) {
			components.push({ name: '出差备注', value: trip.remark });
		}
		if (trip.fellowUserIds && trip.fellowUserIds.length) {
			components.push({ name: '同行人', value: JSON.stringify(trip.fellowUserIds) });
		}
		const details = [];
		for (let it of trip.itineraries) {
			let detail = [];

			detail.push({ name: '交通工具', value: it.trafficTypeName });
			detail.push({ name: '单程往返', value: it.tripwayName });
			detail.push({ name: '出发城市', value: it.depCity });
			detail.push({ name: '目的城市', value: '信阳' });
			detail.push({ name: '开始时间', value: it.depDateStr });
			detail.push({ name: '结束时间', value: it.arrDateStr });
			detail.push({ name: '时长', value: it.tripDay });

			details.push(detail);
		}
		components.push({ name: '行程', value: JSON.stringify(details) });

		data.form_component_values = components;

		console.log('开始发起审批');
		let accessToken = await dingding.getAccessToken();
		let uri = `https://oapi.dingtalk.com/topapi/processinstance/create?access_token=${accessToken}`;
		try {
			let res = await rp({
				uri,
				method: 'POST',
				body: data,
				header: { 'Content-Type': 'application/json' },
				json: true
			});
			if (res.errcode !== 0) {
				await Trips.updateOne({ _id: trip.id, status: 10 }, { $set: { status: 21 } });
				return Promise.reject('生成审批单失败', res);
			}
			let processInstanceId = res.process_instance_id;
			let instance = await TripService.getInstance(processInstanceId);
			await Trips.updateOne({ _id: trip._id, status: 10 }, { $set: { processInstanceId, businessId: instance.business_id, bizAction: instance.biz_action || 'NONE', status: 20 } });
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	/**
	 * 组织审批单信息
	 * @param {String} processInstanceId 审批单ID
	 * @param {Object} trip 审批单信息
	 */
	static async manageBtripData (processInstanceId, trip) {
		const btripData = {
			thirdpart_apply_id: processInstanceId,
			userid: trip.userId,
			user_name: trip.userName,
			corpid: config.corpId,
			corp_name: config.corpName,
			deptid: trip.deptId,
			dept_name: trip.deptName,
			trip_title: '商旅出差',
			trip_cause: trip.reason,
			traveler_list: [ {
				userid: trip.userId,
				user_name: trip.userName
			} ],
			itinerary_list: [],
			trip_day: trip.tripDay,
			status: 1
		};

		let itLists = [];
		for (let it of trip.itineraries) {
			itLists.push({
				trip_way: it.tripwayId,
				itinerary_id: it._id,
				traffic_type: it.trafficTypeId,
				dep_city: it.depCity,
				arr_city: it.arrCity,
				cost_center_id: config.costcenter,
				invoice_id: config.invoice,
				dep_date: `${it.depDateStr} 00:00:00`,
				arr_date: `${it.arrDateStr} 23:59:59`
			});
		}

		btripData.itinerary_list = itLists;
		return btripData;
	}

	/**
   * 审批单写入商旅
	 * @param {String} 审批单ID
   * @param {Object} trip 待写入商旅的审批单信息
   */
	static async sync2Btrip (processInstanceId, trip) {
		const btripData = await this.manageBtripData(processInstanceId, trip);
		// 写入商旅
		let btripRes = await dingding.btrip(btripPaths.approvalNew, btripData);
		if (btripRes.errcode !== 0) {
			let error = `【失败】${trip.userName}的出差写入商旅审批单失败`;
			await Trips.updateOne({ _id: trip._id }, { $set: { status: 41 } });
			console.error(btripRes);
			return Promise.reject(error);
		}
		console.log(`【成功】${trip.userName} 的出差 写入商旅审批单成功`);
		await Trips.updateOne({ _id: trip._id }, { $set: { status: 40 } });
	}

	/**
	 * 商旅审批单修改
	 * @param {String} oldProcessInstanceId 旧的审批单ID
	 * @param {Object} trip 新的审批单信息
	 */
	static async update2Btrip (oldProcessInstanceId, trip) {
		const btripData = await this.manageBtripData(oldProcessInstanceId, trip);

		// 修改商旅审批单
		let btripRes = await dingding.btrip(btripPaths.approvalUpdate, btripData);
		if (btripRes.errcode !== 0) {
			let error = `【失败】${trip.userName}的出差更新到商旅审批单失败`;
			await Trips.updateOne({ processInstanceId: trip.processInstanceId }, { $set: { status: 41 } });
			console.error(btripRes);
			return Promise.reject(error);
		}
		console.log(`【成功】${trip.userName} 的出差更新到商旅审批单成功`);
		await Trips.updateOne({ processInstanceId: trip.processInstanceId }, { $set: { status: 40 } });
	}

	/**
	 * 删除商旅审批单
	 * @param {Object} trip 审批单信息
	 */
	static async cancelBtrip (trip) {
		const rq = {
			thirdpart_apply_id: trip.processInstanceId,
			operate_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			status: 4,
			userid: trip.approvalUserIds[0],
			note: '撤销审批单',
			corpid: config.corpId
		};

		// 删除商旅审批单
		let btripRes = await dingding.btrip(btripPaths.approvalUpdate, rq);
		if (btripRes.errcode !== 0) {
			let error = `【失败】${trip.processInstanceId} 删除商旅审批单失败`;
			console.error(error);
			return Promise.reject(error);
		}
		console.log(`【成功】${trip.processInstanceId} 删除商旅审批单成功`);
		return Promise.resolve();
	}

	/**
	 * 根据审批单同步到本地出差信息
	 * @param {String} processInstanceId 审批单ID
	 * @param {String} instance 审批单
	 */
	static async syncUpdateTrip (processInstanceId, instance) {
		if (!instance) {
			instance = await this.getInstance(processInstanceId);
		}
		let trip = await Trips.findOne({ processInstanceId });
		if (trip) {
			return Promise.resolve(trip);
		}
		const businessId = instance.business_id;
		const bizAction = instance.biz_action;
		const userId = instance.originator_userid;
		const deptId = Math.abs(Number(instance.originator_dept_id));
		let staff = await Staffs.findOne({ userId });
		let oldTrip = await Trips.findOne({ businessId, bizAction: 'NONE' });
		if (!oldTrip) {
			return Promise.reject('没有找到旧的审批单信息');
		}
		// 组织审批单数据
		const tripData = {
			processInstanceId,
			referProcessInstanceId: oldTrip.processInstanceId,
			userId,
			userName: staff.userName,
			deptId,
			deptName: instance.originator_dept_name,
			result: instance.result,
			approvalStatus: instance.status,
			businessId,
			approvalUserIds: instance.approver_userids,
			bizAction,
			status: 20
		};

		// 上傳的表單數據
		const fcvs = instance.form_component_values;

		for (let fcv of fcvs) {
			let name = fcv.name;
			switch (name) {
			case '部门预算':
				tripData.balance = Number(fcv.value);
				break;
			case '出差事由':
				tripData.reason = fcv.value;
				break;
			case '出差备注':
				tripData.remark = fcv.value;
				break;
			case '同行人':
				tripData.approvalUserIds = fcv.value ? fcv.value.split(',') : [];
				break;
			case '["开始时间","结束时间"]':
				const value = JSON.parse(fcv.value);
				tripData.startTime = value[0];
				tripData.finishTime = value[1];
				tripData.tripDay = Math.abs(Number(value[2]));
				break;
			case '行程':
				const itineraries = [];
				const itValues = JSON.parse(fcv.value);
				for (let itValue of itValues) {
					const it = {};
					let rowValues = itValue.rowValue;

					for (let rowValue of rowValues) {
						let label = rowValue.label;
						let value = rowValue.value;
						switch (label) {
						case '交通工具':
							it.trafficTypeName = value;
							if (value === '飞机') { it.trafficTypeId = 0; break; }
							if (value === '火车') { it.trafficTypeId = 1; break; }
							if (value === '汽车') { it.trafficTypeId = 2; break; }
							it.trafficTypeId = 3;
							break;
						case '单程往返':
							it.tripwayName = value;
							it.tripwayId = value === '单程' ? 0 : 1;
							break;
						case '出发城市':
							it.depCity = value;
							break;
						case '目的城市':
							it.arrCity = value;
							break;
						case '开始时间':
							it.depDateStr = value;
							break;
						case '结束时间':
							it.arrDateStr = value;
							break;
						case '时长':
							it.tripDay = Math.abs(Number(value));
							break;
						}
					}

					itineraries.push(it);
				}

				tripData.itineraries = itineraries;
				break;
			default:
				break;
			}
		}

		// 生成新的差旅数据
		trip = await Trips.create(tripData);

		return Promise.resolve(trip);
	}
}

module.exports = TripService;
