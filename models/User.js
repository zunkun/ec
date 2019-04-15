const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 系统用户schema，区别于staff,user有管理权限
// 或者废弃user,采用staff 的钉钉管理权限也行，待定
const userSchema = new mongoose.Schema(
	{
		userId: String,
		userName: String,
		deptId: String,
		deptName: String
	}, {
		collection: 'users',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const User = mongodb.model('users', userSchema);

module.exports = User;
