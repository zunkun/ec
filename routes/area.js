const ServiceResult = require('../core/ServiceResult');
const Stations = require('../models/Stations');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/area');
let area = require('../config/area');

router.get('/', async (ctx, next) => {
	let type = Number(ctx.query.type) || 0;
	let typeMap = {
		0: 'flight',
		1: 'train',
		2: 'vehicle',
		3: 'vehicle'
	};
	if (!typeMap[type]) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	ctx.body = ServiceResult.getSuccess(area[typeMap[type]]);
	await next();

	// let stations = await Stations.find({ type });
	// let areaMap = {};

	// for (let index in stations) {
	// 	let station = stations[index];
	// 	if (!areaMap[station.province.code]) {
	// 		areaMap[station.province.code] = {
	// 			index: Number(index),
	// 			id: station.province.code,
	// 			text: station.province.name,
	// 			children: []
	// 		};
	// 	}

	// 	areaMap[station.province.code].children.push({
	// 		id: station.city.code,
	// 		parent: station.province.code,
	// 		parentIndex: areaMap[station.province.code].index,
	// 		text: station.city.name
	// 	});
	// }

	// for (let code of Object.keys(areaMap)) {
	// 	areaLists.push(areaMap[code]);
	// }

	// ctx.body = ServiceResult.getSuccess(areaLists);
	// await next();
});

module.exports = router;
