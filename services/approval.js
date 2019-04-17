const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const Approvals = require('../models/Approvals');
const config = require('../config');
const btrip = require('./btrip');

class ApprovalService {
	async createApproval (data) {
		const { userId, deptId, approvalId, approvalUser, travelers, trip, itineraries } = data;
		let user = await Staffs.findOne({ userId });
		let dept = await Depts.findOne({ deptId });

		let approvalData = {
			approvalId,
			userId,
			userName: user.userName,
			deptId,
			deptName: dept.deptName,
			approvalUser,
			ecDept: dept.ecDept || {},
			trip,
			travelers,
			itineraries,
			corpId: config.corpId,
			corpName: config.corpName,
			status: 1,
			createTime: new Date()
		};
		try {
			await btrip.createApproval(approvalData);
			let approval = await Approvals.create(approvalData);
			return Promise.resolve(approval);
		} catch (error) {
			console.log('生成审批单错误', error);
			await Approvals.updateOne({ approvalId }, { status: 2, cancelTime: new Date() });
			return Promise.reject(error);
		}
	}

	async deleteApproval (approvalData) {
		let { approvalId, approvalUser } = approvalData;
		try {
			await btrip.deleteApproval(approvalData);
			await Approvals.updateOne({ approvalId }, { status: 3, cancelTime: new Date(), cancelUser: approvalUser });
		} catch (error) {

		}
	}
}

let approvalService = new ApprovalService();
module.exports = approvalService;
