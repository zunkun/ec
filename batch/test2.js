process.env.NODE_ENV = 'production';
const Stations = require('../models/Stations');
const fs = require('fs');

function getLetters () {
	var arr = [];

	for (var i = 65; i < 91; i++) {
		arr.push(String.fromCharCode(i));
	}

	return arr;
}

const letters = getLetters();
console.log(letters);

async function getFlightCities () {
	let res = {};
	for (let letter of letters) {
		let stations = await Stations
			.find({ type: 1, cityLetter: letter })
			.select({ city: 1, abbr: 1, cityLetter: 1 });
    if(!stations.length) continue;
    let stationSet = new Set()
    let stationArr = []
    for(let station of stations) {
      if(stationSet.has(station.city)) continue;
      stationSet.add(station.city);
      stationArr.push({
        city: station.city,
        abbr: station.abbr
      });
      res[letter] = stationArr;
    }
  }

  fs.writeFileSync('./flightjson.json', JSON.stringify(res)) 
}


async function getTrainCities () {
	let res = {};
	for (let letter of letters) {
    let letterCitySet = new Set()
    let letterCities = []
		let stations = await Stations
      .find({ type: 2, cityLetter: letter })
      
    if(!stations.length) continue;
    let stationSet = new Set()
    let stationArr = []
    for(let station of stations) {
      if(stationSet.has(station.city)) continue;
      stationSet.add(station.city);
      stationArr.push({
        city: station.city,
      });
      res[letter] = stationArr;
    }
  }

  fs.writeFileSync('./trainjson.json', JSON.stringify(res)) 
}



// getFlightCities();
getTrainCities()
