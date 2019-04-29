process.env.NODE_ENV = 'production';

const TrainCity = require('../models/TrainCity');
// const config = require('../config');
const fs = require('fs');
const path = require('path');
let stations = require('../docs/trainCity');

async function setTrainCities () {
	// stations = JSON.parse(stations);
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
			await TrainCity.updateOne({
				province,
				city
			}, {
				province,
				city,
				stations: provinceData.cities[city].stations
			}, { upsert: true });
		}
	}
}

setTrainCities();
