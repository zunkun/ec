const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema(
	{
		province: String, // 省份
		city: String, // 城市
		code: String, // 城市代码
		type: Number, // 1-火车站 2-飞机场
		stations: [] // 火车站/飞机场
	}, {
		collection: 'stations',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const TrainCity = mongodb.model('stations', stationSchema);

module.exports = TrainCity;
