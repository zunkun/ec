const dingding = require('../core/dingding');
const Depts = require('../models/Depts');
const DeptGroups = require('../models/DeptGroups');
const Staffs = require('../models/Staffs');
const Sync = require('../models/Sync');
const config = require('../config');
const cron = require('node-cron');
const util = require('../core/util');

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
		}, 5000);
	}

	async start () {
		setTimeout(async () => {
			await this.init();
			await this.syncService(); // 系统启动时检查是否已经通不过了，如果没有同步，则同步
		}, 3000);
		const task = cron.schedule(config.deptCron, async () => {
			await this.init();
			await this.syncService();
		});
		task.start();
	}

	async init () {
		await this.initDates();
		await this.initGroupDepts();
	}

	async initGroupDepts () {
		let deptGroups = await DeptGroups.find({ corpId: config.corpId });
		for (let deptGroup of deptGroups) {
			this.groupDeptMap.set(deptGroup.name, { code: deptGroup.code, name: deptGroup.name });
		}
	}

	async syncService () {
		let sync = await Sync.findOne({ corpId: config.corpId, type: 1, year: this.year, month: this.month, day: this.day, ap: this.ap, status: 3 });
		if (!sync) {
			console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
			try {
				await this.syncDepts();
				await this.setDeptPaths(1, [ 1 ]);
				await this.syncStaffs();
				await this.updateSyncStatus(1);
			} catch (error) {
				console.log(`【失败】${this.year}-${this.month}-${this.day}部门同步失败`);
				console.log({ error });
				await this.updateSyncStatus(0);
			}
		}
	}

	async updateSyncStatus (status) {
		await Sync.updateOne({ corpId: config.corpId, year: this.year, month: this.month, day: this.day, ap: this.ap }, {
			corpId: config.corpId,
			type: 1,
			year: this.year,
			month: this.month,
			day: this.day,
			ap: this.ap,
			status
		}, { upsert: true });
	}

	async initDates () {
		let date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
		this.ap = date.getHours() > 12 ? 'P' : 'A';
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
		this.deptMap.set(1, {
			deptName: config.corpName,
			parentId: 1
		});
		for (let department of this.departments) {
			this.deptMap.set(department.id, {
				deptName: department.name,
				parentId: department.parentid
			});
		}

		for (let department of this.departments) {
			this.setEcDept(department.id, department.parentid);
		}
		console.log('【开始】保存部门列表');

		for (let department of this.departments) {
			await Depts.updateOne({
				corpId: config.corpId,
				deptId: department.id,
				year: this.year
			}, {
				corpId: config.corpId,
				deptId: department.id,
				year: this.year,
				deptName: department.name,
				parentId: department.parentid,
				parentName: this.deptMap.get(department.parentid).deptName || ''
			}, { upsert: true });
		}
		console.log('【成功】保存部门列表');

		console.log('【开始】保存部门与预算体对应关系');
		for (let department of this.departments) {
			let dept = await Depts.findOne({ deptId: department.id, corpId: config.corpId, year: this.year });
			if (dept.group.code) {
				continue;
			}
			let topDept = this.ecDeptMap.get(department.id);
			if (this.groupDeptMap.has(topDept.deptName)) {
				let group = this.groupDeptMap.get(topDept.deptName);
				await Depts.updateOne({ deptId: department.id, corpId: config.corpId, year: this.year }, { group });
			}
		}
		console.log('【成功】保存部门与预算体对应关系');

		return Promise.resolve();
	}

	async setDeptPaths (parentId, parentDeptPath = []) {
		let depts = await Depts.find({ parentId });
		if (!depts || !depts.length) {
			return Promise.resolve();
		}
		for (let dept of depts) {
			let deptPath = parentDeptPath.concat([ dept.deptId ]);
			await Depts.updateOne({ deptId: dept.deptId, year: this.year }, { deptPath });
			await this.setDeptPaths(dept.deptId, deptPath);
		}
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
		console.log(`【开始】获取部门 ${deptId} ${this.deptMap.get(deptId).deptName} 人员列表`);
		if (!deptId) return Promise.resolve();

		let userLists = await dingding.getDeptUsers(deptId);
		console.log(`【开始】保存部门 ${deptId} ${this.deptMap.get(deptId).deptName} 人员列表`);
		let promiseArray = [];
		for (let user of userLists) {
			let departmentIds = user.department || [];
			let departments = [];
			for (let deptId of departmentIds) {
				departments.push({
					deptId,
					deptName: this.deptMap.get(deptId).deptName || ''
				});
			}

			let promise = Staffs.updateOne({
				userId: user.userid
			}, {
				userId: user.userid,
				userName: user.name,
				departments,
				mobile: user.mobile,
				isAdmin: user.isAdmin,
				isBoss: user.isBoss,
				isLeader: user.isLeader,
				position: user.position,
				email: user.email,
				avatar: user.avatar,
				jobnumber: user.jobnumber
			}, { upsert: true });
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}

	setEcDept (deptId, parentId) {
		if (parentId === 1) {
			this.ecDeptMap.set(deptId, {
				deptId,
				deptName: this.deptMap.get(deptId).deptName
			});
			return;
		}
		if (this.deptMap.get(parentId).parentId === 1) {
			this.ecDeptMap.set(deptId, {
				deptId: parentId,
				deptName: this.deptMap.get(parentId).deptName
			});
			return;
		}

		return this.setEcDept(deptId, this.deptMap.get(parentId).parentId);
	}
}

const scheduleDepts = new ScheduleDepts();

module.exports = scheduleDepts.start();
// module.exports = scheduleDepts.test();
