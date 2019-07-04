const Incomings = require('../models/Incomings');
const IncomingRecords = require('../models/IncomingRecords');
const Staffs = require('../models/Staffs');
const Types = require('../models/Types');
const config = require('../config');
const ServiceResult = require('../core/ServiceResult');
const jwt = require('jsonwebtoken');
const syncIncomings = require('../services/syncIncomings');

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

router.get('/history', async (ctx, next) => {
	let { year, page, limit, keywords } = ctx.query;
	year = Number(year) || new Date().getFullYear();
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let options = {
		year,
		corpId: config.corpId
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

	let rows = await IncomingRecords.find(options).sort({ createTime: -1, userName: 1, code: 1 }).skip(offset).limit(limit);
	let count = await IncomingRecords.find(options).countDocuments();
	ctx.body = ServiceResult.getSuccess({
		count,
		rows
	});
});

router.post('/', async (ctx, next) => {
	let data = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let timestamp = Date.now();
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
		corpId: config.corpId,
		jobnumber: data.jobnumber,
		userId: staff.userId,
		userName: staff.userName,
		year,
		period: data.period,
		code: data.code,
		typeName: type.name,
		axis: type.axis,
		qq: type.qq,
		pm: type.pm,
		unit: type.unit,
		weights: Number(data.weights) || 0,
		incomings: Number(data.incomings) || 0,
		line2: Number(data.line2) || 0,
		line4: Number(data.line4) || 0,
		line6: Number(data.line6) || 0,
		line8: Number(data.line8) || 0,
		line10: Number(data.line10) || 0,
		status: 1
	});

	IncomingRecords.create({
		corpId: config.corpId,
		jobnumber: data.jobnumber,
		userId: staff.userId,
		userName: staff.userName,
		year,
		period: data.period,
		code: data.code,
		typeName: type.name,
		axis: type.axis,
		qq: type.qq,
		pm: type.pm,
		unit: type.unit,
		changeType: 1,
		timestamp,
		before: {
			weights: null,
			incomings: null,
			line2: null,
			line4: null,
			line6: null,
			line8: null,
			line10: null,
			status: null
		},
		after: {
			weights: Number(data.weights) || 0,
			incomings: Number(data.incomings) || 0,
			line2: Number(data.line2) || 0,
			line4: Number(data.line4) || 0,
			line6: Number(data.line6) || 0,
			line8: Number(data.line8) || 0,
			line10: Number(data.line10) || 0,
			status: 1
		},
		manager: {
			userId: user.userId,
			userName: user.userName
		}
	}).then(() => {
		return syncIncomings.sync(incoming, 1, timestamp, year);
	});
	ctx.body = ServiceResult.getSuccess(incoming);
	await next();
});

router.delete('/', async (ctx, next) => {
	let data = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let timestamp = Date.now();
	if (!data.jobnumber || !data.code || !data.period || !data.year) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let incoming = await Incomings.findOne({ corpId: config.corpId, year: data.year, jobnumber: data.jobnumber, code: data.code, period: data.period, status: 1 });
	if (!incoming) {
		ctx.body = ServiceResult.getFail('参数错误');
		return;
	}
	await Incomings.updateOne({
		jobnumber: data.jobnumber,
		code: data.code,
		period: data.period,
		year: Number(data.year),
		status: 1
	}, {
		status: 0
	});

	await IncomingRecords.create({
		corpId: config.corpId,
		jobnumber: incoming.jobnumber,
		userId: incoming.userId,
		userName: incoming.userName,
		year: incoming.year,
		period: incoming.period,
		code: incoming.code,
		typeName: incoming.typeName,
		axis: incoming.axis,
		qq: incoming.qq,
		pm: incoming.pm,
		unit: incoming.unit,
		changeType: 3,
		timestamp,
		before: {
			weights: incoming.weights,
			incomings: incoming.incomings,
			line2: incoming.line2,
			line4: incoming.line4,
			line6: incoming.line6,
			line8: incoming.line8,
			line10: incoming.line10,
			status: incoming.status
		},
		after: {
			weights: null,
			incomings: null,
			line2: null,
			line4: null,
			line6: null,
			line8: null,
			line10: null,
			status: 0
		},
		manager: {
			userId: user.userId,
			userName: user.userName
		}
	}).then(() => {
		return syncIncomings.sync(incoming, 0, timestamp, data.year);
	});

	ctx.body = ServiceResult.getSuccess({});
	await next();
});

router.put('/', async (ctx, next) => {
	let data = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let timestamp = Date.now();
	if (!data.jobnumber || !data.code || !data.period || !data.year) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	let incoming = await Incomings.findOne({ corpId: config.corpId, year: data.year, jobnumber: data.jobnumber, code: data.code, period: data.period, status: 1 });
	if (!incoming) {
		ctx.body = ServiceResult.getFail('参数错误');
		return;
	}

	let document = {};
	document.incomings = Number(data.incomings) || incoming.incomings;
	document.line2 = Number(data.line2) || incoming.line2;
	document.line4 = Number(data.line4) || incoming.line4;
	document.line6 = Number(data.line6) || incoming.line6;
	document.line8 = Number(data.line8) || incoming.line8;
	document.line10 = Number(data.line10) || incoming.line10;
	document.weights = Number(data.weights) || incoming.weights;

	await Incomings.updateOne({
		corpId: config.corpId,
		jobnumber: data.jobnumber,
		code: data.code,
		period: data.period,
		year: Number(data.year)
	}, document);

	IncomingRecords.create({
		corpId: config.corpId,
		jobnumber: incoming.jobnumber,
		userId: incoming.userId,
		userName: incoming.userName,
		year: incoming.year,
		period: incoming.period,
		code: incoming.code,
		typeName: incoming.typeName,
		axis: incoming.axis,
		qq: incoming.qq,
		pm: incoming.pm,
		unit: incoming.unit,
		changeType: 2,
		timestamp,
		before: {
			weights: incoming.weights,
			incomings: incoming.incomings,
			line2: incoming.line2,
			line4: incoming.line4,
			line6: incoming.line6,
			line8: incoming.line8,
			line10: incoming.line10,
			status: incoming.status
		},
		after: document,
		manager: {
			userId: user.userId,
			userName: user.userName
		}
	}).then(() => {
		return syncIncomings.sync(incoming, 1, timestamp, data.year);
	});
	ctx.body = ServiceResult.getSuccess({});
	await next();
});

module.exports = router;
