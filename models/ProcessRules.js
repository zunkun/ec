const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工审批流
const ruleSchema = new mongoose.Schema(
	{
		userId: String,
		userName: String,
		deptId: Number,
		deptName: String,
		group: { // 预算体
			code: String,
			name: String
		},
		type: String, // 申请类型 1-出差审批流
		approvals1: [ { // 第三级审批人，或签
			userId: String,
			userName: String
		} ],
		approvals2: [ { // 第三级审批人，或签
			userId: String,
			userName: String
		} ],
		approvals3: [ { // 第三级审批人，或签
			userId: String,
			userName: String
		} ],
		category: { // 数据分类 1-程序自动生成  2-手动调整更新，即部门调整不会更新该条数据
			type: Number,
			default: 1
		}
	}, {
		collection: 'ProcessRules',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const ProcessRules = mongodb.model('ProcessRules', ruleSchema);

module.exports = ProcessRules;
