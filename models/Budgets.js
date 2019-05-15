const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门年度预算 schema
const BudgetSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		code: String,
		name: String,
		benefits: Number, // 福利
		trip: Number, // 差旅
		others: Number, // 其他
		self: {}
	}, {
		collection: 'budgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Budgets = mongodb.model('budgets', BudgetSchema);

module.exports = Budgets;
