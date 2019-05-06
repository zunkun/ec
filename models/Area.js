const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema(
	{
		type: Number, // 类型
		id: String,
		text: String,
		children: {
			id: String,
			text: String
		}
	}, {
		collection: 'areas',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Area = mongodb.model('areas', areaSchema);

module.exports = Area;
