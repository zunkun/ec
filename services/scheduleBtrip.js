const dingding = require('../core/dingding');
const FlightOrder = require('../models/FlightOrder');
const TrainOrder = require('../models/TrainOrder');
const VehicleOrder = require('../models/VehicleOrder');
const HotelOrder = require('../models/HotelOrder');

const Sync = require('../models/Sync');
const config = require('../config');
const cron = require('node-cron');
const util = require('../core/util');
const constants = require('../config/constants');
const btripPaths = constants.btrip;

// 由于商旅存在退票的情况，导致费用不好计算把控，所以，每次同步都同步每天的

class ScheduleBtrip {
	constructor () {
		this.dateLists = [];
	}

	async start () {
		await this.syncService();
		const task = cron.schedule(config.btripCron, async () => {
			await this.syncService();
		});
		task.start();
	}

	async syncService () {
		let startTime = Date.now();
		this.getDateLists();
		for (let date of this.dateLists) {
			await this.syncBtripHistory(date);
			await util.wait(200);
		}
		console.log(`【完成】${config.corpName} 截止目前所有票务同步完成, 用时 ${(Date.now() - startTime) / 1000} s`);
	}

	/**
	 * 獲取日期列表
	 */
	getDateLists () {
		let date = new Date();
		let year = date.getFullYear();
		let currentMonth = date.getMonth() + 1;
		let currentDay = date.getDate();

		for (let month = 1; month <= currentMonth - 1; month++) {
			let monthDays = new Date(year, month, 0).getDate();
			for (let day = 1; day <= monthDays; day++) {
				this.dateLists.push({ year: `${year}`, month: month >= 10 ? `${month}` : `0${month}`, day: day >= 10 ? `${day}` : `0${day}` });
			}
		}

		for (let day = 1; day <= currentDay; day++) {
			this.dateLists.push({ year: `${year}`, month: currentMonth >= 10 ? `${currentMonth}` : `0${currentMonth}`, day: day >= 10 ? `${day}` : `0${day}` });
		}
	}

	computeFee (priceList) {
		let total = 0;
		for (let priceInfo of priceList) {
			if (priceInfo.type === 1) {
				total += Number(priceInfo.price);
			} else {
				total -= Number(priceInfo.price);
			}
		}
		return total;
	}

	/**
	 *獲取商旅歷史數據
	 * @param {Object} date 日期對象 {year, month, day}
	 */
	async syncBtripHistory (date) {
		const { year, month, day } = date;
		const rq = {
			start_time: `${year}-${month}-${day} 00:00:00`,
			end_time: `${year}-${month}-${day} 23:59:59`,
			page_size: 50,
			corpid: config.corpId
		};
		// 同步机票
		await this.syncFlight(date, rq);
		// 同步火车票
		await this.syncTrain(date, rq);
		// 同步用车
		await this.syncVehicle(date, rq);
		// 同步酒店订单
		await this.syncHotel(date, rq);
	}

	/**
	 * 获取商旅机票历史数据
	 */
	async syncFlight (date, rq) {
		const { year, month, day } = date;
		let resData = await this.getFlightData([], rq, 1);
		if (!resData.length) {
			console.log(`【机票】${year}-${month}-${day} ${config.corpName}  没有机票信息`);
		} else {
			console.log(`【机票】开始保存${year}-${month}-${day} ${config.corpName}  机票信息`);
			for (let flight of resData) {
				if (!flight.price_info_list) {
					continue;
				}
				flight.year = year;
				flight.month = month;
				flight.day = day;
				flight.total_fee = this.computeFee(flight.price_info_list);

				await FlightOrder.updateOne({ id: flight.id, apply_id: flight.apply_id, corpid: flight.corpid }, flight, { upsert: true });
			}
		}
		await Sync.updateOne({ year, month, day, type: 2 }, { year, month, day, type: 2, status: 1 }, { upsert: true });
	}

	/**
	 * 请求商旅某天所有机票数据
	 * @param {Array} resData 某天机票历史数据
	 * @param {Object} rq 请求机票数据参数
	 * @param {Number} page 清求第几页数据
	 */
	async getFlightData (resData = [], rq, page = 1) {
		rq.page = page;
		let res = await dingding.btrip(btripPaths.flight, rq);
		if (res.errcode !== 0 || !res.flight_order_list.length) {
			return resData;
		}
		resData = resData.concat(res.flight_order_list);
		if (res.flight_order_list.length < 50) {
			return resData;
		}
		await util.wait(200);
		page += 1;
		let data = await this.getFlightData(resData, rq, page);
		return data;
	}

	/**
	 * 获取商旅火车票历史数据
	 */
	async syncTrain (date, rq) {
		const { year, month, day } = date;
		let resData = await this.getTrainData([], rq, 1);
		if (!resData.length) {
			console.log(`【火车】${year}-${month}-${day} ${config.corpName}  没有火车票信息`);
		} else {
			console.log(`【火车】开始保存${year}-${month}-${day} ${config.corpName}  火车票信息`);
			for (let train of resData) {
				if (!train.price_info_list) {
					continue;
				}
				train.year = year;
				train.month = month;
				train.day = day;
				train.total_fee = this.computeFee(train.price_info_list);
				await TrainOrder.updateOne({ id: train.id, apply_id: train.apply_id, corpid: train.corpid }, train, { upsert: true });
			}
		}
		await Sync.updateOne({ year, month, day, type: 3 }, { year, month, day, type: 3, status: 1 }, { upsert: true });
	}

	/**
	 * 请求商旅某天所有火车票数据
	 * @param {Array} resData 某天火车票历史数据
	 * @param {Object} rq 请求火车票数据参数
	 * @param {Number} page 清求第几页数据
	 */
	async getTrainData (resData = [], rq, page = 1) {
		rq.page = page;
		let res = await dingding.btrip(btripPaths.train, rq);
		if (res.errcode !== 0 || !res.train_order_list.length) {
			return resData;
		}
		resData = resData.concat(res.train_order_list);
		if (res.train_order_list.length < 50) {
			return resData;
		}
		await util.wait(200);
		page += 1;
		let data = await this.getTrainData(resData, rq, page);
		return data;
	}

	/**
	 * 获取商旅用车历史数据
	 */
	async syncVehicle (date, rq) {
		const { year, month, day } = date;
		let resData = await this.getVehicleData([], rq, 1);
		if (!resData.length) {
			console.log(`【用车】${year}-${month}-${day} ${config.corpName}  没有用车信息`);
		} else {
			console.log(`【用车】开始保存${year}-${month}-${day} ${config.corpName}  用车信息`);
			for (let vehicle of resData) {
				if (!vehicle.price_info_list) {
					continue;
				}
				vehicle.year = year;
				vehicle.month = month;
				vehicle.day = day;
				vehicle.total_fee = this.computeFee(vehicle.price_info_list);
				await VehicleOrder.updateOne({ id: vehicle.id, apply_id: vehicle.apply_id, corpid: vehicle.corpid }, vehicle, { upsert: true });
			}
		}
		await Sync.updateOne({ year, month, day, type: 3 }, { year, month, day, type: 4, status: 1 }, { upsert: true });
	}

	/**
	 * 请求商旅某天所有用车数据
	 * @param {Array} resData 某天用车历史数据
	 * @param {Object} rq 请求用车数据参数
	 * @param {Number} page 清求第几页数据
	 */
	async getVehicleData (resData = [], rq, page = 1) {
		rq.page = page;
		let res = await dingding.btrip(btripPaths.vehicle, rq);
		if (res.errcode !== 0 || !res.vehicle_order_list.length) {
			return resData;
		}
		resData = resData.concat(res.vehicle_order_list);
		if (res.vehicle_order_list.length < 50) {
			return resData;
		}
		await util.wait(200);
		page += 1;
		let data = await this.getVehicleData(resData, rq, page);
		return data;
	}

	/**
	 * 获取商旅酒店订单历史数据
	 */
	async syncHotel (date, rq) {
		const { year, month, day } = date;
		let resData = await this.getHotelData([], rq, 1);
		if (!resData.length) {
			console.log(`【酒店】${year}-${month}-${day} ${config.corpName}  没有酒店信息`);
		} else {
			console.log(`【酒店】开始保存${year}-${month}-${day} ${config.corpName}  酒店信息`);
			for (let hotel of resData) {
				if (!hotel.price_info_list) {
					continue;
				}
				hotel.year = year;
				hotel.month = month;
				hotel.day = day;
				hotel.total_fee = this.computeFee(hotel.price_info_list);
				await HotelOrder.updateOne({ id: hotel.id, apply_id: hotel.apply_id, corpid: hotel.corpid }, hotel, { upsert: true });
			}
		}
		await Sync.updateOne({ year, month, day, type: 3 }, { year, month, day, type: 5, status: 1 }, { upsert: true });
	}

	/**
	 * 请求商旅某天所有酒店数据
	 * @param {Array} resData 某天酒店历史数据
	 * @param {Object} rq 请求酒店数据参数
	 * @param {Number} page 清求第几页数据
	 */
	async getHotelData (resData = [], rq, page = 1) {
		rq.page = page;
		let res = await dingding.btrip(btripPaths.hotel, rq);
		if (res.errcode !== 0 || !res.module.length) {
			return resData;
		}
		resData = resData.concat(res.module);
		if (res.module.length < 50) {
			return resData;
		}
		await util.wait(200);
		page += 1;
		let data = await this.getHotelData(resData, rq, page);
		return data;
	}
}

const scheduleBtrip = new ScheduleBtrip();

scheduleBtrip.start();
module.exports = scheduleBtrip;
