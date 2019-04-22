const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
	tripWay: Number,
	trafficType: Number,
	depCity: String,
	arrCity: String,
	depDate: Date,
	arrDate: Date
});

const travelerSchema = new mongoose.Schema({
	userId: String,
	userName: String
});
// 商旅审批schema
const approvalSchema = new mongoose.Schema(
	{
		approvalId: String, // 费控发起审批单id
		userId: String, // 发起人
		userName: String,
		deptId: Number,
		deptName: String,
		approvalUser: { // 审批人
			userId: String,
			userName: String
		},
		trip: {
			title: String,
			cause: String
		},
		itineraries: [ itinerarySchema ], // 行程列表
		travelers: [ travelerSchema ], // 	出行人列表
		corpId: String,
		corpName: String,
		createTime: Date, // 审批单生成时间
		cancelTime: Date, // 审批单取消时间
		cancelUser: {
			userId: String,
			userName: String
		},
		status: Number // 1-写入商旅 2-系统取消 3-用户取消
	}, {
		collection: 'approvals',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Approvals = mongodb.model('approvals', approvalSchema);

module.exports = Approvals;
