const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 员工schema
const staffSchema = new mongoose.Schema(
	{
		staffId: String,
		staffName: String,
		deptId: String,
		deptName: String
	}, {
		collection: 'staffs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const staff = mongodb.model('staffs', staffSchema);

module.exports = staff;
