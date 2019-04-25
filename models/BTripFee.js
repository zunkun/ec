const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 商旅部门费用统计表，按月统计
const btripfeeSchema = new mongoose.Schema(
	{
		corpId: String, // 公司
		corpName: String,
		group: { // 预算体
			code: String,
			name: String
		},
		year: String,
		month: String,
		total: { type: Number, default: 0 }, // 部门月商旅总费用
		flight: { type: Number, default: 0 },
		train: { type: Number, default: 0 },
		vehicle: { type: Number, default: 0 },
		hotel: { type: Number, default: 0 }
	}, {
		collection: 'btripfees',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const BTripFee = mongodb.model('btripfees', btripfeeSchema);

module.exports = BTripFee;
