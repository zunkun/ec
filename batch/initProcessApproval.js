process.env.NODE_ENV = 'production';

const config = require('../config');
const StaffProcess = require('../models/StaffProcess');
const Staffs = require('../models/Staffs');
const processes = require('./process');

const staffMap = new Map();
const notInStaff = [];
const nameMap = new Map();
async function initStaffs () {
	let staffs = await Staffs.find({ corpId: config.corpId }).exec();
	console.log(staffs.length);
	for (let staff of staffs) {
		// staffMap.set(staff.userId, staff);
		nameMap.set(staff.userName, staff);
	}
}
async function initProcess () {
	await initStaffs();

	for (let process of processes) {
		let approvals = [];
		if (process['第1级审核人']) {
			if (nameMap.has(process['第1级审核人'].trim())) {
				let staff = nameMap.get(process['第1级审核人'].trim());
				let departments = JSON.parse(JSON.stringify(staff.departments));
				let index = departments.findIndex(item => {
					return item.deptName === process['部门'];
				});

				index = index > -1 ? index : 0;

				approvals.push({
					sequence: 1,
					deptId: staff.departments[index].deptId,
					deptName: staff.departments[index].deptName,
					users: [ {
						userId: staff.userId,
						userName: staff.userName
					} ]
				});
			} else {
				notInStaff.push(process);
			}
		}

		if (process['第2级审核人']) {
			if (nameMap.has(process['第2级审核人'].trim())) {
				let staff = nameMap.get(process['第2级审核人'].trim());
				let departments = JSON.parse(JSON.stringify(staff.departments));
				let index = departments.findIndex(item => {
					return item.deptName === process['部门'];
				});

				index = index > -1 ? index : 0;

				approvals.push({
					sequence: 2,
					deptId: staff.departments[index].deptId,
					deptName: staff.departments[index].deptName,
					users: [ {
						userId: staff.userId,
						userName: staff.userName
					} ]
				});
			} else {
				notInStaff.push(process);
			}
		}

		await StaffProcess.updateOne({
			corpId: config.corpId,
			userId: process['钉钉userId']
		}, {
			approvals
		});
	}
	console.log(notInStaff.length);
}

initProcess();
