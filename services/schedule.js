const dingding = require('../core/dingding');
const Depts = require('../models/Depts');
const Sync = require('../models/Sync');
const config = require('../config');
const cron = require('node-cron');

class Schedule {
	constructor () {
		this.year = null;
		this.month = null;
		this.day = null;
		this.ap = null;
		this.deptMap = new Map();
	}

	async start () {
		const task = cron.schedule(config.schedule, async () => {
			await this.initDates();
			let sync = await Sync.findOne({ corpId: config.corpId, year: this.year, month: this.month, day: this.day, ap: this.ap, status: 1 });
			if (!sync) {
				console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
				await this.syncDepts();
			}
		});
		task.start();
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
		let departments = await dingding.getDeptLists();
		console.log('【成功】获取部门列表');

		this.deptMap.set(1, config.baseDeptName);
		for (let department of departments) {
			this.deptMap.set(department.id, department.name);
		}
		if (!departments.length) {
			console.log('【失败】没有获取到部门列表');
			await Sync.updateOne({ corpId: config.corpId, year: this.year, month: this.month, day: this.day, ap: this.ap }, {
				corpId: config.corpId,
				year: this.year,
				month: this.month,
				day: this.day,
				ap: this.ap,
				status: 0
			}, { upsert: true });
			return;
		}
		try {
			for (let department of departments) {
				await Depts.updateOne({
					corpId: config.corpId,
					deptId: department.id
				}, {
					corpId: config.corpId,
					deptId: department.id,
					deptName: department.name,
					parentId: department.parentid,
					parentName: this.deptMap.get(department.parentid) || ''
				}, { upsert: true });
			}
			console.log(`【成功】${this.year}-${this.month}-${this.day}部门同步成功`);
			await Sync.updateOne({ corpId: config.corpId, year: this.year, month: this.month, day: this.day, ap: this.ap }, {
				year: this.year,
				corpId: config.corpId,
				month: this.month,
				day: this.day,
				ap: this.ap,
				status: 1
			}, { upsert: true });
		} catch (error) {
			console.log(`【失败】${this.year}-${this.month}-${this.day}部门同步失败`);
			console.log({ error });
			await Sync.updateOne({ corpId: config.corpId, year: this.year, month: this.month, day: this.day, ap: this.ap }, {
				year: this.year,
				corpId: config.corpId,
				month: this.month,
				day: this.day,
				ap: this.ap,
				status: 0
			}, { upsert: true });
		}
	}
}

const schedule = new Schedule();

module.exports = schedule.start();
