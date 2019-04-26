const constants = require('../config/constants');
const config = require('../config');
const DeptGroups = require('../models/DeptGroups');
const Budgets = require('../models/Budgets');
const util = require('../core/util');
const oracle = require('../core/db/oracle');

class InitService {
	constructor () {
		this.year = new Date().getFullYear();
	}
	async init () {
		await this.initDeptGroup();
		await this.initBudget();
	}

	async initBudget () {
		console.log('【开始】初始化预算');
		let year = new Date().getFullYear();
		try {
			for (let groupBudget of constants.groupBudgets) {
				let deptGroup = await DeptGroups.findOne({ corpId: config.corpId, year, code: groupBudget.code.trim() });
				if (!deptGroup) {
					await DeptGroups.create({
						corpId: config.corpId,
						year,
						code: groupBudget.code.trim(),
						name: groupBudget.name.trim()
					});
				}

				let budget = await Budgets.findOne({
					corpId: config.corpId,
					year: new Date().getFullYear(),
					'groupCode': groupBudget.code.trim()
				});
				if (!budget) {
					await Budgets.create({
						corpId: config.corpId,
						year: new Date().getFullYear(),
						groupCode: groupBudget.code.trim(),
						groupName: deptGroup.name,
						benefits: util.parseNumber(groupBudget.benefits),
						trip: util.parseNumber(groupBudget.trip),
						others: util.parseNumber(groupBudget.others)
					});
				}
			}
			console.log('【成功】初始化预算');
		} catch (error) {
			console.log('【失败】初始化预算', error);
		}
	}

	async initDeptGroup () {
		let sql = 'SELECT PERIODV, FCODE, FNAME, TYPE, AMOUNT FROM nc633.v_dd_budget_fse_amount';

		let data = await oracle.execute(sql);
		if (!data) {
			return Promise.resolve();
		}
		let fees = data.rows || [];
		let codeMap = new Map();
		for (let fee of fees) {
			if (!codeMap.has(fee[1])) {
				codeMap.set(fee[1], { code: fee[1], name: fee[2] });
			}
		}
		for (let [ code, value ] of codeMap) {
			console.log(`【开始】更新 ${code} ${value.name} dept表`);
			await DeptGroups.updateOne({
				corpId: config.corpId,
				year: this.year,
				code
			}, {
				corpId: config.corpId,
				year: this.year,
				code,
				name: value.name
			}, { upsert: true });
		}
	}
}

const initService = new InitService();

module.exports = initService.init();
