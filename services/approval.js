// const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const Approvals = require('../models/Approvals');
const config = require('../config');
const btrip = require('./btrip');
const util = require('../core/util');
const message = require('./message');
const StaffProcess = require('../models/StaffProcess');

class ApprovalService {
	async createApproval (staff, data) {
		let { deptId, balance, cotravelers, trip, itineraries, costcenter, invoice, approvalDepts } = data;

		let dept = await Depts.findOne({ deptId, corpId: config.corpId });
		if (!approvalDepts || !approvalDepts.length) {
			approvalDepts = [];
			let staffProcess = await StaffProcess.findOne({ corpId: config.corpId, userId: staff.userId });
			let approvals = staffProcess.approvals || [];
			for (let index in approvals) {
				let approval = approvals[index];
				let approvalDept = {
					deptId: approval.deptId,
					deptName: approval.deptName,
					notified: false,
					approval: false
				};

				let users = approval.users || [];
				let managers = [];
				for (let user of users) {
					managers.push({
						userId: user.userId,
						userName: user.userName
					});
				}
				approvalDept.users = managers;
				approvalDepts.push(approvalDept);
			}
		}

		let approvalData = {
			id: util.timeCode(),
			userId: staff.userId,
			userName: staff.userName,
			deptId,
			deptName: dept.deptName,
			balance,
			trip,
			cotravelers,
			itineraries,
			corpId: config.corpId,
			corpName: config.corpName,
			status: 10,
			approvalDepts,
			costcenter,
			invoice
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
		let { id, approvalUser } = approvalData;
		try {
			await btrip.deleteApproval(approvalData);
			await Approvals.updateOne({ id }, { status: 3, cancelTime: new Date(), cancelUser: approvalUser });
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async sendApprovalMsg (approval) {
		let approvalDepts = approval.approvalDepts || [];
		let userIds = [];
		let _id = '';
		for (let item of approvalDepts) {
			if (!item.notified && !item.approvalTime) {
				for (let user of item.users) {
					userIds.push(user.userId);
				}
				_id = item._id;
				break;
			}
		}
		if (userIds.length) {
			try {
				await message.sendApprovalMsg(approval, userIds);
				await Approvals.updateOne({
					id: approval.id,
					approvalDepts: {
						$elemMatch: { _id }
					}
				}, {
					$set: {
						status: 20,
						'approvalDepts.$.notified': true,
						'approvalDepts.$.notifyTime': new Date()
					}
				});
				return Promise.resolve();
			} catch (error) {
				console.log({ error });
				return Promise.reject('发送领导审批消息失败');
			}
		}
	}
}

let approvalService = new ApprovalService();
module.exports = approvalService;
