const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
	tripWay: Number,
	trafficType: Number,
	depCity: String,
	depCityCode: String,
	arrCity: String,
	arrCityCode: String,
	depDate: Date,
	arrDate: Date
});

const travelerSchema = new mongoose.Schema({
	userId: String,
	userName: String,
	deptId: Number,
	deptName: String
});
// 商旅审批schema
const approvalSchema = new mongoose.Schema(
	{
		approvalId: String, // 费控发起审批单id
		userId: String, // 发起人
		userName: String,
		deptId: Number,
		deptName: String,
		approvalUser: [
			{ // 审批人
				userId: String,
				userName: String,
				approval: Boolean,
				approvalTime: Date,
				rejectTime: Date
			}
		],
		trip: {
			day: Number,
			title: String,
			cause: String
		},
		itineraries: [ itinerarySchema ], // 行程列表
		cotravelers: [ travelerSchema ], // 	同行行人列表
		corpId: String,
		corpName: String,
		createTime: Date, // 审批单生成时间
		cancelTime: Date, // 审批单取消时间
		status: Number // 10-创建 20-取消 21-系统取消 30-申请费用 40-领导审核中 50-领导拒绝 60-领导申请批通过 70-写入商旅
	}, {
		collection: 'approvals',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Approvals = mongodb.model('approvals', approvalSchema);

module.exports = Approvals;
