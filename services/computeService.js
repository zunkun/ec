const FlightOrder = require('../models/FlightOrder');
const TrainOrder = require('../models/TrainOrder');
const VehicleOrder = require('../models/VehicleOrder');
const HotelOrder = require('../models/HotelOrder');
const BTripFee = require('../models/BTripFee');

class ComputeService {
	constructor () {
		let date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
	}
	async compute () {
		await this.computeFlight();
	}

	async computeFlight () {
		let feeTypes = [
			{ type: 'flight', model: FlightOrder },
			{ type: 'train', model: TrainOrder },
			{ type: 'vehicle', model: VehicleOrder },
			{ type: 'hotel', model: HotelOrder }
		];
		for (let feeType of feeTypes) {
			let fees = await feeType.model.aggregate([
				{
					$group: {
						_id: { year: '$year', month: '$month', deptId: '$deptid' },
						total: { $sum: '$total_fee' }
					}
				}
			]);
			for (let fee of fees) {
				await BTripFee.updateOne({
					year: fee._id.year,
					month: fee._id.month,
					deptId: fee._id.deptId
				}, {
					$set: {
						year: fee._id.year,
						month: fee._id.month,
						deptId: fee._id.deptId,
						[feeType.type]: fee.total
					}
				}, { upsert: true });
			}
		}

		let fees = await BTripFee.find({ corpId: this.corpId });
		for (let fee of fees) {
			await BTripFee.updateOne({ _id: fee._id }, {
				$set: {
					total: fee.flight + fee.train + fee.vehicle + fee.hotel
				}
			});
		}
	}
}

const computeService = new ComputeService();

computeService.compute();

module.exports = computeService;
