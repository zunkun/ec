const Router = require('koa-router');
const router = new Router();
const ServiceResult = require('../core/ServiceResult');
const Staffs = require('../models/Staffs');
const Depts = require('../models/Depts');
const config = require('../config');

router.prefix('/api/staffs');

router.get('/', async (ctx, next) => {
	let staffs = await Staffs.find({});

	let data = [];
	for (let staff of staffs) {
		data.push({
			userId: staff.userId,
			userName: staff.userName,
			deptId: staff.deptId,
			deptName: staff.deptName
		});
	}

	ctx.body = ServiceResult.getSuccess(data);
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

module.exports = router;
