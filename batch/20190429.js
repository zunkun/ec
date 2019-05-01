process.env.NODE_ENV = 'production';

const Stations = require('../models/Stations');
let stations = require('../docs/trainCity');
let fligitStations = require('../docs/flightCity');

let trainNumMap = {
	pNum: 10,
	provinces: {

	}
};

let flightNumMap = {
	pNum: 10,
	provinces: {

	}
};

async function setTrainCities () {
	let stationObjs = {};
	for (let station of stations) {
		if (!stationObjs[station.province]) {
			let code = trainNumMap.pNum;

			stationObjs[station.province] = {
				code,
				provine: station.province,
				cities: {}
			};

			trainNumMap.provinces[station.province] = {
				cNum: 10,
				cities: {}
			};
			trainNumMap.pNum += 1;
		}
		if (!stationObjs[station.province].cities[station.city]) {
			let code = `${stationObjs[station.province].code}${trainNumMap.provinces[station.province].cNum}`;

			stationObjs[station.province].cities[station.city] = {
				code,
				city: station.city,
				stations: []
			};

			trainNumMap.provinces[station.province].cities[station.city] = {
				sNum: 10,
				stations: {}
			};
			trainNumMap.provinces[station.province].cNum += 1;
		}

		let cityStations = stationObjs[station.province].cities[station.city].stations;

		if (cityStations.indexOf(station.station) === -1) {
			let code = `${stationObjs[station.province].cities[station.city].code}${trainNumMap.provinces[station.province].cities[station.city].sNum}`;

			stationObjs[station.province].cities[station.city].stations.push({
				code,
				station: station.station
			});

			trainNumMap.provinces[station.province].cities[station.city].sNum += 1;
		}
	}

	for (let province in stationObjs) {
		let provinceData = stationObjs[province];

		for (let city in provinceData.cities) {
			console.log(`保存 ${province}-${city}车站`);
			await Stations.updateOne({
				'province.name': province,
				'city.name': city,
				type: 0
			}, {
				province: {
					code: `${provinceData.code}0000`,
					name: province
				},
				city: {
					code: `${provinceData.cities[city].code}00`,
					name: city
				},
				type: 0,
				stations: provinceData.cities[city].stations
			}, { upsert: true });
		}
	}
}

async function setFlightCities () {
	let stationObjs = {};
	for (let station of fligitStations) {
		if (!stationObjs[station.province]) {
			let code = flightNumMap.pNum;

			stationObjs[station.province] = {
				code,
				provine: station.province,
				cities: {}
			};

			flightNumMap.provinces[station.province] = {
				cNum: 10,
				cities: {}
			};
			flightNumMap.pNum += 1;
		}
		if (!stationObjs[station.province].cities[station.city]) {
			let code = `${stationObjs[station.province].code}${flightNumMap.provinces[station.province].cNum}`;

			stationObjs[station.province].cities[station.city] = {
				code,
				cityCode: station.code,
				city: station.city,
				stations: []
			};

			flightNumMap.provinces[station.province].cities[station.city] = {
				sNum: 10,
				stations: {}
			};
			flightNumMap.provinces[station.province].cNum += 1;
		}

		let cityStations = stationObjs[station.province].cities[station.city].stations;

		if (cityStations.indexOf(station.station) === -1) {
			let code = `${stationObjs[station.province].cities[station.city].code}${flightNumMap.provinces[station.province].cities[station.city].sNum}`;

			stationObjs[station.province].cities[station.city].stations.push({
				code,
				name: station.city
			});

			flightNumMap.provinces[station.province].cities[station.city].sNum += 1;
		}
	}

	for (let province in stationObjs) {
		let provinceData = stationObjs[province];

		for (let city in provinceData.cities) {
			console.log(`保存 ${province}-${city}车站`);
			await Stations.updateOne({
				'province.name': province,
				'city.name': city,
				type: 1
			}, {
				province: {
					code: `${provinceData.code}0000`,
					name: province
				},
				city: {
					code: `${provinceData.cities[city].code}00`,
					name: city
				},
				code: provinceData.cities[city].cityCode,
				type: 1,
				stations: provinceData.cities[city].stations
			}, { upsert: true });
		}
	}
}

setTrainCities();
setFlightCities();
