import mongoose from 'mongoose';
import mongodb from '../core/db/mongodb';

const catalogSchema = new mongoose.Schema({
	id: String, // 分类
	name: String, // 分类名称
	budget: Number, // 分类总预算(单位:分)
	expense: Number, // 分类支出(单位: 分) 礼品，其他 是从NC实时查询，交通费从商旅备份中查询出
	balance: Number // 分类剩余金额(单位: 分) balance = budget-expense
});

// 部门月度预算 schema
const monthlyBudgetSchema = new mongoose.Schema(
	{
		deptId: Number, // 部门deptId
		detpName: String, // 部门名称
		year: Number,
		month: Number,
		budget: Number, // 月度总预算 单位（分）
		expense: Number, // 月度总支出 单位（分）
		balance: Number, // 月度总结余 单位（分）
		catalogs: [ catalogSchema ]
	}, {
		collection: 'monthlybudgets',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const monthlyBudget = mongodb.model('monthlybudgets', monthlyBudgetSchema);

export default monthlyBudget;
