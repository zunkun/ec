const ServiceResult = require('../core/ServiceResult');
const Staffs = require('../models/Staffs');
const jwt = require('jsonwebtoken');

const util = require('../core/util');
const Trips = require('../models/Trips');
const TripService = require('../services/trip');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/trips');

router.post('/', async (ctx, next) => {
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let staff = await Staffs.findOne({ userId: user.userId });
	if (!user || !staff) {
		ctx.body = ServiceResult.getFail('当前用户不存在', 400);
	}
	let tripData = ctx.request.body;
	let valid = true;

	if (!tripData.deptId || !tripData.reason || tripData.balance <= 0) {
		valid = false;
	}
	let depDate = null;
	let arrDate = null;
	for (let it of tripData.itineraries) {
		if ((it.trafficTypeId !== 0 && !it.trafficTypeId) || (it.tripwayId !== 0 && !it.tripwayId) || !it.depCity || !it.arrCity || !it.depDate || !it.arrDate) {
			valid = false;
			break;
		}
		if (it.arrDate < it.depDate && !util.isSameDay(it.arrDate, it.depDate)) {
			valid = false;
			break;
		}

		if (!depDate) {
			depDate = it.depDate;
		}
		if (!arrDate) {
			arrDate = it.depDate;
		}
		if (it.depDate && it.depDate < depDate) {
			depDate = it.depDate;
		}
		if (it.arrDate && it.arrDate < depDate) {
			depDate = it.arrDate;
		}

		if (it.depDate && it.depDate > arrDate) {
			arrDate = it.depDate;
		}
		if (it.arrDate && it.arrDate > arrDate) {
			arrDate = it.arrDate;
		}
	}
	if (!valid) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	tripData.startTime = util.parseDate2Str(depDate);
	tripData.finishTime = util.parseDate2Str(arrDate);
	tripData.tripDay = Math.abs(Math.ceil((arrDate - depDate) / (24 * 60 * 60 * 1000)));
	tripData.userId = user.userId;
	tripData.userName = user.userName;
	tripData.code = util.timeCode();
	tripData.status = 10;
	tripData.processInstanceId = '';

	try {
		const trip = await Trips.create(tripData);
		await TripService.createProcess(trip);
		ctx.body = ServiceResult.getSuccess(trip);
		await next();
	} catch (error) {
		console.error(error);
		ctx.body = ServiceResult.getFail('出差申请失败');
		next();
	}
});

module.exports = router;
