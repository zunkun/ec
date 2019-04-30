const ServiceResult = require('../core/ServiceResult');
const Stations = require('../models/Stations');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/address');

router.get('/lists', async (ctx, next) => {
	let type = Number(ctx.query.type) || 1;
	let cities = await Stations.find({ type });
	let trainCities = [];
	let citysObj = {};
	for (let city of cities) {
		if (!citysObj[city.province]) {
			citysObj[city.province] = {
				label: city.province,
				value: city.province,
				children: []
			};
		}
		let index = citysObj[city.province].children.findIndex(item => {
			return item.value === city.city;
		});
		if (index === -1) {
			citysObj[city.province].children.push({ label: city.city, value: city.city });
		}
	}

	for (let province in citysObj) {
		trainCities.push(citysObj[province]);
	}
	ctx.body = ServiceResult.getSuccess(trainCities);
	await next();
});

module.exports = router;
