process.env.NODE_ENV = 'production';

const config = require('../config');
const Approvals = require('../models/Approvals');
const fs = require('fs');

function parseDate (date) {
	if (!date) return '';
	// let date = new Date(dateStr);
	let str = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
	return str;
}

function parseDate2 (date) {
	if (!date) return '';
	let str = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}时${date.getMinutes()}分`;
	return str;
}

async function getApprovals () {
	let approvals = await Approvals.find({ status: 40 });
	let trips = [];
	for (let approval of approvals) {
		let trip = {
			'姓名': approval.userName,
			'部门': approval.deptName,
			'出差天数': approval.trip.day,
			'申请时间': parseDate2(approval.createTime)
			// '结果': '审批通过'
		};

		let itineraries = approval.itineraries || [];
		for (let index = 0; index < itineraries.length; index++) {
			trip[`行程${index + 1}出发城市`] = itineraries[index].depCity;
			trip[`行程${index + 1}到达城市`] = itineraries[index].arrCity;
			trip[`行程${index + 1}出发日期`] = parseDate(itineraries[index].depDate);
			trip[`行程${index + 1}到达日期`] = parseDate(itineraries[index].arrDate);
		}
		// trip['结果'] = '审批通过';
		trips.push(trip);
	}

	fs.writeFileSync('./trip.json', JSON.stringify(trips));
}

getApprovals().then();
