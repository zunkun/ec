const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门年度预算 schema
const BudgetSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		groupCode: String,
		groupName: String,
		benefits: Number, // 福利
		trip: Number, // 差旅
		others: Number // 其他
	}, {
		collection: 'budgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Budgets = mongodb.model('budgets', BudgetSchema);

module.exports = Budgets;
