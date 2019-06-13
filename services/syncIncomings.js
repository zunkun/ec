const config = require('../config');
const IncomingRecords = require('../models/IncomingRecords');
const rp = require('request-promise');
const util = require('../core/util');

class SyncIncomings {
	constructor () {
		this.year = new Date().getFullYear();
	}

	async syncArray (incomings, status = 1, year) {
		console.log('【同步】收入预算到系统');
		this.year = year || new Date().getFullYear();
		let promiseArray = [];

		for (let i = 0, length = incomings.length; i < length; i += 50) {
			let incomingArray = incomings.slice(i, 50);

			// TODO: 处理data
			let data = [];

			let promise = rp.post(config.incomingUri, {
				data: {
					status,
					data
				}
			}).then(async () => {
				for (let incoming of incomingArray) {
					await IncomingRecords.update({
						corpId: incoming.corpId,
						year: incoming.year,
						jobnumber: incoming.jobnumber,
						code: incoming.code,
						period: incoming.period
					}, {
						sync: true,
						syncTime: new Date()
					});
				}
				return Promise.resolve();
			}).catch(async () => {
				for (let incoming of incomingArray) {
					await IncomingRecords.update({
						corpId: incoming.corpId,
						year: incoming.year,
						jobnumber: incoming.jobnumber,
						code: incoming.code,
						period: incoming.period
					}, {
						sync: false,
						syncTime: new Date()
					});
				}
				return Promise.resolve();
			});
			await util.wait(100);
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray).then(() => {
			console.log('【完成】同步预算完成');
		});
	}

	async sync (incoming, status, year) {
		return this.syncArray([ incoming ], status || incoming.status, incoming.year || year);
	}
}

const syncIncomings = new SyncIncomings();

module.exports = syncIncomings;
