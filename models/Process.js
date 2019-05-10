const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工审批人schema,如果一個員工有两个人或者两个角色，则有两条数据
const processSchema = new mongoose.Schema(
	{
		applicationId: String, // 审批流
		userId: String, // 角色
		userName: String,
		deptId: Number,
		deptName: String,
		corpId: String,
		corpName: String,
		year: Number,
		type: String, // 申请类型
		group: {
			code: String,
			name: String
		},
		approvals: [ { // 出差申请审批人员，为上下级关系
			sequence: Number,
			deptId: Number,
			deptName: String,
			users: [ { // 人员为平级关系
				userId: String,
				userName: String
			} ],
			notified: Boolean, // 是否通知
			notifiedTime: Date,
			approvalUser: { // 审批操作领导
				userId: String,
				userName: String
			},
			approvalTime: Number,
			note: String,
			status: Number // 审批状态 10-审批中 20-通过 30-拒绝 40-退回
		} ],
		applications: [ { // 出差申请审批人员，为上下级关系
			sequence: Number,
			deptId: Number,
			deptName: String,
			users: [ { // 人员为平级关系
				userId: String,
				userName: String
			} ],
			notified: Boolean, // 是否通知
			notifiedTime: Date,
			approvalUser: { // 审批操作领导
				userId: String,
				userName: String
			},
			note: String, // 审批意见
			approvalTime: Date,
			status: Number // 审批状态 10-审批中 20-通过 30-拒绝
		} ],
		finances: {
			users: [ { // 财务人员，平级关系
				userId: String,
				userName: String
			} ],
			notified: Boolean,
			notifiedTime: Date,
			status: Number, // 10-调整中 20-调整完成
			adjustTime: Date // 调整时间
		},
		from: [ {
			code: String,
			name: String,
			catalog: String,
			amount: Number, // 调出金额
			users: [ {
				userId: String,
				userName: String
			} ],
			notified: Boolean,
			notifyTime: Date,
			approvalUser: {
				userId: String,
				userName: String
			},
			approvalTime: Date,
			note: String,
			status: Number // 10-审批中 20-同意 30-拒绝
		} ],
		count: Number, // 财务调整金额总计
		to: [ {
			userId: String,
			userName: String,
			notified: Boolean,
			notifyTime: Date,
			approvalTime: Date,
			note: String,
			status: Number // 10-审批中 20-同意 30-拒绝
		} ],
		// 10-员工申请  11-员工取消
		// 20-主管审批中 21-主管拒绝
		// 30-财务调整中
		// 40-调出部门审批中
		// 50-调入部门审批中
		// 60-审批通过 61-费用扣减成功 62-费用扣减失败
		status: Number
	}, {
		collection: 'process',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Process = mongodb.model('process', processSchema);

module.exports = Process;
