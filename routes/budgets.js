import AvenueBudget from '../models/AvenueBudget';
import MonthlyBudget from '../models/MonthlyBudget';
import ServiceResult from '../util/ServiceResult';

const Router = require('koa-router');
const router = new Router();

router.prefix('/ec/api/budgets');

/**
 * @api {get} /ec/api/budgets/ 获取年度预算
 * @apiName yearly-budget
 * @apiDescription 获取年度预算
 * @apiGroup 预算接口
 * @apiParam {Number} year 年份,比如 2019
 * @apiParam {Number} [deptId] 需要查询的部门deptId,该deptId为钉钉部门deptId
 * @apiSampleRequest /ec/api/budgets/?year=2019&deptId=20182232
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.get('/', async (ctx, next) => {
	let query = ctx.query;
	const date = new Date();
	const conditions = {	year: Number(query.year) || date.getFullYear()	};
	if (query.deptId) {
		conditions.deptId = Number(query.deptId);
	}

	let avenueBudget = await AvenueBudget.findOne(conditions);

	if (!avenueBudget) {
		ctx.body = {};
		return;
	}

	if (query.year) { ctx.body = {}; }
	await next();
});

module.exports = router;
