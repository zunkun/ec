process.env.NODE_ENV = 'production';

const Budgets = require('../models/Budgets');
const BudgetRecords = require('../models/BudgetRecords');
const config = require('../config');

const changeDatas = [
	{
		from: {
			code: '0K001507',
			name: '风险管理部',
			catalog: 'trip'
		},
		to: {
			code: '0K001901',
			name: '教育行业平台',
			catalog: 'trip'
		},
		amount: 158000
	},
	{
		from: {
			code: '0K001507',
			name: '风险管理部',
			catalog: 'others'
		},
		to: {
			code: '0K001901',
			name: '教育行业平台',
			catalog: 'others'
		},
		amount: 5000
	},
	{
		from: {
			code: '0K001715',
			name: '现代医疗小微',
			catalog: 'benefits'
		},
		to: {
			code: '0K001701',
			name: '医疗健康行业平台',
			catalog: 'benefits'
		},
		amount: 30000
	},
	{
		from: {
			code: '0K001706',
			name: '绿色金融小微',
			catalog: 'trip'
		},
		to: {
			code: '0K001506',
			name: '资产管理部',
			catalog: 'trip'
		},
		amount: 9164.5
	},
	{
		from: {
			code: '0K001706',
			name: '绿色金融小微',
			catalog: 'others'
		},
		to: {
			code: '0K001506',
			name: '资产管理部',
			catalog: 'others'
		},
		amount: 15072
	}
];

// 修改预算
async function changeBudgets () {
	let year = 2019;
	for (let changeData of changeDatas) {
		let { from, to, amount } = changeData;
		let budgetFrom = await Budgets.findOne({ code: from.code, year, corpId: config.corpId });
		let budgetTo = await Budgets.findOne({ code: from.code, year, corpId: config.corpId });
		let budgetRecord;
		try {
			budgetRecord = await BudgetRecords.create({
				from: {
					code: from.code,
					name: from.name,
					year,
					stock: budgetFrom[from.catalog],
					amount: Math.abs(amount),
					balance: budgetFrom[from.catalog] - Math.abs(amount)
				},
				to: {
					code: to.code,
					name: to.name,
					year,
					stock: budgetTo[to.catalog],
					amount: Math.abs(amount),
					balance: budgetTo[to.catalog] - Math.abs(amount)
				},
				status: 0,
				staff: {
					userName: '系统'
				},
				timestamp: Date.now()
			});

			await Budgets.update({ _id: budgetFrom._id }, {
				[from.catalog]: budgetFrom[from.catalog] - Math.abs(amount)
			});

			await Budgets.update({ _id: budgetTo._id }, {
				[to.catalog]: budgetTo[to.catalog] - Math.abs(amount)
			});

			await BudgetRecords.update({ _id: budgetRecord._id }, { timestamp: Date.now(), status: 20 });

			console.log(`【成功】 费用预算从 ${from.name}(${from.catalog}) ---${amount}--> ${to.name}(${to.catalog})成功`);
		} catch (error) {
			console.log(`【失败】 费用预算从 ${from.name}(${from.catalog}) ---${amount}--> ${to.name}(${to.catalog})失败`, error);
			console.log();
			if (budgetRecord) {
				await BudgetRecords.update({ _id: budgetRecord._id }, { timestamp: Date.now(), status: 10 });
			}
			console.log('【回滚】 数据开始回滚');
			await Budgets.update({ _id: budgetFrom._id }, {
				[from.catalog]: budgetFrom[from.catalog]
			});

			await Budgets.update({ _id: budgetTo._id }, {
				[to.catalog]: budgetTo[to.catalog]
			});
			console.log('【回滚】 数据回滚成功');
		}
	}
}

changeBudgets().then(res => console.log('修改预算成功')).catch(error => { console.log('修改预算失败', error); });
