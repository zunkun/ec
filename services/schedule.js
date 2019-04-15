const dingding = require('../core/dingding');
const Dept = require('../models/Dept');
const Sync = require('../models/Sync');

class Schedule {
	constructor () {
		this.year = null;
		this.month = null;
		this.day = null;
		this.deptMap = new Map();
	}

	async start () {
		await this.initDates();
		let sync = await Sync.findOne({ year: this.year, month: this.month, day: this.day, status: 1 });
		if (!sync) {
			console.log(`【开始】${this.year}-${this.month}-${this.day}部门同步开始`);
			await this.syncDepts();
		}
	}

	async initDates () {
		let date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
	}

	async syncDepts () {
		console.log('【开始】获取部门列表');
		let departments = await dingding.getDeptLists();
		console.log('【成功】获取部门列表');

		this.deptMap.set(1, '海尔金融');
		for (let department of departments) {
			this.deptMap.set(department.id, department.name);
		}
		if (!departments.length) {
			console.log('【失败】没有获取到部门列表');
			await Sync.update({ year: this.year, month: this.month, day: this.day }, {
				year: this.year,
				month: this.month,
				day: this.day,
				status: 0
			}, { upsert: true });
			return;
		}
		try {
			for (let department of departments) {
				await Dept.updateOne({
					deptId: department.id
				}, {
					deptId: department.id,
					deptName: department.name,
					parentId: department.parentid,
					parentName: this.deptMap.get(department.parentid) || ''
				}, { upsert: true });
			}
			console.log(`【成功】${this.year}-${this.month}-${this.day}部门同步成功`);
			console.log({ departments });
			await Sync.updateOne({ year: this.year, month: this.month, day: this.day }, {
				year: this.year,
				month: this.month,
				day: this.day,
				status: 1
			}, { upsert: true });
		} catch (error) {
			console.log(`【失败】${this.year}-${this.month}-${this.day}部门同步失败`);
			await Sync.update({ year: this.year, month: this.month, day: this.day }, {
				year: this.year,
				month: this.month,
				day: this.day,
				status: 0
			}, { upsert: true });
		}
	}
}

const schedule = new Schedule();

module.exports = schedule.start();
