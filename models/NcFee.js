const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 商旅部门费用统计表，按月统计
const ncfeeSchema = new mongoose.Schema(
	{
		corpId: String, // 公司
		corpName: String,
		group: { // 预算体
			code: String,
			name: String
		},
		year: String,
		trip: { type: Number, default: 0 },
		benefits: { type: Number, default: 0 },
		others: { type: Number, default: 0 }
	}, {
		collection: 'ncfees',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const NcFee = mongodb.model('ncfees', ncfeeSchema);

module.exports = NcFee;
