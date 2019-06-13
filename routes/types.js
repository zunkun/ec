const Router = require('koa-router');
const router = new Router();
const Types = require('../models/Types');
const config = require('../config');
const ServiceResult = require('../core/ServiceResult');

router.prefix('/api/types');

router.get('/', async (ctx, next) => {
	let { type } = ctx.query;
	type = type || 'budgets';

	let types = await Types.find({ type, corpId: config.corpId });

	ctx.body = ServiceResult.getSuccess(types);
	await next();
});

router.post('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.type || !data.code) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	if (data.type === 'incomings' && (!data.qq || !data.axis || !data.pm || !data.unit)) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let exist = await Types.findOne({ corpId: config.corpId, code: data.code, type: data.type });
	if (exist) {
		ctx.body = ServiceResult.getFail(`已存在编码 ${data.code}`);
		return;
	}

	data.catalog = 1;
	data.corpId = config.corpId;
	let type = await Types.create(data);

	ctx.body = ServiceResult.getSuccess(type);
	await next();
});

router.put('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.code || !data.type) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let exist = await Types.findOne({ corpId: config.corpId, code: data.code, type: data.type });
	if (!exist) {
		ctx.body = ServiceResult.getFail(`不存在编码 ${data.code}`);
		return;
	}

	data.catalog = 1;
	await Types.updateOne({
		corpId: config.corpId,
		code: data.code
	}, data);

	ctx.body = ServiceResult.getSuccess({});
	await next();
});

router.delete('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.code || !data.type) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let exist = await Types.findOne({ corpId: config.corpId, code: data.code });
	if (!exist) {
		ctx.body = ServiceResult.getFail(`不存在编码 ${data.code}`);
		return;
	}

	await Types.deleteOne({
		corpId: config.corpId,
		type: data.type,
		code: data.code
	});

	ctx.body = ServiceResult.getSuccess({});
	await next();
});

module.exports = router;
