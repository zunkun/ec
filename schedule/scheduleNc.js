const config = require('../config');
const cron = require('node-cron');
const NcFee = require('../models/NcFee');

const oracle = require('../core/db/oracle');

let feeTypeMap = {
	'交通差旅费': 'trip',
	'其他': 'others',
	'福利费': 'benefits'
};

class ScheduleNc {
	constructor () {
		this.year = new Date().getFullYear();
	}

	async start () {
		await this.syncService();
		const task = cron.schedule(config.ncCron, async () => {
			this.year = new Date().getFullYear();
			await this.syncService();
		});
		task.start();
	}

	async syncService () {
		let sql = 'SELECT PERIODV, FCODE, FNAME, TYPE, AMOUNT FROM nc633.v_dd_budget_fse_amount';
		let startTime = Date.now();

		try {
			let data = await oracle.execute(sql);
			let ncFees = {};
			for (let row of data.rows) {
				console.log(`【保存】 ${row[2]} ${row[3]} 费用`);
				if (!ncFees[row[1]]) {
					ncFees[row[1]] = {
						corpId: config.corpId,
						corpName: config.corpName,
						year: this.year,
						group: {
							code: row[1],
							name: row[2]
						},
						trip: 0,
						benefits: 0,
						others: 0
					};
				}

				ncFees[row[1]][feeTypeMap[row[3]]] += row[4];
			}

			for (let code of Object.keys(ncFees)) {
				let ncFee = ncFees[code];

				await NcFee.updateOne({
					corpId: config.corpId,
					year: this.year,
					'group.code': code
				},
				ncFee, { upsert: true });
			}
		} catch (error) {
			console.error('【错误】保存NC费用', error);
		}
		console.log(`用时: ${(Date.now() - startTime) / 1000}s`);
		return Promise.resolve();
	}
}

const scheduleNc = new ScheduleNc();
module.exports = scheduleNc.start();
