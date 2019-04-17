const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工schema
const staffSchema = new mongoose.Schema(
	{
		userId: String, // 员工userId
		userName: String, // 员工userName
		deptId: Number, // 员工所在部门deptId
		deptName: String,
		ecDept: { // 员工费控所出的部门，目前是钉钉的一级部门
			deptId: Number,
			deptName: String
		}
	}, {
		collection: 'staffs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Staffs = mongodb.model('staffs', staffSchema);

module.exports = Staffs;
