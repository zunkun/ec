const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门年度预算 schema
const annualBudgetSchema = new mongoose.Schema(
	{
		corpId: String,
		group: { code: String, name: String }, // 預算躰
		catalog: { code: String, name: String }, // 分类
		year: Number,
		budget: { type: Number, default: 0 }, // 年度预算单位（元）
		month1: { type: Number, default: 0 }, // 1月份预算
		month2: { type: Number, default: 0 },
		month3: { type: Number, default: 0 },
		month4: { type: Number, default: 0 },
		month5: { type: Number, default: 0 },
		month6: { type: Number, default: 0 },
		month7: { type: Number, default: 0 },
		month8: { type: Number, default: 0 },
		month9: { type: Number, default: 0 },
		month10: { type: Number, default: 0 },
		month11: { type: Number, default: 0 },
		month12: { type: Number, default: 0 }
	}, {
		collection: 'annualbudgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const AnnualBudget = mongodb.model('annualbudgets', annualBudgetSchema);

module.exports = AnnualBudget;
