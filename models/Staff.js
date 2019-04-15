import mongoose from 'mongoose';
import mongodb from '../core/db/mongodb';

// 员工schema
const staffSchema = new mongoose.Schema(
	{
		staffId: String,
		staffName: String,
		deptId: String,
		deptName: String
	}, {
		collection: 'staffs',
		autoIndex: true,
		timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
	});

const staff = mongodb.model('staffs', staffSchema);

export default staff;
