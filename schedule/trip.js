const Trips = require('../models/Trips');
const config = require('../config');
const util = require('../core/util');
const cron = require('node-cron');
const TripService = require('../services/trip');

class ScheduleTrip {
	/**
   * 获取待写入商旅的申请单列表
   */
	static async getTripLists () {
		// 正在审批中的申请单
		let trips = await Trips.find({ status: { $in: [ 20, 41 ] }, finishTime: { $gt: Date.now() } });
		// 待写入商旅的申请单
		let tripLists = [];
		for (let trip of trips) {
			let instance = await TripService.getInstance(trip.processInstanceId);
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

	static async syncTrip () {
		const tripLists = await this.getTripLists();

		for (let trip of tripLists) {
			try {
				await TripService.sync2Btrip(trip.processInstanceId, trip);
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

module.exports = ScheduleTrip();
