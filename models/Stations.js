const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 飞机火车站表
const stationSchema = new mongoose.Schema(
	{
		id: String,
		type: Number, // 类型 1-飞机 2-火车
		station: String, // 站名
		abbr: String, // 站名简称字母 比如 阿克苏 AKU
		stationLetter: String, // 车站飞机站首字母，比如A,B
		cityLetter: String, // 城市首字母
		city: String, // 城市名称, 火车站有城市名称
		pinyin: {
			station: {
				full: String, // 全拼
				simple: String // 拼音首字母表 比如上海  SH
			},
			city: {
				full: String, // 全拼
				simple: String // 拼音首字母表 比如上海  SH
			}
		}
	}, {
		collection: 'stations',
		autoIndex: true
	});

const Stations = mongodb.model('stations', stationSchema);

module.exports = Stations;
