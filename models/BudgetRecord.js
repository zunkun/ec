const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门预算调整流水
// 部门D1的year1年mongh1月catalog1预算-->(amount)-> 部门D2的year2年mongh2月catalog2预算
const budgetRecordSchema = new mongoose.Schema(
	{
		from: {
			code: String, // 预算体code
			name: String, // 部门名称
			year: Number,
			catalog: String,
			stock: Number, // 操作前存量
			amount: Number, // 操作数量
			balance: Number // 操作后可用量 balance = stock-amount
		},
		to: {
			type: {
				code: String, // 预算体code
				name: String, // 部门名称
				year: Number,
				catalog: String,
				stock: Number, // 操作前存量
				amount: Number, // 操作数量
				balance: Number // 操作后可用量 balance = stock+amount
			}
		},
		timestamp: Number,
		staff: { // 操作人
			deptId: Number,
			deptName: String,
			userId: String,
			userName: String
		},
		status: Number // 操作结果 null/0 等待操作 10 失败 20成功
	}, {
		collection: 'budgetRecords',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const BudgetRecord = mongodb.model('budgetRecords', budgetRecordSchema);

module.exports = BudgetRecord;
