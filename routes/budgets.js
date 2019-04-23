const AvenueBudget = require('../models/AvenueBudget');
const MonthlyBudget = require('../models/MonthlyBudget');
const Depts = require('../models/Depts');
const ServiceResult = require('../core/ServiceResult');
const util = require('../core/util');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/budgets');

/**
 * @api {get} /api/budgets/?year=:year&deptId=:deptId 获取年度预算
 * @apiName get-yearly-budget
 * @apiDescription 获取年度预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} [deptId] 需要查询的部门deptId,该deptId为钉钉部门deptId
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Number} data.deptId 部门deptId
 * @apiSuccess {String} data.deptName 部门名称
 * @apiSuccess {Number} data.budget 年度预算，单位：分
 * @apiSuccess {Object[]} data.months 月度预算列表
 * @apiSuccess {Number} data.months.year 年
 * @apiSuccess {Number} data.months.month 月份
 * @apiSuccess {Number} data.months.budget 月度预算，单位：分
 * @apiSuccess {Number} data.months.expense 月份消费，单位：分
 * @apiSuccess {Number} data.months.balance 月份余额，单位：分
 * @apiSuccess {Object[]} data.months.catalogs 月度具体类别预算详细
 * @apiSuccess {String} data.months.catalogs.id 月度具体类别Id
 * @apiSuccess {String} data.months.catalogs.name 月度具体类别名称
 * @apiSuccess {Number} data.months.catalogs.budget 月度具体类别预算，单位：分
 * @apiSuccess {Number} data.months.catalogs.expense 月度具体类别预算消费，单位：分
 * @apiSuccess {Number} data.months.catalogs.balance 月度具体类别预算余额，单位：分
 */
router.get('/', async (ctx, next) => {
	let query = ctx.query;
	const date = new Date();
	const conditions = {
		year: Number(query.year) || date.getFullYear()
	};
	if (query.deptId) {
		conditions.deptId = Number(query.deptId);
	}

	let avenueBudget = await AvenueBudget.findOne(conditions);
	let monthlyBudgets = await MonthlyBudget.find(conditions);

	if (!avenueBudget) {
		ctx.body = ServiceResult.getSuccess({});
		return;
	}

	// 组织返回数据
	const data = {
		year: query.year,
		deptId: query.deptId,
		deptName: avenueBudget.deptName,
		budget: avenueBudget.budget,
		months: []
	};
	for (let monthly of monthlyBudgets) {
		const budget = {
			year: monthly.year,
			month: monthly.month,
			budget: monthly.budget || 0,
			expense: monthly.expense || 0,
			balance: monthly.balance || 0,
			catalogs: []
		};
		const catalogs = monthly.catalogs || [];
		for (let catalog of catalogs) {
			budget.catalogs.push({
				name: catalog.name || '',
				budget: catalog.budget || 0,
				expense: catalog.expense || 0,
				balance: catalog.balance | 0
			});
		}

		data.months.push(budget);
	}

	ctx.body = ServiceResult.getSuccess(data);
	await next();
});

/**
 * @api {post} /api/budgets/ 保存年度预算
 * @apiName create-yearly-budget
 * @apiDescription 保存年度预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} deptId 钉钉部门deptId
 * @apiParam {Number} budget 部门总预算,单位 分
 * @apiParam {Object[]} months 部门月度预算列表
 * @apiParam {Number} months.month 月份
 * @apiParam {Number} months.budget 月度预算
 * @apiParam {Number} months.expense 月份消费
 * @apiParam {Number} months.balance 月份余额
 * @apiParam {Object[]} months.catalogs 月度具体类别预算详细
 * @apiParam {String} months.catalogs.id 月度具体类别Id
 * @apiParam {String} months.catalogs.name 月度具体类别名称
 * @apiParam {Number} months.catalogs.budget 月度具体类别预算
 * @apiParam {Number} months.catalogs.expense 月度具体类别预算消费
 * @apiParam {Number} months.catalogs.balance 月度具体类别预算余额
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.post('/', async (ctx, next) => {
	let { year, deptId, months, budget } = ctx.request.body;
	year = Number(year);
	deptId = Number(deptId);
	const catalogMap = await util.getCatalogMap();

	if (!year || !deptId) {
		ctx.body = ServiceResult.getFail('参数不正确,请参考预算预算参数表', 404);
		return;
	}

	let dept = await Depts.findOne({ deptId }) || {};

	if (!budget || !months || !(months instanceof Array)) {
		ctx.body = ServiceResult.getFail('参数不正确,请参考预算预算参数表', 404);
		return;
	}

	let monthlyBudgets = [];
	let flag = true;
	for (let month of months) {
		// 验证month参数
		if (!month.month || month.month < 1 || month.month > 12) {
			flag = false;
		}
		if ((month.budget !== 0 && !month.budget)) {
			flag = false;
		}
		let _catalogs = month.catalogs || [];
		let catalogs = [];
		for (let catalog of _catalogs) {
			catalogs.push({
				id: catalog.id,
				name: catalog.name || catalogMap.get(catalog.id),
				budget: catalog.budget || 0,
				expense: catalog.expense || 0,
				balance: catalog.balance || 0
			});
		}
		let _budget = {
			deptId,
			deptName: dept.deptName || '',
			year,
			month: month.month,
			budget: month.budget || 0,
			expense: month.expense || 0,
			balance: month.balance || 0,
			catalogs
		};

		monthlyBudgets.push(_budget);
	}
	if (!flag) {
		ctx.body = ServiceResult.getFail('参数不正确,请参考预算预算参数表', 404);
		return;
	}

	try {
		console.log(`【开始】更新 $.deptId} ${dept.deptName}年度预算`);
		await AvenueBudget.updateOne({
			deptId,
			year
		}, {
			deptId,
			year,
			deptName: dept.deptName || '',
			budget
		});

		console.log(`【开始】更新 ${deptId} ${dept.deptName}月份预算`);

		for (let budget of monthlyBudgets) {
			await MonthlyBudget.updateOne({
				deptId,
				year,
				month: budget.month
			}, budget, { upsert: true });
		}
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(`【失败】更新 ${deptId} ${dept.deptName}月份预算`, error);
		ctx.body = ServiceResult.getFail(`更新 ${deptId} ${dept.deptName}预算失败`, 500);
	}
	await next();
});

/**
 * @api {delete} /api/budgets/ 删除部门年度预算
 * @apiName delete-yearly-budget
 * @apiDescription 删除部门年度预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} deptId 钉钉部门deptId
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.delete('/', async (ctx, next) => {
	let { year, deptId } = ctx.request.body;
	year = Number(year);
	deptId = Number(deptId);
	try {
		console.log(`【开始】删除 ${deptId} ${year}年年度预算`);
		await AvenueBudget.deleteMany({ year, deptId });
		await MonthlyBudget.deleteMany({ year, deptId });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(`【失败】删除 ${deptId} ${year}年年度预算`, error);
		ctx.body = ServiceResult.getFail('删除年度预算失败', 500);
	}
	await next();
});

/**
 * @api {get} /api/budgets/balance?deptId=:deptId&year=:year&month=:month&type=:type 查询部门费用预算
 * @apiName delete-yearly-budget
 * @apiDescription 查询部门月度费用预算 【需要登录】
 * @apiGroup 预算管理
 * @apiParam {Number} [year] 年份,默认为当年,比如 2019
 * @apiParam {Number} [month] 月份，默认当月，比如1
 * @apiParam {Number} deptId 钉钉部门deptId
 * @apiParam {Number} [type] 查询费用类型，默认为1 , 1-差旅费 2-礼品费 3-其他费用
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Number} data.month 月份
 * @apiSuccess {Number} data.type 类型
 * @apiSuccess {Number} data.type 类型
 * @apiSuccess {Number} data.deptId 部门deptId
 * @apiSuccess {String} data.deptName 部门名称
 * @apiSuccess {Number} data.budget 月度预算
 * @apiSuccess {Number} data.expense 月度花费
 * @apiSuccess {Number} data.balance 月度余额
 *
 */
router.get('/balance', async (ctx, next) => {
	// const { year, type, deptId } = ctx.request.body;
});

module.exports = router;
