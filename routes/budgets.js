const AvenueBudget = require('../models/AvenueBudget');
const MonthlyBudget = require('../models/MonthlyBudget');
const ServiceResult = require('../util/ServiceResult');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/budgets');

/**
 * @api {get} /ec/api/budgets/ 获取年度预算
 * @apiName get-yearly-budget
 * @apiDescription 获取年度预算 【需要登录】
 * @apiGroup 预算接口
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} [deptId] 需要查询的部门deptId,该deptId为钉钉部门deptId
 * @apiSampleRequest /ec/api/budgets/?year=2019&deptId=20182232
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Number} data.deptId 部门deptId
 * @apiSuccess {String} data.deptName 部门名称
 * @apiSuccess {Number} data.budget 年度预算，单位：分
 * @apiSuccess {Array{Object}} data.months 月度预算列表
 * @apiSuccess {Number} data.months.year 年
 * @apiSuccess {Number} data.months.month 月份
 * @apiSuccess {Number} data.months.budget 月度预算，单位：分
 * @apiSuccess {Number} data.months.expense 月份消费，单位：分
 * @apiSuccess {Number} data.months.balance 月份余额，单位：分
 * @apiSuccess {Array{Object}} data.months.catalogs 月度具体类别预算详细
 * @apiSuccess {String} data.months.catalogs.id 月度具体类别Id
 * @apiSuccess {String} data.months.catalogs.name 月度具体类别名称
 * @apiSuccess {Number} data.months.catalogs.budget 月度具体类别预算，单位：分
 * @apiSuccess {Number} data.months.catalogs.expense 月度具体类别预算消费，单位：分
 * @apiSuccess {Number} data.months.catalogs.balance 月度具体类别预算余额，单位：分
 */
router.get('/', async (ctx, next) => {
	let query = ctx.query;
	const date = new Date();
	const conditions = {	year: Number(query.year) || date.getFullYear()	};
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
 * @api {post} /ec/api/budgets/ 生成年度预算
 * @apiName create-yearly-budget
 * @apiDescription 生成年度预算 【需要登录】
 * @apiGroup 预算接口
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} deptId 钉钉部门deptId
 * @apiParam {Number} budget 部门总预算,单位 分
 * @apiParam {Array{Object}} months 部门月度预算列表
 * @apiParam {Number} months.month 月份
 * @apiParam {Number} months.budget 月度预算
 * @apiParam {Number} months.expense 月份消费
 * @apiParam {Number} months.balance 月份余额
 * @apiParam {Array{Object}} months.catalogs 月度具体类别预算详细
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

});

module.exports = router;
