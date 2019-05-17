const Router = require('koa-router');
const router = new Router();
const ServiceResult = require('../core/ServiceResult');
const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const StaffProcess = require('../models/StaffProcess');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.prefix('/api/staffs');

router.get('/', async (ctx, next) => {
	let { page, limit, keywords } = ctx.query;
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let options = {
		corpId: config.corpId
	};
	if (keywords && keywords !== 'undefined') {
		let regex = new RegExp(keywords, 'i');
		options.$or = [
			{ userName: { $regex: regex } },
			{ 'departments.deptName': { $regex: regex } }
		];
	}
	let rows = [];

	let staffs = await Staffs.find(options).skip(offset).limit(limit);
	let count = await Staffs.find(options).countDocuments();

	for (let staff of staffs) {
		rows.push({
			userId: staff.userId,
			userName: staff.userName,
			departments: staff.departments || []
		});
	}

	ctx.body = ServiceResult.getSuccess({ rows, count });
	await next();
});

router.get('/depts', async (ctx, next) => {
	let year = new Date().getFullYear();
	let depts = await Depts.find({ corpId: config.corpId, year });

	let staffRes = [];
	for (let dept of depts) {
		let deptItem = {
			text: dept.deptName,
			id: dept.deptId,
			children: []
		};
		let staffs = await Staffs.find({ 'departments.deptId': dept.deptId });

		for (let staff of staffs) {
			deptItem.children.push({
				deptId: dept.deptId,
				deptName: dept.deptName,
				userId: staff.userId,
				userName: staff.userName,
				text: staff.userName,
				id: staff.userId
			});
		}

		staffRes.push(deptItem);
	}

	ctx.body = ServiceResult.getSuccess(staffRes);
	await next();
});

router.get('/depts2', async (ctx, next) => {
	let year = new Date().getFullYear();
	let depts = await Depts.find({ corpId: config.corpId, year });

	let staffRes = [];
	for (let dept of depts) {
		let deptItem = {
			text: dept.deptName,
			id: dept.deptId,
			children: []
		};
		let staffs = await Staffs.find({ 'departments.deptId': dept.deptId });

		for (let staff of staffs) {
			deptItem.children.push({
				deptId: dept.deptId,
				deptName: dept.deptName,
				userId: staff.userId,
				userName: staff.userName,
				text: staff.userName,
				id: staff.userId
			});
		}

		staffRes.push(deptItem);
	}

	ctx.body = ServiceResult.getSuccess(staffRes);
	await next();
});

router.get('/process', async (ctx, next) => {
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let process = await StaffProcess.findOne({
		corpId: config.corpId,
		userId: user.userId
	});

	if (!process) {
		ctx.body = ServiceResult.getFail('该员工没有流程信息', 404);
		return;
	}

	ctx.body = ServiceResult.getSuccess(process.approvals || []);
});

router.put('/process', async (ctx, next) => {
	let { approvals, type, userId } = ctx.request.body;
	type = Number(type) || 0;
	approvals = approvals || [];

	try {
		await Staffs.updateOne({ userId, corpId: config.corpId }, { processType: type });

		await StaffProcess.updateOne({
			userId,
			corpId: config.corpId
		}, {
			type,
			approvals
		});
	} catch (error) {
		console.error(error);
		ctx.body = ServiceResult.getFail('保存错误');
		return;
	}

	ctx.body = ServiceResult.getSuccess({});
});

module.exports = router;
