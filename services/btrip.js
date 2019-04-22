const dingding = require('../core/dingding');
const constants = require('../config/constants');
const btripPaths = constants.btrip;
const moment = require('moment');

class Btrip {
	async createApproval (approval) {
		// 获取商旅基础数据
		console.log('【开始】获取商旅成本中心列表');
		let costRes = await dingding.btrip(btripPaths.costCenter, {
			userid: approval.userId,
			corpid: approval.corpId
		});

		if (costRes.errcode !== 0) {
			const error = '【失败】获取用户成本中心列表';
			console.error(error);
			return Promise.reject(error);
		}
		let constCenterLists = costRes.cost_center_list || [];
		if (!constCenterLists.length) {
			let error = `商旅中沒有当前用户 ${approval.userId} ${approval.userName}的费用归属`;
			console.error(error);
			return Promise.reject(error);
		}
		let costCenter = constCenterLists[0];
		console.log('【开始】获取商旅发票列表');

		let invoiceRes = await dingding.btrip(btripPaths.invoice, {
			userid: approval.userId,
			corpid: approval.corpId
		});

		if (invoiceRes.errcode !== 0) {
			let error = '【失败】获取用户发票列表';
			console.error(error);
			return Promise.reject(error);
		}
		let invoiceLists = invoiceRes.invoice || [];
		if (!invoiceLists.length) {
			let error = `商旅中沒有当前用户 ${approval.userId} ${approval.userName}的发票抬头`;
			console.error(error);
			return Promise.reject(error);
		}
		let invoice = invoiceLists[0];

		// 组织数据
		const rq = {
			thirdpart_apply_id: approval.approvalId,
			userid: approval.userId,
			user_name: approval.userName,
			corpid: approval.corpId,
			corp_name: approval.corpName,
			deptid: approval.deptId,
			dept_name: approval.deptName,
			trip_title: approval.trip.title,
			trip_cause: approval.trip.cause,
			traveler_list: [],
			itinerary_list: [],
			status: 1 // 审批通过
		};

		if (approval.travelers) {
			for (let traveler of approval.travelers) {
				rq.traveler_list.push({
					userid: traveler.userId,
					user_name: traveler.userName
				});
			}
		} else {
			rq.traveler_list.push({
				userid: approval.userId,
				user_name: approval.userName
			});
		}
		for (let [ index, it ] of approval.itineraries.entries()) {
			rq.itinerary_list.push({
				trip_way: Number(it.tripWay),
				itinerary_id: `${approval.approvalId}-${index + 1}`,
				traffic_type: Number(it.trafficType),
				dep_city: it.depCity,
				arr_city: it.arrCity,
				invoice_id: invoice.id,
				cost_center_id: costCenter.id,
				dep_date: moment(it.depDate).format('YYYY-MM-DD HH:mm:ss'),
				arr_date: moment(it.arrDate).format('YYYY-MM-DD HH:mm:ss')
			});
		}
		// 写入商旅
		let btripRes = await dingding.btrip(btripPaths.approvalNew, rq);
		if (btripRes.errcode !== 0) {
			let error = `【失败】${approval.approvalId} 写入商旅审批单失败`;
			console.error(error);
			return Promise.reject(error);
		}
		console.log(`【成功】${approval.approvalId} 写入商旅审批单成功`);
		return Promise.resolve();
	}

	async deleteApproval (approvalData) {
		let { corpId, approvalId, approvalUser } = approvalData;
		const rq = {
			thirdpart_apply_id: approvalId,
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
			let error = `【失败】${approvalId} 删除商旅审批单失败`;
			console.error(error);
			return Promise.reject(error);
		}
		console.log(`【成功】${approvalId} 删除商旅审批单成功`);
		return Promise.resolve();
	}
}

const btrip = new Btrip();

module.exports = btrip;
