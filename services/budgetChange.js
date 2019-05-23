const Budgets = require('../models/Budgets');
const BudgetRecord = require('../models/BudgetRecord');
const Process = require('../models/Process');
const config = require('../config');

class BudgetChange {
	constructor () {
		this.year = '';
	}

	async start (applicationId) {
		let process = await Process.findOne({ corpId: config.corpId, applicationId });
		if (!process || process.status !== 60) {
			return Promise.reject('操作失败，没有权限');
		}

		this.year = new Date(process.createTime).getFullYear();

		let changeDatas = [];
		let changeTo = {
			code: process.group.code,
			name: process.group.name,
			catalog: 'trip'
		};

		for (let fromItem of process.from) {
			changeDatas.push({
				from: {
					code: fromItem.code,
					name: fromItem.name,
					catalog: fromItem.catalog || 'trip',
					amount: fromItem.amount
				},
				to: changeTo,
				amount: fromItem.amount || 0
			});
		}

		try {
			await this.changeBudgets(changeDatas);
			await Process.updateOne({
				_id: process._id
			}, { status: 61 });
			console.log('修改预算成功');
		} catch (error) {
			console.log('修改预算失败', error);
			await Process.updateOne({
				_id: process._id
			}, { status: 62 });
			return Promise.resolve();
		}
	}

	async changeBudgets (changeDatas, year) {
		this.year = year || new Date().getFullYear();
		for (let changeData of changeDatas) {
			let { from, to, amount } = changeData;
			let budgetFrom = await Budgets.findOne({ code: from.code, year: this.year, corpId: config.corpId });
			let budgetTo = await Budgets.findOne({ code: to.code, year: this.year, corpId: config.corpId });
			let budgetRecord;

			try {
				budgetRecord = await BudgetRecord.create({
					corpId: config.corpId,
					year: this.year,
					from: {
						code: from.code,
						name: from.name,
						year: this.year,
						catalog: from.catalog,
						stock: budgetFrom[from.catalog],
						amount: Math.abs(amount),
						balance: budgetFrom[from.catalog] - Math.abs(amount)
					},
					to: {
						code: to.code,
						name: to.name,
						year: this.year,
						catalog: to.catalog,
						stock: budgetTo[to.catalog],
						amount: Math.abs(amount),
						balance: budgetTo[to.catalog] + Math.abs(amount)
					},
					status: 0,
					staff: {
						userName: '财务调整'
					},
					timestamp: Date.now()
				});
				await Budgets.updateOne({ _id: budgetFrom._id }, {
					[from.catalog]: Number(budgetFrom[from.catalog]) - Math.abs(amount)
				});
				await Budgets.updateOne({ _id: budgetTo._id }, {
					[to.catalog]: Number(budgetTo[to.catalog]) + Math.abs(amount)
				});

				await BudgetRecord.updateOne({ _id: budgetRecord._id }, { timestamp: Date.now(), status: 20 });
				console.log(`【成功】 费用预算从 ${from.name}(${from.catalog}) ---${amount}--> ${to.name}(${to.catalog})成功`);
			} catch (error) {
				console.log(`【失败】 费用预算从 ${from.name}(${from.catalog}) ---${amount}--> ${to.name}(${to.catalog})失败`, error);
				if (budgetRecord) {
					await BudgetRecord.updateOne({ _id: budgetRecord._id }, { timestamp: Date.now(), status: 10 });
				}
				console.log('【回滚】 数据开始回滚');
				await Budgets.updateOne({ _id: budgetFrom._id }, {
					[from.catalog]: budgetFrom[from.catalog]
				});

				await Budgets.updateOne({ _id: budgetTo._id }, {
					[to.catalog]: budgetTo[to.catalog]
				});
				console.log('【回滚】 数据回滚成功');
			}
		}
	}
}

let budgetChange = new BudgetChange();

module.exports = budgetChange;
