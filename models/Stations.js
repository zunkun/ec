const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema(
	{
		province: {
			code: String,
			name: String
		}, // 省份
		city: {
			code: String,
			name: String
		}, // 城市
		code: String, // 城市代码
		type: Number, // 1-火车站 2-飞机场
		stations: [], // 火车站/飞机场
		pinyin: {
			province: {
				normal: String, // 正常拼音
				initial: String, // 声母
				firstletter: String // 首字母
			},
			city: {
				normal: String,
				initial: String,
				firstletter: String
			}
		}
	}, {
		collection: 'stations',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Stations = mongodb.model('stations', stationSchema);

module.exports = Stations;
