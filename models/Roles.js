const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 角色schema
const roleSchema = new mongoose.Schema(
	{
		group: { // 角色组
			id: String,
			name: String
		},
		id: String, // 角色
		name: String,
		corpId: String,
		corpName: String,
		year: Number,
		users: [ {
			userId: String,
			userName: String
		} ]
	}, {
		collection: 'roles',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Roles = mongodb.model('roles', roleSchema);

module.exports = Roles;
