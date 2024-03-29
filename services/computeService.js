const FlightOrder = require('../models/FlightOrder');
const TrainOrder = require('../models/TrainOrder');
const VehicleOrder = require('../models/VehicleOrder');
const HotelOrder = require('../models/HotelOrder');
const Depts = require('../models/Depts');
const BTripFee = require('../models/BTripFee');
const config = require('../config');
const util = require('../core/util');

class ComputeService {
	constructor () {
		let date = new Date();
		let currentMonth = date.getMonth() + 1;
		this.year = date.getFullYear();
		this.month = currentMonth >= 10 ? `${currentMonth}` : `0${currentMonth}`;
		this.day = date.getDate();
		this.deptMap = new Map();
	}
	async init () {
		let date = new Date();
		let currentMonth = date.getMonth() + 1;
		this.year = date.getFullYear();
		this.month = currentMonth >= 10 ? `${currentMonth}` : `0${currentMonth}`;
		this.day = date.getDate();

		let depts = await Depts.find({ corpId: config.corpId, year: this.year });
		for (let dept of depts) {
			this.deptMap.set(dept.deptId, {
				deptId: dept.deptId,
				deptName: dept.deptName,
				group: dept.group
			});
		}
	}

	async compute () {
		await this.init();
		await this.computeFees();
	}

	async computeFees () {
		let feeTypes = [
			{ type: 'flight', model: FlightOrder },
			{ type: 'train', model: TrainOrder },
			{ type: 'vehicle', model: VehicleOrder },
			{ type: 'hotel', model: HotelOrder }
		];
		for (let feeType of feeTypes) {
			let fees = await feeType.model.aggregate([
				{
					$match: { year: `${this.year}`, month: `${this.month}` }
				},
				{
					$group: {
						_id: { year: '$year', month: '$month', groupCode: '$groupCode', groupName: '$groupName' },
						total: { $sum: '$total_fee' }
					}
				}
			]);

			for (let fee of fees) {
				// let deptId = Number(fee._id.deptId);
				// let groupCode = fee._id.groupCode;
				// if (!this.deptMap.has(deptId) || !this.deptMap.get(deptId).group || !this.deptMap.get(deptId).group.code) {
				// 	throw new Error(`deptId: ${deptId} 部门没有对应的预算体`);
				// }
				console.log(`【开始】计算 ${fee._id.groupName} 的 ${feeType.type} 费用`);
				await util.wait(100);
				await BTripFee.updateOne({
					year: fee._id.year,
					month: fee._id.month,
					'group.code': fee._id.groupCode
				}, {
					$set: {
						year: fee._id.year,
						month: fee._id.month,
						group: {
							code: fee._id.groupCode,
							name: fee._id.groupName
						},
						[feeType.type]: fee.total
					}
				}, { upsert: true });
				// if (!btripFee) {
				// 	await BTripFee.create({
				// 		year: fee._id.year,
				// 		month: fee._id.month,
				// 		group: {
				// 			code: fee._id.groupCode,
				// 			name: fee._id.groupName
				// 		},
				// 		[feeType.type]: fee.total
				// 	});
				// } else {
				// 	await BTripFee.updateOne({
				// 		_id: btripFee._id
				// 	}, {
				// 		$set: {
				// 			year: fee._id.year,
				// 			month: fee._id.month,
				// 			group: {
				// 				code: fee._id.groupCode,
				// 				name: fee._id.groupName
				// 			},
				// 			[feeType.type]: fee.total
				// 		}
				// 	});
				// }
			}
		}
		console.log('【开始】计算总费用');
		let fees = await BTripFee.find({ corpId: this.corpId, year: this.year });
		for (let fee of fees) {
			await BTripFee.updateOne({ _id: fee._id }, {
				$set: {
					total: fee.flight + fee.train + fee.vehicle + fee.hotel
				}
			});
		}
		console.log('【成功】计算总费用');
	}
}

const computeService = new ComputeService();

module.exports = computeService;
