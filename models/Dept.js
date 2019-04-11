const mongoose = require('mongoose');
const mongodb = require('../core/db/mongodb');

const managerSchema = new mongoose.Schema({
	userId: String,
	userName: String
});
// 部门schema
const deptSchema = new mongoose.Schema(
	{
		deptId: String,
		deptName: String,
		managers: [ managerSchema ]
	}, {
		collection: 'depts',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Dept = mongodb.model('depts', deptSchema);

module.exports = Dept;
