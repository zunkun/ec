const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
	deptId: String,
	deptName: String
});
// 预算体
const deptGroupSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		code: String, // 预算体编号
		group: String, // 预算体名称
		depts: [ deptSchema ] // 使用该预算体的部门列表
	}, {
		collection: 'deptgroups',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const DeptGroups = mongodb.model('deptgroups', deptGroupSchema);

module.exports = DeptGroups;
