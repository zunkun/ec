const dingding = require('../core/dingding');
const Depts = require('../models/Depts');
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
	}

	async test () {
		console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
		await this.syncDepts();
		await this.setDeptPaths(1, [ 1 ]);
		await this.syncStaffs();
	}

	async start () {
		await this.syncService(); // 系统启动时检查是否已经通不过了，如果没有同步，则同步
		const task = cron.schedule(config.deptCron, async () => {
			await this.syncService();
		});
		task.start();
	}

	async syncService () {
		await this.initDates();
		let sync = await Sync.findOne({ corpId: config.corpId, type: 1, year: this.year, month: this.month, day: this.day, ap: this.ap, status: 1 });
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
			deptName: config.baseDeptName,
			parentId: 1
		});
		for (let department of this.departments) {
			this.deptMap.set(department.id, {
				deptName: department.name,
				parentId: department.parentid
			});
		}
		for (let department of this.departments) {
			await Depts.updateOne({
				corpId: config.corpId,
				deptId: department.id
			}, {
				corpId: config.corpId,
				deptId: department.id,
				deptName: department.name,
				parentId: department.parentid,
				parentName: this.deptMap.get(department.parentid).deptName || ''
			}, { upsert: true });
		}
		return Promise.resolve();
	}

	async setDeptPaths (parentId, parentDeptPath = []) {
		let depts = await Depts.find({ parentId });
		if (!depts || !depts.length) {
			return Promise.resolve();
		}
		for (let dept of depts) {
			let deptPath = parentDeptPath.concat([ dept.deptId ]);
			await Depts.updateOne({ deptId: dept.deptId }, { deptPath });
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
			let promise = Staffs.updateOne({
				userId: user.userid
			}, {
				userId: user.userid,
				userName: user.name,
				deptId: deptId,
				deptName: this.deptMap.get(deptId).deptName || ''
			}, { upsert: true });
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}
}

const scheduleDepts = new ScheduleDepts();

module.exports = scheduleDepts.start();
// module.exports = scheduleDepts.test();
