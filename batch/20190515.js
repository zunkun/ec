process.env.NODE_ENV = 'production';

const config = require('../config');
const StaffProcess = require('../models/StaffProcess');
const fs = require('fs');

async function syncStaffs () {
	let processes = await StaffProcess.find({ corpId: config.corpId });
	let data = [];
	for (let process of processes) {
		let userProcess = {
			'钉钉userId': process.userId,
			'姓名': process.userName,
			'部门': process.deptName
		};

		let approvals = process.approvals || [];

		for (let index in approvals) {
			if (!approvals[index].users) {
				continue;
			}
			let users = JSON.stringify(approvals[index].users);
			// console.log(users, JSON.parse(users));
			let users2 = JSON.parse(users);
			let arr = [];
			for (let user of users2) {
				arr.push(user.userName);
			}

			userProcess[`第${Number(index) + 1}级审核人`] = arr.join('、');
		}

		data.push(userProcess);
	}

	fs.writeFileSync('./a.json', JSON.stringify(data));
}

syncStaffs();