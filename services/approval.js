// const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const Approvals = require('../models/Approvals');
const config = require('../config');
const btrip = require('./btrip');
const util = require('../core/util');
const message = require('./message');

class ApprovalService {
	async createApproval (staff, data) {
		const { deptId, cotravelers, trip, itineraries, costcenter, invoice } = data;
		let approvalDepts = [];
		let dept = await Depts.findOne({ deptId, corpId: config.corpId });

		for (let i = 0, length = dept.deptPath.length; i < length; i++) {
			let _deptId = dept.deptPath[i];
			if (_deptId === 1) {
				break;
			}
			let _dept = i === 0 ? dept : await Depts.findOne({ deptId: _deptId, corpId: config.corpId });

			let _managers = [];
			if (!_dept.managers.length) {
				continue;
			}
			for (let manager of _dept.managers) {
				_managers.push({
					userId: manager.userId,
					userName: manager.userName
				});
			}
			approvalDepts.push({
				deptId: _dept.deptId,
				deptName: _dept.deptName,
				users: _managers,
				notified: false,
				approval: false
			});
		}

		let approvalData = {
			approvalId: util.timeCode(),
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
		let { approvalId, approvalUser } = approvalData;
		try {
			await btrip.deleteApproval(approvalData);
			await Approvals.updateOne({ approvalId }, { status: 3, cancelTime: new Date(), cancelUser: approvalUser });
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
			// 給領導推送審批消息
			if (process.env.NODE_ENV !== 'production') {
				userIds = [ '4508346521365159' ];
			}
			try {
				await message.sendApprovalMsg(approval, userIds);
				await Approvals.updateOne({
					approvalId: approval.approvalId,
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
