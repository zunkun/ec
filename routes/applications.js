const Applications = require('../models/Applications');
// const Depts = require('../models/Applications');
const ServiceResult = require('../core/ServiceResult');

const jwt = require('jsonwebtoken');

const util = require('../core/util');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/applications');

router.post('/', async (ctx, next) => {
	const application = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (user.userId !== application.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	if (!application.deptId || !application.amount || !application.cause) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	application.id = util.timeCode();
	try {
		let res = await Applications.create(application);
		ctx.body = ServiceResult.getSuccess(res);
	} catch (error) {
		ctx.body = ServiceResult.getFail('保存申请单失败');
	}
	await next();
});

router.get('/:id', async (ctx, next) => {
	let id = ctx.params.id;

	let application = await Applications.findOne({ id });
	if (!application) {
		ctx.body = ServiceResult.getFail('没有申请单');
		return;
	}
	ctx.body = ServiceResult.getSuccess(application);
	await next();
});

router.put('/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let application = ctx.request.body;

	try {
		await Applications.updateOne({ id }, application);
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.error('修改预算申请单失败', error);
		ctx.body = ServiceResult.getFail('修改预算申请单失败');
	}
	await next();
});

module.exports = router;
