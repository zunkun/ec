const Incomings = require('../models/Incomings');
const Staffs = require('../models/Staffs');
const Types = require('../models/Types');
const config = require('../config');
const ServiceResult = require('../core/ServiceResult');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/incomings');

router.get('/', async (ctx, next) => {
	let { year, page, limit, keywords } = ctx.query;
	year = Number(year) || new Date().getFullYear();
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let options = {
		year,
		corpId: config.corpId,
		status: 1
	};

	if (keywords && keywords !== 'undefined') {
		let regex = new RegExp(keywords, 'i');
		options.$or = [
			{ code: { $regex: regex } },
			{ typeName: { $regex: regex } },
			{ userName: { $regex: regex } },
			{ jobnumber: { $regex: regex } }
		];
	}

	let incomings = await Incomings.find(options).sort({ userName: 1 }).skip(offset).limit(limit);
	let count = await Incomings.find(options).countDocuments();
	ctx.body = ServiceResult.getSuccess({
		count,
		incomings
	});
});

router.post('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.jobnumber || !data.code || !data.period || !data.incomings) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	let year = Number(data.year) || new Date().getFullYear();
	let staff = await Staffs.findOne({ corpId: config.corpId, jobnumber: data.jobnumber });
	let type = await Types.findOne({ corpId: config.corpId, code: data.code });
	if (!staff || !type) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	let incoming = await Incomings.findOne({ corpId: config.corpId, year, jobnumber: data.jobnumber, code: data.code, period: data.period, status: 1 });
	if (incoming) {
		ctx.body = ServiceResult.getFail('系统已存在该员工的收入目标');
		return;
	}

	incoming = await Incomings.create({
		jobnumber: data.jobnumber,
		userId: staff.userId,
		userName: staff.userName,
		year,
		period: data.period,
		code: data.code,
		typeName: type.name,
		incomings: Number(data.incomings) || 0,
		line2: Number(data.line2) || 0,
		line4: Number(data.line4) || 0,
		line6: Number(data.line6) || 0,
		line8: Number(data.line8) || 0,
		line10: Number(data.line10) || 0,
		status: 1
	});

	ctx.body = ServiceResult.getSuccess(incoming);
	await next();
});

router.delete('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.jobnumber || !data.code || !data.period || !data.year) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let incoming = await Incomings.findOne({ corpId: config.corpId, year: data.year, jobnumber: data.jobnumber, code: data.code, period: data.period, status: 1 });
	if (incoming) {
		ctx.body = ServiceResult.getFail('参数错误');
		return;
	}

	await Incomings.update({
		jobnumber: data.jobnumber,
		code: data.code,
		period: data.period,
		year: Number(data.year)
	}, {
		status: 0
	});

	ctx.body = ServiceResult.getSuccess({});
	await next();
});

router.put('/', async (ctx, next) => {
	let data = ctx.request.body;
	if (!data.jobnumber || !data.code || !data.period || !data.year) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let incoming = await Incomings.findOne({ corpId: config.corpId, year: data.year, jobnumber: data.jobnumber, code: data.code, period: data.period, status: 1 });
	if (incoming) {
		ctx.body = ServiceResult.getFail('参数错误');
		return;
	}

	let document = {};
	if (data.incomings) {
		document.incomings = Number(data.incomings);
	}
	if (data.line2) {
		document.line2 = Number(data.line2);
	}
	if (data.line4) {
		document.line4 = Number(data.line4);
	}
	if (data.line6) {
		document.line6 = Number(data.line6);
	}
	if (data.line8) {
		document.line8 = Number(data.line8);
	}
	if (data.line10) {
		document.line10 = Number(data.line10);
	}

	await Incomings.update({
		jobnumber: data.jobnumber,
		code: data.code,
		period: data.period,
		year: Number(data.year)
	}, document);

	ctx.body = ServiceResult.getSuccess({});
	await next();
});

module.exports = router;
