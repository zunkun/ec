const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 收入预算
const incomingsSchema = new mongoose.Schema(
	{
		corpId: String, // 公司
		userId: String,
		userName: String,
		jobnumber: String, // 工号
		year: Number, // 年
		period: String, // 周期
		code: String, // 目标编码
		typeName: String, // 目标名称
		axis: Number,
		qq: Number,
		pm: Number,
		unit: String,
		weights: Number,
		incomings: Number, // 目标
		line2: Number, // 2区位
		line4: Number,
		line6: Number,
		line8: Number,
		line10: Number,
		status: Number // 0-弃用 1-使用
	}, {
		collection: 'incomings',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Incomings = mongodb.model('incomings', incomingsSchema);

module.exports = Incomings;
