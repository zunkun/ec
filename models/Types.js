const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');
// const config = require('../config');
// 类型schema
const typeSchema = new mongoose.Schema(
	{
		corpId: String,
		code: String,
		name: String,
		type: String, // budgets-预算费用 incomings-收入目标
		catalog: Number // 0-系统 1-自定义
	}, {
		collection: 'types',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Types = mongodb.model('types', typeSchema);

// let types = [ {
// 	code: 'benefits',
// 	name: '福利费',
// 	type: 'budgets',
// 	catalog: 0
// }, {
// 	code: 'trip',
// 	name: '差旅费',
// 	type: 'budgets',
// 	catalog: 0
// }, {
// 	code: 'others',
// 	name: '其他',
// 	type: 'budgets',
// 	catalog: 0
// } ];

// async function initTypes () {
// 	console.log('初始化type类型');

// 	for (let type of types) {
// 		await Types.updateOne({
// 			code: type.code,
// 			type: type.type,
// 			corpId: config.corpId
// 		}, type, { upsert: true });
// 	}
// }

// initTypes().then();

module.exports = Types;
