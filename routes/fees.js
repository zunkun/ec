const Router = require('koa-router');
const router = new Router();

router.prefix('/api/fees');

/**
 * @api {get} /api/fees/balance api测试
 * @apiName fees-balance
 * @apiDescription 获取部门预算余额
 * @apiGroup 部门预算
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.get('/connect', async (ctx, next) => {
	ctx.body = {};
	await next();
});

module.exports = router;
