// process.env.NODE_ENV = 'production';
const config = require('../config');
const message = require('./message');

const DeptGroups = require('../models/DeptGroups');
const Roles = require('../models/Roles');
const Depts = require('../models/Depts');
const FeeWarning = require('../models/FeeWarning');
const cron = require('node-cron');
const feesService = require('./feesService');
const { toFixedNum } = require('../core/util');

// 预算预警
class BudgetWarning {
	constructor () {
		this.year = new Date().getFullYear();
	}

	async start () {
		setTimeout(async () => {
			await this.check();
		}, 3000);
		const task = cron.schedule(config.warningCron, async () => {
			await this.check();
		});
		task.start();
	}

	getLow () {
		let warningLines = config.warningLines;
		let low = 1;
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
		let financeUsers = [];
		for (let item of role.users || []) {
			financeUserIds.push(item.userId);
			financeUsers.push({ userId: item.userId, userName: item.userName });
		}
		let warningLines = config.warningLines.sort();
		let low = this.getLow();

		for (let group of deptGroups) {
			console.log('----------------------------------------------------');
			console.log(`計算 ${group.name} 部門預算百分比`);
			try {
				let feeData = await feesService.getTripFeeData(group.code);
				let trip = Number(feeData.trip) || 0;
				let tripFees = Number(feeData.tripFees) || 0;
				let percent = toFixedNum(Number(tripFees / trip));
				if (trip === 0) {
					console.log(`${group.name}部门差旅费预算为0, 不做预警`);
					continue;
				}

				console.log(`${group.name}部门预算已用 ${tripFees}/${trip}= ${toFixedNum(percent * 100)} %`);
				if (percent < low) {
					console.log(`${group.name}部门差旅费使用 ${percent} < ${low}， 不做预警`);
					// 更新旧的预警数据，重新开始预警
					await FeeWarning.updateOne({ corpId: config.corpId, year: this.year, code: group.code, status: 1 }, { status: 0 });
					continue;
				}

				let line = low; // 预警线
				for (let item of warningLines) {
					if (percent > item) {
						line = item;
					}
				}
				let feeWarining = await FeeWarning.findOne({ corpId: config.corpId, year: this.year, code: group.code, status: 1 });
				if (feeWarining && line <= feeWarining.line) {
					console.log(`${group.name} 在 ${line} 预警点已经预警过,本次不再预警`);
					continue;
				}

				if (!feeWarining || line > feeWarining.line) {
					let managerIds = [];
					let managerUsers = [];

					let dept = await Depts.findOne({ corpId: config.corpId, deptName: group.name });
					if (dept) {
						let managers = dept.managers || [];
						for (let manager of managers) {
							managerIds.push(manager.userId);
							managerUsers.push({ userId: manager.userId, userName: manager.userName });
						}
					}
					console.log(`${group.name}部门预算使用超过${line * 100} %,给财务部门和部门主管发送提醒消息`);
					await message.sendFinanceWarningMsg(financeUserIds, line, group.name);
					if (managerIds.length) {
						await message.sendManagerWarningMsg(managerIds, line, group.name);
					}

					// 写发送消息日志
					if (!feeWarining) {
						await FeeWarning.create({
							corpId: config.corpId,
							year: this.year,
							code: group.code,
							name: group.name,
							warining: true,
							financeUsers,
							managerUsers,
							line,
							percent,
							status: 1
						});
					} else {
						await FeeWarning.updateOne({ _id: feeWarining._id }, { line, warning: true, percent, managerUsers, financeUsers });
					}
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
}
const budgetWarning = new BudgetWarning();

budgetWarning.start();

module.exports = budgetWarning;
