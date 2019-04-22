const mongoose = require('mongoose');
const mongodb = require('../core/db/mongodb');
// 费用分类
const catalogSchema = new mongoose.Schema(
	{
		year: Number,
		code: String, // 费用项目编码
		name: String // 费用项目名称
	}, {
		collection: 'catalogs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Catalogs = mongodb.model('catalogs', catalogSchema);

module.exports = Catalogs;
