const ServiceResult = require('../core/ServiceResult');
const Stations = require('../models/Stations');
const letterLists = require('../config/letterLists')

const Router = require('koa-router');
const router = new Router();
router.prefix('/api/area');

function getLetters () {
	var arr = [];

	for (var i = 65; i < 91; i++) {
		arr.push(String.fromCharCode(i));
	}

	return arr;
}

const letters = getLetters();

// let area = require('../config/area');

// router.get('/', async (ctx, next) => {
// 	let type = Number(ctx.query.type) || 0;
// 	let typeMap = {
// 		1: 'flight',
// 		2: 'train',
// 		3: 'vehicle',
// 		4: 'vehicle'
// 	};
// 	if (!typeMap[type]) {
// 		ctx.body = ServiceResult.getFail('参数不正确');
// 		return;
// 	}

// 	ctx.body = ServiceResult.getSuccess(area[typeMap[type]]);
// 	await next();
// });

// 城市列表
router.get('/cities', async (ctx, next) => {
	let type = ctx.query.type;
	if (!type) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	// 飞机城市列表
	let letterMap = { 1: 'flight', 2: 'train' };
	let res = letterLists[letterMap[type]] || {};
	ctx.body = ServiceResult.getSuccess(res);
	next();
});

router.get('/search', async (ctx, next) => {
	let { type, keywords } = ctx.query;
	type = Number(type);
	if (!type || (type !== 1 && type !== 2) || !keywords) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	const options = { type };
	let regex = new RegExp(`^${keywords}`, 'i');
	options.$or = [
		{ userName: { $regex: regex } },
		{ deptName: { $regex: regex } },
		{ 'group.name': { $regex: regex } },
		{ 'approvals.users.userName': { $regex: regex } }
	];
	// 飞机城市列表
	if (type === 1) {
		if (!options.$or) options.$or = [];
		options.$or.push({ city: regex });
		options.$or.push({ abbr: regex });
		options.$or.push({ 'pinyin.city.full': regex });
		options.$or.push({ 'pinyin.city.simple': regex });
	} else {
		if (!options.$or) options.$or = [];
		options.$or.push({ city: regex });
		options.$or.push({ 'pinyin.city.full': regex });
		options.$or.push({ 'pinyin.city.simple': regex });
		options.$or.push({ station: regex });
		options.$or.push({ 'pinyin.station.full': regex });
		options.$or.push({ 'pinyin.station.simple': regex });
	}

	let stations = await Stations.find(options);
	let res = [];
	for (let station of stations) {
		if (station.station) {
			res.push({ city: station.station }); // 火车站
		} else {
			res.push({ city: station.city, abbr: station.abbr }); // 飞机场城市
		}
	}
	ctx.body = ServiceResult.getSuccess(res);
	next();
});

module.exports = router;
