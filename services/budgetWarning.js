// process.env.NODE_ENV = 'production';
const config = require('../config');
const message = require('./message');

const DeptGroups = require('../models/DeptGroups');
const Roles = require('../models/Roles');
const Depts = require('../models/Depts');
const FeeWarning = require('../models/FeeWarning');
const cron = require('node-cron');
const feesService = require('./feesService');

// 预算预警
class BudgetWarning {
	constructor () {
		this.year = new Date().getFullYear();
	}

	async start () {
		const task = cron.schedule(config.warningCron, async () => {
			await this.check();
		});
		task.start();
	}

	getLow () {
		let warningLines = config.warningLines;
		let low = 0;
		for (let item of warningLines) {
			if (item < low) {
				low = item;
			}
		}
		return low;
	}

	async check () {
		let deptGroups = await DeptGroups.find({ corpId: config.corpId });
		let role = await Roles.findOne({ name: '预算管理岗' });
		let financeUserIds = [];
		for (let item of role.users || []) {
			financeUserIds.push(item.userId);
		}
		let warningLines = config.warningLines;
		let low = this.getLow();

		for (let group of deptGroups) {
			console.log(`計算 ${group.name} 部門預算百分比`);
			try {
				let feeData = await feesService.getTripFeeData(group.code);
				let trip = Number(feeData.trip) || 0;
				let tripFees = Number(feeData.tripFees) || 0;
				let percent = tripFees / trip;
				if (trip === 0) {
					percent = 1;
				}

				console.log(`${group.name}部门预算已用 ${percent * 100} %`);
				if (percent < low) {
					await FeeWarning.updateOne({
						corpId: config.corpId,
						year: this.year,
						code: group.code }, {
						corpId: config.corpId,
						year: this.year,
						code: group.code,
						name: group.name,
						warning: false,
						line: 0
					}, { upsert: true });
					continue;
				}

				let line = low;
				for (let item of warningLines) {
					if (item < percent && item > line) {
						line = item;
					}
				}
				let feeWarining = await FeeWarning.findOne({ corpId: config.corpId, year: this.year, code: group.code });
				if (!feeWarining) {
					feeWarining = await FeeWarning.create({ corpId: config.corpId, year: this.year, code: group.code, name: group.name, warining: false, line: 0 });
				}

				if (line > feeWarining.line || percent < feeWarining.line) {
					let dept = await Depts.findOne({ corpId: config.corpId, deptName: group.name });
					if (dept) {
						let managerIds = [];
						let managers = dept.managers || [];
						for (let manager of managers) {
							managerIds.push(manager.userId);
						}
						console.log(`${group.name}部门预算使用超过${line * 100} %,给财务部门和部门主管发送提醒消息`);
						await message.sendFinanceWarningMsg(financeUserIds, line, group.name);
						await message.sendManagerWarningMsg(managerIds, line, group.name);
					}
				}
				await FeeWarning.updateOne({ _id: feeWarining._id }, { line, warning: true });
			} catch (error) {
				console.log(error);
			}
		}
	}
}
const budgetWarning = new BudgetWarning();

module.exports = budgetWarning;
