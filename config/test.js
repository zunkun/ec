let { flight } = require('./area');
console.log(flight.length);
for (let province of flight) {
	if (province.text === '四川') {
		console.log(province.id, province.text);
		console.log(province);
	}
}
