const Catalogs = require('../../models/Catalogs');
const Staffs = require('../../models/Staffs');
const Depts = require('../../models/Depts');
const config = require('../../config');

class Util {
	randomWord (randomFlag, min, max) {
		var str = '';
		var range = min;
		var arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			let pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	}

	isSameDay (timeStampA, timeStampB) {
		// 判断两个日期是否是同一天
		let dateA = new Date(timeStampA);
		let dateB = new Date(timeStampB);
		return (dateA.setHours(0, 0, 0, 0) === dateB.setHours(0, 0, 0, 0));
	}
	parseDate2Str (timestamp) {
		let date = new Date(timestamp);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		let monthStr = month <= 9 ? `0${month}` : month;
		let dayStr = day <= 9 ? `0${day}` : day;

		return `${year}-${monthStr}-${dayStr}`;
	}

	toFixedNum (num) {
		let isInteger = Number(num || null) % 1 === 0;
		return isInteger ? Number(num) : Number(Number(num).toFixed(2));
	}

	timeFmt (num) {
		return num >= 10 ? num : `0${num}`;
	}

	timeCode () {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let millSeconds = date.getMilliseconds();
		return `${year}${this.timeFmt(month)}${this.timeFmt(day)}${this.timeFmt(hours)}${this.timeFmt(minutes)}${this.timeFmt(seconds)}${this.timeFmt(millSeconds)}${this.timeFmt(month)}${parseInt(Math.random() * 10000, 10)}`;
	}

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
		const { deptId, trip, itineraries } = approval;
		let flag = true; // 参数是否正确
		if (!deptId || !trip || !trip.day || !trip.cause) {
			flag = false;
		}

		if (!itineraries || !itineraries.length || !(itineraries instanceof Array)) {
			flag = false;
		} else {
			for (let it of itineraries) {
				if (!it.depCity || !it.arrCity || !it.depDate || !it.arrDate) {
					flag = false;
				}
				if (!flag) {
					break;
				}
			}
		}
		if (!approval.balance || approval.balance <= 0 || !approval.costcenter || !approval.costcenter.id || !approval.invoice || !approval.invoice.id) {
			flag = false;
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

	async getDeptsTree (parentId = 1, trees = []) {
		let year = new Date().getFullYear();
		let depts = await Depts.find({ corpId: config.corpId, year, parentId });

		for (let dept of depts) {
			let tree = {
				deptId: dept.deptId,
				deptName: dept.deptName,
				parentId: dept.parentId,
				parentName: dept.parentName,
				group: dept.group || {},
				children: []
			};

			let sonCount = await Depts.find({ corpId: config.corpId, year, parentId: dept.deptId }).countDocuments();
			if (sonCount) {
				tree.children = await this.getDeptsTree(dept.deptId, []);
			}

			trees.push(tree);
		}
		return trees;
	}

	validaeExchange (exchanges) {
		let valid = true;
		console.log(exchanges);
		if (!exchanges.length) valid = false;
		for (let exchange of exchanges) {
			let from = exchange.from;
			let to = exchange.to;
			console.log(from, to);
			if (!from.code || !from.amount || !from.catalog) {
				valid = false;
			}
			if (!to.code || !to.catalog) {
				valid = false;
			}
			if (from.code === to.code && from.catalog === to.catalog) {
				valid = false;
			}
			if (!valid) {
				break;
			}
		}
		return valid;
	}
}

const util = new Util();
module.exports = util;
