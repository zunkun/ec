const Trips = require('../models/Trips');
const rp = require('request-promise');
const config = require('../config');
const dingding = require('../core/dingding');
const util = require('../core/util');
const constants = require('../config/constants');
const btripPaths = constants.btrip;
const cron = require('node-cron');

class ScheduleTrip {
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

	/**
   * 获取待写入商旅的申请单列表
   */
	static async getTripLists () {
		// 正在审批中的申请单
		let trips = await Trips.find({ status: { $in: [ 20, 41 ] }, finishTime: { $gt: Date.now() } });
		// 待写入商旅的申请单
		let tripLists = [];
		for (let trip of trips) {
			let instance = await this.getInstance(trip.processInstanceId);
			// 撤销申请单
			if (instance.status === 'TERMINATED') {
				await Trips.updateOne({ _id: trip.id }, { $set: { status: 50 } });
			}
			// 审批通过
			if (instance.status === 'COMPLETED') {
				if (instance.result === 'refuse') {
					await Trips.updateOne({ _id: trip.id }, { $set: { status: 31 } });
				}

				if (instance.result === 'agree') {
					await Trips.updateOne({ _id: trip.id }, { $set: { status: 30 } });

					tripLists.push(trip);
				}
			}
			await util.wait(50);
		}
		return tripLists;
	}

	/**
   * 审批单写入商旅
   * @param {Object} trip 待写入商旅的审批单信息
   */
	static async sync2Btrip (trip) {
		const btripData = {
			thirdpart_apply_id: trip.processInstanceId,
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

	static async syncTrip () {
		const tripLists = await this.getTripLists();

		for (let trip of tripLists) {
			try {
				await this.sync2Btrip(trip);
			} catch (error) {
				console.log(error);
			}
			util.wait(50);
		}
		return Promise.resolve();
	}

	static async start () {
		await this.syncTrip();
		const task = cron.schedule(config.tripCorn, async () => {
			await this.syncTrip();
		});
		task.start();
	}
}

module.exports = ScheduleTrip.start();
