class Util {
	genCatalogId () {
		return `H${Math.random().toFixed(6).slice(-6)}`;
	}
}

const util = new Util();
module.exports = util;
