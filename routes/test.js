const Router = require('koa-router');
const router = new Router();

router.prefix('/api/test');

/**
 * @api {get} /api/test/connect api测试
 * @apiName apiTest
 * @apiDescription api连接测试，接口返回结果包括 errcode,errmsg,success,data四个字段，以后API只介绍data结果
 * @apiGroup API接口
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.post('/connect', async (ctx, next) => {
	let data = ctx.request.body;
	console.log({ data });
	ctx.body = 'success';
	await next();
});

module.exports = router;
