const dingding = require('../core/dingding');
const constants = require('../config/constants');
const config = require('../config');
const btripPaths = constants.btrip;
const moment = require('moment');
const Approvals = require('../models/Approvals');

class Btrip {
	async getCostCenter (userId) {
		let costRes = await dingding.btrip(btripPaths.costCenter, {
			userid: userId,
			corpid: config.corpId
		});

		if (costRes.errcode !== 0) {
			const error = '【失败】获取用户成本中心列表';
			console.error(error);
			return Promise.reject(error);
		}
		let constCenterLists = costRes.cost_center_list || [];
		if (!constCenterLists.length) {
			let error = `商旅中沒有当前用户 ${userId} 的费用归属`;
			console.error(error);
			return Promise.reject(error);
		}
		return constCenterLists[0];
	}

	async getInvoice (userId) {
		let invoiceRes = await dingding.btrip(btripPaths.invoice, {
			userid: userId,
			corpid: config.corpId
		});

		if (invoiceRes.errcode !== 0) {
			let error = '【失败】获取用户发票列表';
			console.error(error);
			return Promise.reject(error);
		}
		let invoiceLists = invoiceRes.invoice || [];
		if (!invoiceLists.length) {
			let error = `商旅中沒有当前用户 ${userId}的发票抬头`;
			console.error(error);
			return Promise.reject(error);
		}
		return invoiceLists[0];
	}

	async createApproval (approval) {
		// 获取商旅基础数据
		console.log('【开始】获取商旅成本中心列表');
		try {
			let costcenter;
			let invoice;

			if (!approval.costcenter) {
				costcenter = await this.getCostCenter(approval.userId) || {};
			}
			console.log('【开始】获取商旅发票列表');
			if (!approval.invoice) {
				invoice = await this.getInvoice(approval.userId) || {};
			}

			// 组织数据
			const rq = {
				thirdpart_apply_id: approval.id,
				userid: approval.userId,
				user_name: approval.userName,
				corpid: config.corpId,
				corp_name: config.corpName,
				deptid: approval.deptId,
				dept_name: approval.deptName,
				trip_title: approval.trip.title || '商旅出差',
				trip_cause: approval.trip.cause,
				traveler_list: [ {
					userid: approval.userId,
					user_name: approval.userName
				} ],
				itinerary_list: [],
				status: 1 // 审批通过
			};

			if (approval.cotravelers) {
				for (let traveler of approval.cotravelers) {
					rq.traveler_list.push({
						userid: traveler.userId,
						user_name: traveler.userName
					});
				}
			}

			for (let [ index, it ] of approval.itineraries.entries()) {
				rq.itinerary_list.push({
					trip_way: Number(it.tripWay),
					itinerary_id: `${approval.id}-${index + 1}`,
					traffic_type: Number(it.trafficType),
					dep_city: it.depCity,
					arr_city: it.arrCity,
					invoice_id: approval.invoice ? approval.invoice.id : invoice.id,
					cost_center_id: approval.costcenter ? approval.costcenter.id : costcenter.id,
					dep_date: moment(it.depDate).format('YYYY-MM-DD HH:mm:ss'),
					arr_date: moment(it.arrDate).format('YYYY-MM-DD HH:mm:ss')
				});
			}
			// 写入商旅
			let btripRes = await dingding.btrip(btripPaths.approvalNew, rq);
			if (btripRes.errcode !== 0) {
				let error = `【失败】${approval.id} 写入商旅审批单失败`;
				console.error(btripRes);
				return Promise.reject(error);
			}
			console.log(`【成功】${approval.id} 写入商旅审批单成功`);
			await Approvals.updateOne({ id: approval.id }, { status: 40 });
			return Promise.resolve();
		} catch (error) {
			await Approvals.updateOne({ id: approval.id }, { status: 70 });
			return Promise.reject(error);
		}
	}

	async deleteApproval (approvalData) {
		let { corpId, id, approvalUser } = approvalData;
		const rq = {
			thirdpart_apply_id: id,
			operate_time: moment().format('YYYY-MM-DD HH:mm:ss'),
			status: 4,
			userid: approvalUser.userId,
			user_name: approvalUser.userName,
			note: '领导取消审批单',
			corpid: corpId
		};

		// 删除商旅审批单
		let btripRes = await dingding.btrip(btripPaths.approvalUpdate, rq);
		if (btripRes.errcode !== 0) {
			let error = `【失败】${id} 删除商旅审批单失败`;
			console.error(error);
			return Promise.reject(error);
		}
		console.log(`【成功】${id} 删除商旅审批单成功`);
		return Promise.resolve();
	}
}

const btrip = new Btrip();

module.exports = btrip;
