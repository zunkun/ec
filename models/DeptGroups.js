const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 预算体
const deptGroupSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		code: String, // 预算体编号
		name: String // 预算体名称
	}, {
		collection: 'deptgroups',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const DeptGroups = mongodb.model('deptgroups', deptGroupSchema);

module.exports = DeptGroups;
