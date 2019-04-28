const Router = require('koa-router');
const router = new Router();
const ServiceResult = require('../core/ServiceResult');
const Staffs = require('../models/Staffs');

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
