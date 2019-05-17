const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工审批人schema,如果一個員工有两个人或者两个角色，则有两条数据
const processSchema = new mongoose.Schema(
	{
		userId: String, // 角色
		userName: String,
		type: {
			type: Number,
			default: 0
		}, // 员工processType, 流程类型 0-普通，同步考勤是修改流程 1-特殊，同步考勤不修改流程
		deptId: Number,
		deptName: String,
		corpId: String,
		corpName: String,
		year: Number,
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
			} ]
		} ],
		applications: [ { // 预算申请审批人员
			sequence: Number,
			deptId: Number,
			deptName: String,
			users: [ {
				userId: String,
				userName: String
			} ]
		} ],
		finances: [ { // 财务人员，平级关系
			userId: String,
			userName: String
		} ]
	}, {
		collection: 'staffprocesses',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const StaffProcess = mongodb.model('staffprocesses', processSchema);

module.exports = StaffProcess;
