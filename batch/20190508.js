process.env.NODE_ENV = 'production';

const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const StaffProcess = require('../models/StaffProcess');
const Roles = require('../models/Roles');
const config = require('../config');

let deptMap = new Map();

async function setEcDepts () {
	let depts = await Depts.find({ corpId: config.corpId });
	for (let dept of depts) {
		deptMap.set(dept.deptId, dept);
	}

	for (let dept of depts) {
		let ecDepts = [];
		for (let i = 0, length = dept.deptPath.length; i < length; i++) {
			let _deptId = dept.deptPath[i];
			if (_deptId === 1) {
				break;
			}
			let _dept = deptMap.get(dept.deptPath[i]);

			let _managers = [];
			if (!_dept.managers.length) {
				continue;
			}
			for (let manager of _dept.managers) {
				_managers.push({
					userId: manager.userId,
					userName: manager.userName
				});
			}
			ecDepts.push({
				sequence: i + 1,
				deptId: _dept.deptId,
				deptName: _dept.deptName,
				users: _managers
			});
		}
		console.log(`【保存】 ${dept.deptName} ecDept`);
		await Depts.updateOne({ _id: dept._id }, { ecDepts });
	}
}

async function setStaffProcess () {
	let staffs = await Staffs.find({ corpId: config.corpId });
	for (let staff of staffs) {
		let departments = staff.departments || [];
		for (let department of departments) {
			let dept = await Depts.findOne({ deptId: department.deptId });
			let process = {
				userId: staff.userId,
				userName: staff.userName,
				deptId: department.deptId,
				deptName: department.deptName,
				corpId: config.corpId,
				coprName: config.corpName,
				year: new Date().getFullYear(),
				group: dept.group,
				approvals: dept.ecDepts,
				applications: dept.ecDepts
			};
			console.log(`【保存】${dept.deptName} ${staff.userName} process`);
			await StaffProcess.updateOne({
				userId: staff.userId,
				corpId: config.corpId
			}, process, { upsert: true });
		}
	}
}

async function setFinance () {
	let role = await Roles.findOne({ name: '预算管理岗' });
	console.log(`【设置】finance process ${role.users[0].userName}等`);
	await StaffProcess.updateMany({
		corpId: config.corpId
	}, {
		finances: role.users
	});
}

async function start () {
	await setEcDepts();
	await setStaffProcess();
	await setFinance();
}

start();
