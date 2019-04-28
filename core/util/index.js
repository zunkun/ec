const Catalogs = require('../../models/Catalogs');
const Staffs = require('../../models/Staffs');

class Util {
	genCode () {
		return `${Math.random().toFixed(6).slice(-6)}`;
	}

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

	validateApproval (approval) {
		const { userId, deptId, approvalId, travelers, trip, itineraries, approvalUser } = approval;
		let flag = true; // 参数是否正确
		if (!userId || !deptId || !approvalId) {
			flag = false;
		}
		if (!trip || !trip.title || !trip.cause) {
			flag = false;
		}
		if (!approvalUser || !approvalUser.userId || !approvalUser.userName) {
			flag = false;
		}
		if (travelers) {
			if (!(travelers instanceof Array)) {
				flag = false;
			} else {
				for (let traveler of travelers) {
					if (!traveler.userId || !traveler.userName) {
						flag = false;
					}
				}
			}
		}

		if (!itineraries || !itineraries.length || !(itineraries instanceof Array)) {
			flag = false;
		} else {
			for (let it of itineraries) {
				if (!([ 0, 1 ].indexOf(Number(it.tripWay)) > -1) || !([ 0, 1, 2, 3 ].indexOf(Number(it.trafficType)) > -1) || !it.depCity || !it.arrCity || !it.depDate || !it.arrDate) {
					flag = false;
				}
			}
		}
		return flag;
	}

	async getUserName (userId) {
		let staff = await Staffs.findOne({ userId });
		return staff.userName || '';
	}

	parseNumber (str) {
		return Number(str.trim().replace(/\,|-/g, ''));
	}
}

const util = new Util();
module.exports = util;
