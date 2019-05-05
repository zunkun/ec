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
	arrDate: Date,
	day: Number
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
		approvalDepts: [ { // 部门审批
			deptId: Number, // 审批部门
			deptName: String,
			users: [ { // 部门审批人，发消息时给每一个部门主管都发消息
				userId: String,
				userName: String
			} ],
			notified: Boolean, // 是否已通知
			notifyTime: Date, // 通知时间
			approval: Boolean,
			approvalUser: { // 操作该审批单的部门主管，只记录第一个操作的人
				userId: String,
				userName: String
			},
			approvalTime: Date // 部门主管操作时间
		} ],
		trip: {
			day: Number,
			cause: String,
			remark: String
		},
		itineraries: [ itinerarySchema ], // 行程列表
		cotravelers: [ travelerSchema ], // 	同行行人列表
		corpId: String,
		corpName: String,
		title: {
			type: String,
			default: '出差申请'
		},
		rejectCause: String, // 领导拒绝原因
		createTime: Date, // 审批单生成时间
		cancelTime: Date, // 审批单取消时间
		status: Number // 10-创建 20-领导审核中 30-领导申请批通过 40-写入商旅 50-领导拒绝 60-员工取消 70-写入商旅失败
	}, {
		collection: 'approvals',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Approvals = mongodb.model('approvals', approvalSchema);

module.exports = Approvals;
