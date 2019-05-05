const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工schema
const staffSchema = new mongoose.Schema(
	{
		corpId: String,
		corpName: String,
		userId: String, // 员工userId
		userName: String, // 员工userName
		// deptId: Number, // 员工所在部门deptId
		// deptName: String,
		mobile: String,
		email: String,
		isAdmin: Boolean,
		isBoss: Boolean,
		isLeader: Boolean,
		position: String,
		avatar: String,
		jobnumber: String,
		departmentIds: [],
		departments: [ {
			deptId: Number,
			deptName: String
		} ],
		costcenters: [ {
			id: String, // 商旅成本中心id
			number: String, // 	成本中心编号
			title: String // 	成本中心名称
		} ],
		invoices: [ {
			id: String,	// 商旅发票id
			title: String // 发票抬头
		} ]
	}, {
		collection: 'staffs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Staffs = mongodb.model('staffs', staffSchema);

module.exports = Staffs;
