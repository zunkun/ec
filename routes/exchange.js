const Router = require('koa-router');
const router = new Router();
const Budgets = require('../models/Budgets');
const BudgetRecord = require('../models/BudgetRecord');
const ServiceResult = require('../core/ServiceResult');
const budgetChange = require('../services/budgetChange');

const config = require('../config');
const util = require('../core/util');

router.prefix('/api/exchange');

router.get('/', async (ctx, next) => {
	let { year, page, limit, code, keywords } = ctx.query;
	year = Number(year) || new Date().getFullYear();
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let options = {
		year,
		corpId: config.corpId
	};
	if (code) {
		options.code = code;
	}
	if (keywords && keywords !== 'undefined') {
		let regex = new RegExp(keywords, 'i');
		options.$or = [
			{ 'from.name': { $regex: regex } },
			{ 'to.name': { $regex: regex } }
		];
	}
	let rows = await BudgetRecord.find(options).sort({ 'createTime': -1 }).skip(offset).limit(limit);
	let count = await BudgetRecord.find(options).countDocuments();

	ctx.body = ServiceResult.getSuccess({
		rows,
		count
	});
});

router.post('/', async (ctx, next) => {
	const exchanges = ctx.request.body.exchanges;
	const year = Number(ctx.request.body.year) || new Date().getFullYear();
	let valid = util.validaeExchange(exchanges);
	if (!valid) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}

	for (let exchange of exchanges) {
		let budget = await Budgets.findOne({ corpId: config.corpId, year, code: exchange.from.code });
		if (!budget || budget[exchange.catalog] < exchange.amount) {
			valid = false;
			break;
		}
	}
	if (!valid) {
		ctx.body = ServiceResult.getFail('调出部门预算不足或不存在');
	}

	let changeDatas = [];
	for (let exchange of exchanges) {
		let changeData = {
			from: {
				code: exchange.from.code,
				name: exchange.from.name,
				catalog: exchange.from.catalog,
				amount: exchange.from.amount
			},
			to: {
				code: exchange.to.code,
				name: exchange.to.name,
				catalog: exchange.to.catalog,
				amount: exchange.from.amount
			},
			amount: exchange.from.amount
		};

		changeDatas.push(changeData);
	}

	try {
		await budgetChange.changeBudgets(changeDatas, year);
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		ctx.body = ServiceResult.getFail(error);
	}
});

module.exports = router;
