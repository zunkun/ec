process.env.NODE_ENV = 'production';

const Stations = require('../models/Stations');
let stations = require('../docs/trainCity');
let fligitStations = require('../docs/flightCity');
const pinyin = require('pinyin');
const fs = require('fs');

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
				provine: station.province.trim(),
				cities: {}
			};

			trainNumMap.provinces[station.province.trim()] = {
				cNum: 10,
				cities: {}
			};
			trainNumMap.pNum += 1;
		}
		if (!stationObjs[station.province.trim()].cities[station.city.trim()]) {
			let code = `${stationObjs[station.province].code}${trainNumMap.provinces[station.province].cNum}`;

			stationObjs[station.province.trim()].cities[station.city.trim()] = {
				code,
				city: station.city.trim(),
				stations: []
			};

			trainNumMap.provinces[station.province.trim()].cities[station.city.trim()] = {
				sNum: 10,
				stations: {}
			};
			trainNumMap.provinces[station.province.trim()].cNum += 1;
		}

		let cityStations = stationObjs[station.province.trim()].cities[station.city.trim()].stations;

		if (cityStations.indexOf(station.station) === -1) {
			let code = `${stationObjs[station.province.trim()].cities[station.city.trim()].code}${trainNumMap.provinces[station.province.trim()].cities[station.city.trim()].sNum}`;

			stationObjs[station.province.trim()].cities[station.city.trim()].stations.push({
				code,
				station: station.station
			});

			trainNumMap.provinces[station.province.trim()].cities[station.city.trim()].sNum += 1;
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

// setTrainCities();
// setFlightCities();

async function setProivincePinyin () {
	let station = await Stations.findOne({ 'pinyin.province': null });
	if (!station) {
		return;
	}
	let normals = pinyin(station.province.name, {
		style: pinyin.STYLE_NORMAL
	});

	let initials = pinyin(station.province.name, {
		style: pinyin.STYLE_INITIALS
	});

	let firstLetters = pinyin(station.province.name, {
		style: pinyin.STYLE_FIRST_LETTER
	});
	let normal = '';
	let initial = '';
	let firstletter = '';

	for (let item of normals) {
		normal += item[0];
	}

	for (let item of initials) {
		initial += item[0];
	}

	for (let item of firstLetters) {
		firstletter += item[0];
	}

	if (station.province.name === '重庆') {
		normal = 'chongqing';
		initial = 'chq';
		firstletter = 'cq';
	}
	console.log(`保存 ${station.province.name} pinyin`);

	await Stations.updateMany({
		'province.name': station.province.name
	}, {
		'pinyin.province': {
			normal,
			initial,
			firstletter
		}
	});

	setProivincePinyin();
}

async function setCityPinyin () {
	let station = await Stations.findOne({ 'pinyin.city': null });
	if (!station) {
		return;
	}
	let normals = pinyin(station.city.name, {
		style: pinyin.STYLE_NORMAL
	});

	let initials = pinyin(station.city.name, {
		style: pinyin.STYLE_INITIALS
	});

	let firstLetters = pinyin(station.city.name, {
		style: pinyin.STYLE_FIRST_LETTER
	});
	let normal = '';
	let initial = '';
	let firstletter = '';

	for (let item of normals) {
		normal += item[0];
	}

	for (let item of initials) {
		initial += item[0];
	}

	for (let item of firstLetters) {
		firstletter += item[0];
	}
	console.log(`保存 ${station.city.name} pinyin`);

	if (station.city.name === '重庆') {
		normal = 'chongqing';
		initial = 'chq';
		firstletter = 'cq';
	}

	await Stations.updateMany({
		'city.name': station.city.name
	}, {
		'pinyin.city': {
			normal,
			initial,
			firstletter
		}
	});

	setCityPinyin();
}

// setCityPinyin();

setProivincePinyin().then(() => {
	setCityPinyin();
});

async function testCity (type = 0) {
	let areaMap = {};
	let areas = [];
	let provinceArray = [];
	let stations = await Stations.find({ type }).sort({ 'pinyin.province.firstletter': 1, 'pinyin.city.firstletter': 1 });

	console.log(stations.length);

	for (let station of stations) {
		if (!areaMap[station.province.name]) {
			areaMap[station.province.name] = {
				id: station.province.code,
				text: station.province.name,
				children: []
			};
		}
		areaMap[station.province.name].children.push({
			id: station.city.code,
			text: station.city.name
		});
	}

	for (let provinceName of Object.keys(areaMap)) {
		console.log(provinceName);
		areas.push(areaMap[provinceName]);
	}

	fs.writeFileSync(`area${type}.json`, JSON.stringify(areas));
}

testCity(0);
testCity(1);
