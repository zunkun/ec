const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门年度预算 schema
const annualBudgetSchema = new mongoose.Schema(
	{
		deptId: Number, // 部门deptId
		detpName: String, // 部门名称
		year: Number,
		budget: Number // 单位（分）
	}, {
		collection: 'annualbudgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const AnnualBudget = mongodb.model('annualbudgets', annualBudgetSchema);

module.exports = AnnualBudget;
