const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
	userId: String,
	userName: String
});
// 部门schema
const deptSchema = new mongoose.Schema(
	{
		year: Number,
		corpId: String,
		deptId: Number,
		deptName: String,
		parentId: Number,
		parentName: String,
		deptPath: [],
		deptGroup: { // 预算体对应关系
			code: String,
			name: String
		},
		managers: [ managerSchema ]
	}, {
		collection: 'depts',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Dept = mongodb.model('depts', deptSchema);

module.exports = Dept;
