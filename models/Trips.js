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
			trafficTypeId: Number,
			trafficTypeName: String, // 交通工具
			tripwayId: Number,
			tripwayName: String, // 单程往返
			depCity: String,
			arrCity: String,
			depDate: String,
			depDateStr: String,
			arrDate: String,
			arrDateStr: String,
			tripDay: Number
		} ], // 行程列表
		approvalUserIds: [], // 审批人userId表
		approvalUsers: [ { // 审批人详细信息
			userId: String,
			userName: String
		} ],
		referProcessInstanceId: String, // 引用应用审批单_id, 该字段有表示未MODIFY 或者为 REVOKE审批单实例
		processInstanceId: String, // 钉钉审批单ID
		businessId: String, // 钉钉审批单 审批实例业务编号 通过分析钉钉审批单，多个关联审批单中， 该字段相同
		bizAction: String, // 钉钉审批单 审批实例业务动作，MODIFY表示该审批实例是基于原来的实例修改而来，REVOKE表示该审批实例对原来的实例进行撤销，NONE表示正常发起
		approvalStatus: String, // 钉钉审批单 审批状态，分为	NEW（新创建）	RUNNING（运行中）TERMINATED（被终止）COMPLETED（完成）
		result: String, // 钉钉审批单 审批结果，分为 agree 和 refuse
		status: Number, // 使用出差审批应用审批单结果 10-创建 20-提交钉钉 21-提交钉钉失败 30-钉钉通过 31-钉钉拒绝 40-写入商旅 41-写入商旅失败 50-用户取消 60-数据作废
		url: String // 审批单url
	}, {
		collection: 'trips',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Trips = mongodb.model('trips', tripSchema);

module.exports = Trips;
