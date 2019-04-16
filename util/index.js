const Catalogs = require('../models/Catalogs');

class Util {
	genCatalogId () {
		return `H${Math.random().toFixed(6).slice(-6)}`;
	}

	async wait (time) {
		console.log('【等待】程序等待中...');
		return new Promise((resolve, reject) => {
			let timer = setTimeout(() => {
				clearTimeout(timer);
				resolve();
			}, time || 200);
		});
	}

	async getCatalogMap (year) {
		let catalogs = Catalogs.find({ year: (new Date()).getFullYear() });
		let catalogMap = new Map();
		for (let catalog of catalogs) {
			catalogMap.set(catalog.id, catalog.name);
		}
		return catalogMap;
	}
}

const util = new Util();
module.exports = util;
