const Router = require('koa-router');
const router = new Router();

router.prefix('/api/fees');

/**
 * @api {get} /api/fees/balance?year=:year&jobnumber=:jobnumber&deptId=:deptId&expense=:expense 费用余额
 * @apiName fees-balance
 * @apiDescription 员工申请的费用是否充足
 * @apiGroup 部门预算
 * @apiParam {Number} year 年 默认当年
 * @apiParam {String} jobnumber 员工工号
 * @apiParam {Number} deptId 员工所在部门deptId,如果不传入，则取钉钉中员工所在的一个部门的deptId
 * @apiParam {Number} expense 员工申请费用，单位（元）
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 请求的年
 * @apiSuccess {String} data.jobnumber 工号
 * @apiSuccess {Number} data.deptId 部门deptId
 * @apiSuccess {Number} data.expense 请求费用，单位（元）
 * @apiSuccess {Boolean} data.approval 是否请求费用通过，true表示请求费用足额，false表示费用不足
 */
router.get('/balance', async (ctx, next) => {
	ctx.body = {};
	await next();
});

module.exports = router;
