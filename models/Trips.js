const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 出差申请单schema
const tripSchema = new mongoose.Schema(
	{
		id: String, // 费控发起审批单id
		code: String, // 审批单code，比如审批单调整后code相同，但是id未必相同
		userId: String, // 发起人
		userName: String,
		deptId: Number,
		deptName: String,
		balance: Number, // 费用快照
		reason: String, // 出差原因
		remark: String, // 备注
		startTime: String, // 开始日期
		finishTime: String, // 结束日期
		tripDay: Number,
		fellowUserIds: [], // 同行人userId
		fellowUsers: [
			{ name: String,
				orgUserName: String,
				nick: String,
				avatar: String,
				emplId: String // userId
			}
		], // 同行人信息
		itineraries: [ {
			tripwayType: Number,
			tripwayName: String,
			oneRound: String,
			depCity: String,
			arrCity: String,
			depDate: String,
			depDateStr: String,
			arrDate: String,
			arrDateStr: String,
			tripDay: Number
		} ], // 行程列表
		processInstanceId: String, // 钉钉审批单ID
		status: Number // 10-创建 20-提交钉钉 30-钉钉通过 4-写入商旅 50-钉钉拒绝 60-用户取消
	}, {
		collection: 'trips',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Trips = mongodb.model('trips', tripSchema);

module.exports = Trips;
