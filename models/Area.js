const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema(
	{
		province: {
			code: String,
			name: String
		}, // 省份
		city: {
			code: String,
			name: String
		}, // 城市
		country: [ { // 市县
			code: String,
			name: String
		} ]
	}, {
		collection: 'areas',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Area = mongodb.model('areas', areaSchema);

module.exports = Area;
