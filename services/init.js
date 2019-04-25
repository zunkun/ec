const constants = require('../config/constants');
const config = require('../config');
const DeptGroups = require('../models/DeptGroups');
const Budgets = require('../models/Budgets');
const util = require('../core/util');

class InitService {
	async init () {
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
					'groupCode': groupBudget.code
				});
				if (!budget) {
					await Budgets.create({
						corpId: config.corpId,
						year: new Date().getFullYear(),
						groupCode: groupBudget.code.trim(),
						groupName: groupBudget.name.trim(),
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
}

const initService = new InitService();

module.exports = initService.init();
