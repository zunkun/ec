const Router = require('koa-router');
const router = new Router();
const feeService = require('../services/feesService');
const ServiceResult = require('../core/ServiceResult');

router.prefix('/api/fees');

/**
 * @api {get} /api/fees/balance?year=:year&deptId=:deptId 费用余额
 * @apiName fees-balance
 * @apiDescription 员工申请的费用是否充足
 * @apiGroup 部门预算
 * @apiParam {Number} [year] 年 默认当年
 * @apiParam {String} deptId 员工钉钉部门deptId
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Boolean} data.approval 是否有差旅费用，true表示有
 */
router.get('/balance', async (ctx, next) => {
	let { deptId } = ctx.query;
	deptId = Number(deptId);
	if (!deptId) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	ctx.body = ServiceResult.getSuccess({
		deptId,
		approval: true
	});
	// try {
	// 	let balance = await feeService.tripBalanceByDeptId(deptId);
	// 	ctx.body = ServiceResult.getSuccess({
	// 		deptId,
	// 		approval: balance > 0
	// 	});
	// } catch (error) {
	// 	ctx.body = ServiceResult.getFail(error);
	// }

	await next();
});

module.exports = router;
