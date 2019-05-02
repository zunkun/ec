const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const Approvals = require('../models/Approvals');
const config = require('../config');
const btrip = require('./btrip');
const util = require('../core/util');

class ApprovalService {
	async createApproval (staff, data) {
		const { deptId, cotravelers, trip, itineraries } = data;
		let dept = await Depts.findOne({ deptId });

		let approvalData = {
			approvalId: `${Date.now()}${parseInt(Math.random() * 10000, 10)}`,
			userId: staff.userId,
			userName: staff.userName,
			deptId,
			deptName: dept.deptName,
			trip,
			cotravelers,
			itineraries,
			corpId: config.corpId,
			corpName: config.corpName,
			status: 10,
			createTime: new Date()
		};

		try {
			let approval = await Approvals.create(approvalData);
			return Promise.resolve(approval);
		} catch (error) {
			console.log('生成审批单错误', error);
			return Promise.reject(error);
		}
	}

	async deleteApproval (approvalData) {
		let { approvalId, approvalUser } = approvalData;
		try {
			await btrip.deleteApproval(approvalData);
			await Approvals.updateOne({ approvalId }, { status: 3, cancelTime: new Date(), cancelUser: approvalUser });
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

let approvalService = new ApprovalService();
module.exports = approvalService;
