const ServiceResult = require('../core/ServiceResult');
const TrainCity = require('../models/TrainCity');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/address');

router.get('/lists/train', async (ctx, next) => {
	let cities = await TrainCity.find({});
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
			citysObj[city.province].children.push({ label: city.city, value: city.value });
		}
	}

	for (let province in citysObj) {
		trainCities.push(citysObj[province]);
	}
	ctx.body = ServiceResult.getSuccess(trainCities);
	await next();
});

module.exports = router;
