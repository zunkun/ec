const Budgets = require('../models/Budgets');
const ServiceResult = require('../core/ServiceResult');
const feesService = require('../services/feesService');
const DeptGroups = require('../models/DeptGroups');
const config = require('../config');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/budgets');

/**
 * @api {get} /api/budgets/?year=:year&code=:codes 获取年度预算
 * @apiName get-yearly-budget
 * @apiDescription 获取年度预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} [year] 年份,比如 2019
 * @apiParam {Number} code 预算体code
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Object} data.group 预算体
 * @apiSuccess {String} data.group.code 预算体code
 * @apiSuccess {String} data.group.name 预算体name
 * @apiSuccess {Number} data.budget 年度预算，单位：元
 * @apiSuccess {Number} data.expense 已用，单位：元
 */
router.get('/', async (ctx, next) => {
	let query = ctx.query;
	const date = new Date();
	if (!query.code) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	const conditions = {
		corpId: config.corpId,
		year: Number(query.year) || date.getFullYear(),
		code: query.code
	};

	let budget = await Budgets.findOne(conditions);
	if (!budget) {
		ctx.body = ServiceResult.getFail('没有找到当前部门预算', 404);
		return;
	}

	try {
		let tripExpense = await feesService.getTripFees(query.code);
		let benefitsExpense = await feesService.ncExpense(query.code, '福利费');
		let othersExpense = await feesService.ncExpense(query.code, '其他');

		ctx.body = ServiceResult.getSuccess({
			year: Number(query.year) || date.getFullYear(),
			code: query.code,
			name: budget.name,
			benefits: {
				budget: budget.benefits,
				expense: benefitsExpense,
				balance: budget.benefits - benefitsExpense
			},
			trip: {
				budget: budget.trip,
				expense: tripExpense,
				balance: budget.trip - tripExpense
			},
			others: {
				budget: budget.others,
				expense: othersExpense,
				balance: budget.others - othersExpense
			}
		});
	} catch (error) {
		ctx.body = ServiceResult.getFail(error);
	}
	await next();
});

router.get('/lists', async (ctx, next) => {
	let { year, page, limit } = ctx.query;
	year = Number(year) || new Date().getFullYear();
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let rows = await Budgets.find({ year, corpId: config.corpId }).skip(offset).limit(limit);
	let count = await Budgets.find({ year, corpId: config.corpId }).countDocuments();

	try {
		let budgets = [];
		for (let row of rows) {
			let tripExpense = await feesService.getTripFees(row.code);
			let benefitsExpense = await feesService.ncExpenseLocal(row.code, '福利费');
			let othersExpense = await feesService.ncExpenseLocal(row.code, '其他');

			let budget = {
				code: row.code,
				name: row.name,
				benefits: {
					budget: row.benefits,
					expense: benefitsExpense,
					balance: row.benefits - benefitsExpense
				},
				trip: {
					budget: row.trip,
					expense: tripExpense,
					balance: row.trip - tripExpense
				},
				others: {
					budget: row.others,
					expense: othersExpense,
					balance: row.others - othersExpense
				}
			};

			budgets.push(budget);
		}

		ctx.body = ServiceResult.getSuccess({
			count,
			budgets
		});
	} catch (error) {
		ctx.body = ServiceResult.getFail(error);
	}
	await next();
});

/**
 * @api {post} /api/budgets/ 保存年度预算
 * @apiName create-yearly-budget
 * @apiDescription 保存年度预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {String} code 预算体code
 * @apiParam {String} name 预算体名称
 * @apiParam {Number} benefits 福利费 单位（元）
 * @apiParam {Number} trip 差旅费 单位（元）
 * @apiParam {Number} others 其他 单位（元）
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.post('/', async (ctx, next) => {
	let { year, code, name, benefits, trip, others } = ctx.request.body;
	year = Number(year) || new Date().getFullYear();
	benefits = Number(benefits) || 0;
	trip = Number(trip) || 0;
	others = Number(others) || 0;

	if (!code) {
		ctx.body = ServiceResult.getFail('参数错误', 404);
		return;
	}

	let budget = await Budgets.findOne({ code, year });
	if (!budget) {
		if (!name) {
			ctx.body = ServiceResult.getFail('参数错误', 404);
			return;
		}

		let deptGroup = DeptGroups.findOne({ code });
		if (!deptGroup) {
			deptGroup = await DeptGroups.create({
				corpId: config.corpId,
				year,
				code,
				name
			});
		}

		await Budgets.create({
			corpId: config.corpId,
			year,
			code,
			name,
			benefits,
			trip,
			others
		});
		ctx.body = ServiceResult.getSuccess({ year, code, benefits, trip, others });
	}

	await Budgets.updateOne({ year, code }, { benefits, trip, others });
	ctx.body = ServiceResult.getSuccess({ year, code, benefits, trip, others });
	await next();
});

/**
 * @api {delete} /api/budgets/ 删除部门年度预算
 * @apiName delete-yearly-budget
 * @apiDescription 删除部门年度预算,危险 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {String} code 预算体code
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.delete('/', async (ctx, next) => {
	let { year, code } = ctx.request.body;
	year = Number(year);
	try {
		console.log(`【开始】删除 ${code} ${year}年年度预算`);
		await Budgets.deleteOne({ year, code });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(`【失败】删除 ${code} ${year}年年度预算`, error);
		ctx.body = ServiceResult.getFail('删除年度预算失败', 500);
	}
	await next();
});

module.exports = router;
