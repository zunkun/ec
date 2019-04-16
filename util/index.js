const Catalogs = require('../models/Catalogs');

class Util {
	genCatalogId () {
		return `H${Math.random().toFixed(6).slice(-6)}`;
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
