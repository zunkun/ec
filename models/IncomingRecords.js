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
		axis: Number, // 1-横轴 2-纵轴
		qq: Number, // 1-定量 2-定性
		pm: Number, // 1-正 2-负
		unit: String, // 单位
		changeType: Number, // 1-新增 2-修改 3-删除
		timestamp: Number,
		syncGateway: { type: Boolean, default: true },
		before: {
			weights: Number,
			incomings: Number, // 目标
			line2: Number, // 2区位
			line4: Number,
			line6: Number,
			line8: Number,
			line10: Number,
			status: Number // 0-弃用 1-使用
		},
		after: {
			weights: Number,
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
		recordsId: String, // 收入调整审批单Id
		sync: { // 是否已同步
			type: Boolean,
			default: false
		},
		syncTime: Date
	}, {
		collection: 'incomingRecords',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const incomingRecords = mongodb.model('incomingRecords', incomingRecordsSchema);

module.exports = incomingRecords;
