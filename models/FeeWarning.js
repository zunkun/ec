const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 部门预警临时变量，只保存最新
const feeWarningSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		code: String, // 预算体编号
		name: String, // 预算体名称
		trip: Number, // 预算
		expense: Number, // 已花费
		percent: Number,
		warning: { // 是否已发送消息
			type: Boolean,
			default: false
		},
		line: Number, // 最高预警级别
		financeUsers: [], // 财务主管表
		managerUsers: [], // 部门主管表
		status: Number // 数据状态，当创建一条心记录时 status = 1， 当某次查询预算百分比小于最低预警值时， 当前status = 0
	}, {
		collection: 'feewarnings',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const DeptGroups = mongodb.model('feewarnings', feeWarningSchema);

module.exports = DeptGroups;
