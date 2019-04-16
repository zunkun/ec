const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 同步部门schema
const syncSchema = new mongoose.Schema(
	{
		corpId: String,
		year: Number,
		month: Number,
		day: Number,
		ap: String,
		deptId: Number,
		status: Number // 0-FAIL 1-SUCCESS
	}, {
		collection: 'syncs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Sync = mongodb.model('syncs', syncSchema);

module.exports = Sync;
