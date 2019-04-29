const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 系统用户schema，区别于staff,user有管理权限
// 或者废弃user,采用staff 的钉钉管理权限也行，待定
const citySchema = new mongoose.Schema(
	{
		province: String, // 省份
		city: String, // 城市
		stations: [] // 火车站
	}, {
		collection: 'trainCities',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const TrainCity = mongodb.model('trainCities', citySchema);

module.exports = TrainCity;
