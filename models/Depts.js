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
		managers: [ managerSchema ],
		ecDept: { // 费用由那个部门出
			deptId: Number,
			deptName: String
		}
	}, {
		collection: 'depts',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Dept = mongodb.model('depts', deptSchema);

module.exports = Dept;
