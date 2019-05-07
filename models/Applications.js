const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
	{
		id: String,
		userId: String,
		userName: String,
		deptId: Number,
		deptName: String,
		group: { // 预算部门
			code: String,
			name: String
		},
		balance: Number, // 申请时现存量
		amount: Number, // 申请数量
		cause: String, // 申请原因
		approvalDepts: [ { // 部门审批
			deptId: Number, // 审批部门
			deptName: String,
			users: [ { // 部门审批人，发消息时给每一个部门主管都发消息
				userId: String,
				userName: String
			} ],
			status: Number, // 状态 1-已通知 2-确认 3-拒绝
			notifyTime: Date, // 通知时间
			approvalUser: { // 操作该审批单的部门主管，只记录第一个操作的人
				userId: String,
				userName: String
			},
			approvalTime: Date, // 部门主管操作时间
			note: String // 领导意见
		} ],
		// 申请单状态 10-已提交 20-领导审批中  21-领导通过 22-领导拒绝 30-财务调整中 31-财务调整中 32-财务退回 40-转出部门领导审批中 41-转出部门领导同意 42-转出部门领导拒绝 50-转入部门领导审批中 51-转出部门领导同意 52-转出部门领导拒绝 60-预算调整中 61-预算调整成功 62-预算调整失败
		status: Number,
		finance: [ { // 财务人员
			userId: String,
			userName: String
		} ],
		from: { // 财务调整所出预算部门
			code: String,
			name: String,
			count: Number
		},
		to: { // 财务调整所出预算部门
			code: String,
			name: String,
			count: Number
		},
		financeNote: String, // 财务人员意见
		fromUser: { // 预算部门所出领导意见
			userId: String,
			userName: String,
			role: String,
			note: String, // 审批意见
			approvalTime: Date
		},
		toUser: { // 预算部门所入领导意见
			userId: String,
			userName: String,
			role: String,
			note: String, // 审批意见
			approvalTime: Date
		}
	}, {
		collection: 'applications',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Applications = mongodb.model('applications', applicationSchema);

module.exports = Applications;
