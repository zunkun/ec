const StaffProcess = require('../models/StaffProcess');
const Process = require('../models/Process');
const ServiceResult = require('../core/ServiceResult');
const applicationService = require('../services/applicationService');
const jwt = require('jsonwebtoken');

// const util = require('../core/util');
const config = require('../config');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/processes');

router.get('/personal/:deptId', async (ctx) => {
	let deptId = Number(ctx.params.deptId);
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}

	let process = await StaffProcess.findOne({ corpId: config.corpId, userId: user.userId, deptId });
	if (!process) {
		ctx.body = ServiceResult.getFail('获取process 失败');
		return;
	}

	ctx.body = ServiceResult.getSuccess(process);
});

router.get('/application/:id', async (ctx) => {
	let id = ctx.params.id;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}

	let process = await Process.findOne({ corpId: config.corpId, applicationId: id });
	if (!process) {
		ctx.body = ServiceResult.getFail('获取process 失败');
		return;
	}

	ctx.body = ServiceResult.getSuccess(process);
});

router.post('/application/:id/reject', async (ctx) => {
	let id = ctx.params.id;
	let body = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('拒绝失败');
			return;
		}
		let applications = process.applications || [];

		for (let [ index, item ] of applications.entries()) {
			let userIndex = item.users.findIndex(info => {
				return info.userId === user.userId;
			});
			if (item.approvalTime || userIndex === -1) continue;
			applications[index].status = 30;
			applications[index].note = body.note || '';
			applications[index].approvalTime = new Date();
			applications[index].approvalUser = {
				userId: user.userId,
				userName: user.userName
			};
			break;
		}
		await Process.updateOne({ _id: process._id }, { status: 21, applications });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.error(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/agree', async (ctx) => {
	let id = ctx.params.id;
	let body = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}
		let applications = process.applications || [];

		for (let [ index, item ] of applications.entries()) {
			let userIndex = item.users.findIndex(info => {
				return info.userId === user.userId;
			});
			if (item.approvalTime || userIndex === -1) continue;
			applications[index].status = 20;
			applications[index].note = body.note || '';
			applications[index].approvalTime = new Date();
			applications[index].approvalUser = {
				userId: user.userId,
				userName: user.userName
			};
			break;
		}
		await Process.updateOne({ _id: process._id }, { applications });

		let exists = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.approvalTime': null
		});
		console.log({ exists });
		if (!exists) {
			// 给财务发消息
			applicationService.sendFinanceMsg(process);
			await Process.updateOne({ _id: process._id }, { status: 30 });
		} else {
			// 给上一级领导发消息
			applicationService.sendAppMsg(exists);
		}

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

module.exports = router;
