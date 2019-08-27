const Trips = require('../models/Trips');
const rp = require('request-promise');
const config = require('../config');
const dingding = require('../core/dingding');

class TripService {
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

			detail.push({ name: '交通工具', value: it.tripwayName });
			detail.push({ name: '单程往返', value: it.oneRound });
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
				return Promise.reject('生成审批单失败');
			}
			await Trips.updateOne({ _id: trip._id, status: 10 }, { $set: { processInstanceId: res.process_instance_id, status: 20 } });
			return Promise.resolve();
		} catch (error) {
			return Promise.reject(error);
		}
	}

	static async setA () {
		let trip = await Trips.findOne({ _id: '5d63a2668358673cd8902467' });
		await this.createProcess(trip);
	}
}

// TripService.setA();
module.exports = TripService;
