const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 同步部门schema
const syncSchema = new mongoose.Schema(
	{
		corpId: String,
		year: String,
		month: String,
		day: String,
		ap: String,
		deptId: Number,
		type: Number, // 1-通讯录同步 2-机票 3-火车票 4-用车 5-酒店
		status: Number // 0-FAIL 1-SUCCESS
	}, {
		collection: 'syncs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Sync = mongodb.model('syncs', syncSchema);

module.exports = Sync;
