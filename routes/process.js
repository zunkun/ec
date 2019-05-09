const StaffProcess = require('../models/StaffProcess');
const Process = require('../models/Process');
const ServiceResult = require('../core/ServiceResult');

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

module.exports = router;
