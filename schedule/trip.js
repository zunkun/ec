const Trips = require('../models/Trips');
const rp = require('request-promise');
const config = require('../config');
const dingding = require('../core/dingding');
const util = require('../core/util');
const fs = require('fs');
const path = require('path');

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
		let trips = await Trips.find({ status: 20 });
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
			await util.wait(500);
		}
		return tripLists;
	}

	/**
   * 审批单写入商旅
   * @param {Object} trip 待写入商旅的审批单信息
   */
	static async sync2Btrip (trip) {
		const btrpData = {
			thirdpart_apply_id: trip.id,
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
				// trip_way:
			});
		}
	}
}

ScheduleTrip.getTripLists();

module.exports = ScheduleTrip;
