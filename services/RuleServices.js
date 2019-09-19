const ProcessRules = require('../models/ProcessRules');
const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const config = require('../config');

class RuleServices {
	static async deptManagerMap () {
		let depts = await Depts.find({ corpId: config.corpId });
		let managerMap = new Map();

		for (let dept of depts) {
			if (!dept.deptId) continue;
			if (!dept.deptId) continue;
			let users = [];
			let managers = dept.managers || [];
			for (let manager of managers) {
				users.push({
					userId: manager.userId,
					userName: manager.userName
				});
			}
			managerMap.set(dept.deptId, {
				deptId: dept.deptId,
				deptName: dept.deptName,
				parentId: dept.parentId,
				managers: users
			});
		}
		return managerMap;
	}

	static async setProcessRules () {
		console.log('【开始】设置所有人员的审批流程');
		let managerMap = await this.deptManagerMap();
		let staffs = await Staffs.find({ corpId: config.corpId });

		for (let staff of staffs) {
			let rule = ProcessRules.findOne({ userId: staff.userId });
			if (rule && rule.category === 2) continue;
			await this.setStaffRule(staff, managerMap);
		}
		console.log('【成功】设置所有人员的审批流程');
		return Promise.resolve();
	}

	static async setStaffRule (staff, managerMap) {
		console.log(`【开始】设置${staff.userName}的审批流程`);
		let departments = staff.departments;
		let deptId = departments[0].deptId;
		const approvals1 = managerMap.get(deptId).managers;
		let approvals2;

		if (managerMap.get(deptId).parentId && managerMap.get(deptId).parentId !== 1) {
			approvals2 = managerMap.get(managerMap.get(deptId).parentId).managers;
		}

		await ProcessRules.updateOne({
			userId: staff.userId
		}, {
			userId: staff.userId,
			userName: staff.userName,
			group: staff.group,
			deptId: staff.departments[0].deptId,
			deptName: staff.departments[0].deptName,
			approvals1,
			approvals2,
			category: 1
		}, { upsert: true });
	}
}

RuleServices.setProcessRules();
module.exports = RuleServices;
