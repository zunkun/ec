const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');
const constants = require('../config/constants');
const config = require('../config');
const DeptGroups = require('./DeptGroups');

// 部门年度预算 schema
const BudgetSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		groupCode: String,
		groupName: String,
		benefits: Number,
		trip: Number,
		others: Number
	}, {
		collection: 'budgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Budgets = mongodb.model('budgets', BudgetSchema);

async function initBudget () {
	let year = new Date().getFullYear();
	for (let groupBudget of constants.groupBudgets) {
		let deptGroup = await DeptGroups.findOne({ corpId: config.corpId, year });
		if (!deptGroup) {
			await DeptGroups.create({
				corpId: config.corpId,
				year,
				code: groupBudget.groupCode,
				name: groupBudget.groupName
			});
		}

		let budget = await Budgets.findOne({
			corpId: config.corpId,
			year: new Date().getFullYear(),
			'groupCode': groupBudget.CODE
		});
		if (!budget) {
			await Budgets.create({
				corpId: config.corpId,
				year: new Date().getFullYear(),
				groupCode: groupBudget.groupCode,
				groupName: groupBudget.groupName,
				benefits: groupBudget.benefits,
				trip: groupBudget.trip,
				others: groupBudget.others
			});
		}
	}
}

initBudget().then(() => { console.log('初始化Budgets成功'); }).catch(error => console.log(error));

module.exports = Budgets;
