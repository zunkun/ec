const dingding = require('../core/dingding');
const Depts = require('../models/Depts');
const DeptGroups = require('../models/DeptGroups');
const Staffs = require('../models/Staffs');
const Sync = require('../models/Sync');
const config = require('../config');
const cron = require('node-cron');
const util = require('../core/util');
const constants = require('../config/constants');
const btripPaths = constants.btrip;
const roleService = require('./roleService');

class ScheduleDepts {
	constructor () {
		this.year = null;
		this.month = null;
		this.day = null;
		this.ap = null;
		this.departments = [];
		this.deptMap = new Map();
		this.groupDeptMap = new Map();
		this.ecDeptMap = new Map();
	}

	async test () {
		setTimeout(async () => {
			await this.init();
			console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
			await this.syncService();
			await this.setDeptPaths(1, [ 1 ]);
			await this.syncStaffs();
			await this.syncManagers();
		}, 5000);
	}

	async start () {
		await this.syncService(); // 系统启动时检查是否已经通不过了，如果没有同步，则同步
	}

	async syncService () {
		console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
		await this.syncDepts();
		await this.syncStaffs();
	}

	async syncDepts () {
		console.log('【开始】获取部门列表');
		this.departments = await dingding.getDeptLists({ fetch_child: true });
		console.log('【成功】获取部门列表');
		if (!this.departments.length) {
			let error = '【失败】没有获取到部门列表';
			console.log(error);
			return Promise.reject(error);
		}
		this.deptMap.set(1, '海尔2测试');
		for (let department of this.departments) {
			this.deptMap.set(department.id, department.name);
			await Depts.updateOne({ deptId: department.id }, { deptId: department.id, deptName: department.name }, { upsert: true });
		}
		return Promise.resolve();
	}

	async syncStaffs () {
		let promiseArray = [];
		for (let department of this.departments) {
			let promise = this.syncDeptStaffs(department.id);
			await util.wait(200);
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}

	async syncDeptStaffs (deptId) {
		console.log(`【开始】获取部门 ${deptId} ${this.deptMap.get(deptId)} 人员列表`);
		if (!deptId) return Promise.resolve();

		let userLists = await dingding.getDeptUsers(deptId);
		console.log(`【开始】保存部门 ${deptId} ${this.deptMap.get(deptId)} 人员列表`);
		let promiseArray = [];
		for (let user of userLists) {
			let departmentIds = user.department || [];
			let departments = [];
			for (let deptId of departmentIds) {
				departments.push({
					deptId,
					deptName: this.deptMap.get(deptId) || ''
				});
			}
			let userData = {
				corpId: config.corpId,
				corpName: config.corpName,
				userId: user.userid,
				userName: user.name,
				departments,
				mobile: user.mobile,
				isAdmin: user.isAdmin,
				isBoss: user.isBoss,
				position: user.position,
				email: user.email,
				avatar: user.avatar,
				jobnumber: user.jobnumber
			};

			// TODO: 部门领导获取规则，需要改进，建议直接从部门信息中获取，如果从员工信息中获取，某天员工不再是领导，则部门中该员工的领导属性不能删除
			if (user.isLeader) {
				userData.isLeader = true;
			}

			let promise = Staffs.updateMany({
				corpId: config.corpId,
				userId: user.userid
			}, userData, { upsert: true });
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}
}

const scheduleDepts = new ScheduleDepts();

module.exports = scheduleDepts.start();
// module.exports = scheduleDepts.test();
