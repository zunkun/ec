const ProcessRules = require('../models/ProcessRules');
const ServiceResult = require('../core/ServiceResult');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/rules');

router.get('/', async (ctx, next) => {
	let { page, limit, keywords, type } = ctx.query;
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;
	type = Number(type) || 1;

	const options = { type };
	if (keywords && keywords !== 'undefined') {
		let regex = new RegExp(keywords, 'i');
		options.$or = [
			{ userName: { $regex: regex } },
			{ deptName: { $regex: regex } },
			// { 'group.name': { $regex: regex } },
			{ 'approvals1.userName': { $regex: regex } },
			{ 'approvals2.userName': { $regex: regex } },
			{ 'approvals3.userName': { $regex: regex } }
		];
	}
	let rows = await ProcessRules.find(options).skip(offset).limit(limit);
	let count = await ProcessRules.find(options).countDocuments();

	ctx.body = ServiceResult.getSuccess({ rows, count });
});

router.put('/', async (ctx, next) => {
	let { userId, category, approvals1, approvals2, approvals3 } = ctx.request.body;
	const doc = { approvals1, approvals2, approvals3 };
	if (category) doc.category = category;
	await ProcessRules.updateOne({ userId }, doc);
	ctx.body = ServiceResult.getSuccess({});
	await next();
});

module.exports = router;
