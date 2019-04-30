process.env.NODE_ENV = 'production';

const Stations = require('../models/Stations');
let stations = require('../docs/trainCity');
let fligitStations = require('../docs/flightCity');

async function setTrainCities () {
	let stationObjs = {};
	for (let station of stations) {
		if (!stationObjs[station['省份']]) {
			stationObjs[station['省份']] = { '省份': station['省份'], cities: {} };
		}
		if (!stationObjs[station['省份']].cities[station['城市']]) {
			stationObjs[station['省份']].cities[station['城市']] = {
				city: station['城市'],
				stations: []
			};
		}

		let cityStations = stationObjs[station['省份']].cities[station['城市']].stations;

		if (cityStations.indexOf(station['站名']) === -1) {
			stationObjs[station['省份']].cities[station['城市']].stations.push(station['站名']);
		}
	}

	for (let province in stationObjs) {
		let provinceData = stationObjs[province];

		for (let city in provinceData.cities) {
			console.log(`保存 ${province}-${city}车站`);
			await Stations.updateOne({
				province,
				city,
				type: 1
			}, {
				province,
				city,
				type: 1,
				stations: provinceData.cities[city].stations
			}, { upsert: true });
		}
	}
}

async function setFlightCities () {
	let stationObjs = {};
	for (let station of fligitStations) {
		if (!stationObjs[station['省份']]) {
			stationObjs[station['省份']] = { '省份': station['省份'], cities: {} };
		}
		if (!stationObjs[station['省份']].cities[station['城市']]) {
			stationObjs[station['省份']].cities[station['城市']] = {
				city: station['城市'],
				code: station['编码'],
				stations: []
			};
		}
	}

	for (let province in stationObjs) {
		let provinceData = stationObjs[province];

		for (let city in provinceData.cities) {
			console.log(`保存 ${province}-${city}飞机场`);
			await Stations.updateOne({
				province,
				city,
				type: 2
			}, {
				province,
				city,
				type: 2,
				code: provinceData.cities[city].code,
				stations: []
			}, { upsert: true });
		}
	}
}

setTrainCities();
setFlightCities();
