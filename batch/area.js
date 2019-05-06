const { province_list, city_list } = require('../config/commonCity');
const Area = require('../models/Area');
const Stations = require('../models/Stations');

async function setAreaType2 () {
	let areaMap = {};
	for (let code of Object.keys(province_list)) {
		let code1 = code.slice(0, 2);
		areaMap[code1] = {
			id: code,
			text: province_list[code],
			children: []
		};
	}

	for (let code of Object.keys(city_list)) {
		let code1 = code.slice(0, 2);
		areaMap[code1].children.push({
			id: code,
			text: city_list[code]
		});
	}
	let areas = [];

	for (let key of Object.keys(areaMap)) {
		areas.push(areaMap[key]);
	}

	for (let area of areas) {
		area.type = 2;
		console.log(`保存 ${area.text}城市数据`);
		await Area.updateOne({
			type: 2,
			id: area.code
		}, area, { upsert: true });
	}
}

// setAreaType2();

// let trainCity = require('../docs/trainCity');
async function setAreaType1 (type) {
	// let stations = await
	let stations = await Stations.find({ type });
	let areaMap = {};

	for (let index in stations) {
		let station = stations[index];
		if (!areaMap[station.province.code]) {
			areaMap[station.province.code] = {
				id: station.province.code,
				text: station.province.name,
				children: []
			};
		}

		areaMap[station.province.code].children.push({
			id: station.city.code,
			text: station.city.name
		});
	}
	let areas = [];
	for (let code of Object.keys(areaMap)) {
		areas.push(areaMap[code]);
	}

	for (let area of areas) {
		// area.type = 2;
		console.log(`保存 ${area.text}城市数据`);
		await Area.updateOne({
			type,
			id: area.code
		}, area, { upsert: true });
	}
}

const fs = require('fs');
async function saveCities (type) {
	let areas = await Area.find({});
	let data = {
		flight: [],
		train: [],
		vehicle: []
	};

	let typeMap = [ 'flight', 'train', 'vehicle' ];

	for (let area of areas) {
		data[typeMap[area.type]].push({
			id: area.id,
			text: area.text,
			children: area.children
		});
	}

	fs.writeFileSync('./area.json', JSON.stringify(data));
	console.log('完成');
}

// saveCities();
