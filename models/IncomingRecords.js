const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 收入预算记录
const incomingRecordsSchema = new mongoose.Schema(
	{
		corpId: String, // 公司
		userId: String,
		userName: String,
		jobnumber: String, // 工号
		year: Number, // 年
		period: String, // 周期
		code: String, // 目标编码
		typeName: String, // 目标名称
		changeType: Number, // 1-新增 2-修改 3-删除
		before: {
			incomings: Number, // 目标
			line2: Number, // 2区位
			line4: Number,
			line6: Number,
			line8: Number,
			line10: Number,
			status: Number // 0-弃用 1-使用
		},
		after: {
			incomings: Number, // 目标
			line2: Number, // 2区位
			line4: Number,
			line6: Number,
			line8: Number,
			line10: Number,
			status: Number // 0-弃用 1-使用
		},
		manager: { // 执行操作的人员，通常为财务或者系统
			userId: String,
			userName: String
		},
		recordsId: String // 收入调整审批单Id
	}, {
		collection: 'incomingRecords',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const incomingRecords = mongodb.model('incomingRecords', incomingRecordsSchema);

module.exports = incomingRecords;
