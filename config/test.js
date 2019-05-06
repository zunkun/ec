const { province_list, city_list } = require('./commonCity');

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
