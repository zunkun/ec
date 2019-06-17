const config = require('../config');
const IncomingRecords = require('../models/IncomingRecords');
const rp = require('request-promise');
const util = require('../core/util');

class SyncIncomings {
	constructor () {
		this.year = new Date().getFullYear();
	}

	async syncArray (incomings, status = 1, timestamp = Date.now(), year) {
		console.log('【同步】收入预算到系统');
		this.year = year || new Date().getFullYear();
		let promiseArray = [];

		for (let i = 0, length = incomings.length; i < length; i += 50) {
			let incomingArray = incomings.slice(i, 50);

			let info = [];
			for (let incoming of incomingArray) {
				info.push({
					opNo: incoming.jobnumber,
					billCode: incoming.code,
					billName: incoming.typeName,
					twoLattice: incoming.axis,
					billRation: incoming.qq,
					plusMinus: incoming.pm,
					weights: incoming.weights,
					billUnit: incoming.unit,
					billCycle: incoming.period,
					ownYear: incoming.year,
					betSgin: incoming.incomings,
					twoLocation: incoming.line2,
					fourLoaction: incoming.line4,
					sixLocation: incoming.line6,
					eightLocation: incoming.line8,
					tenLocation: incoming.line10
				});
			}

			let promise = rp.post(config.incomingUri, {
				data: {
					flag: status ? 'insert' : 'delete',
					info
				}
			}).then(async (res) => {
				console.log({ res });
				for (let incoming of incomingArray) {
					await IncomingRecords.updateOne({
						corpId: incoming.corpId,
						year: incoming.year,
						jobnumber: incoming.jobnumber,
						code: incoming.code,
						period: incoming.period,
						timestamp
					}, {
						sync: true,
						syncTime: new Date()
					});
				}
				return Promise.resolve();
			}).catch(async (error) => {
				console.log({ error });
				for (let incoming of incomingArray) {
					await IncomingRecords.updateOne({
						corpId: incoming.corpId,
						year: incoming.year,
						jobnumber: incoming.jobnumber,
						code: incoming.code,
						period: incoming.period,
						timestamp
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

	async sync (incoming, status, timestamp, year) {
		return this.syncArray([ incoming ], status || incoming.status, timestamp, incoming.year || year);
	}
}

const syncIncomings = new SyncIncomings();

module.exports = syncIncomings;
