const mongodb = require('../core/db/mongodb');
const mongoose = require('mongoose');

// 文件schema
const fileSchema = new mongoose.Schema(
	{
		year: Number,
		corpId: String,
		name: String, // 文件本地保存名称
		origin: String, // 文件原来明恒
		user: {
			userId: String, // 上传文件人
			userName: String,
			deptId: Number, // 部门
			deptName: String
		},
		status: { // 0-上传成功 1-解析成功  2-解析失败
			type: Number,
			default: 0
		}
	}, {
		collection: 'files',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const Files = mongodb.model('files', fileSchema);

module.exports = Files;
