const ServiceResult = require('../core/ServiceResult');
const Stations = require('../models/Stations');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/area');

router.get('/', async (ctx, next) => {
	let type = Number(ctx.query.type) || 0;
	if (type === 3 || type === 4) {
		type = 3;
	}
	console.log({ type });
	let cities = await Stations.find({ type });
	let provinceMap = {};
	let cityMap = {};

	for (let city of cities) {
		if (!provinceMap[city.province.code]) {
			provinceMap[city.province.code] = city.province.name;
		}

		if (!cityMap[city.city.code]) {
			cityMap[city.city.code] = city.city.name;
		}
	}

	ctx.body = ServiceResult.getSuccess({
		province_list: provinceMap,
		city_list: cityMap,
		county_list: {}
	});
	await next();
});

module.exports = router;
