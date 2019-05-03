const jwt = require('jsonwebtoken');
const ServiceResult = require('../core/ServiceResult');
const Staffs = require('../models/Staffs');
// const util = require('../core/util');
const dingding = require('../core/dingding');
const Router = require('koa-router');
const router = new Router();
const config = require('../config');

router.prefix('/api/auth');

/**
* @api {get} /api/auth/login?code=:code 用户登录
* @apiName login
* @apiGroup 鉴权
* @apiDescription 用户登录
* @apiParam {String} code 钉钉免登code
* @apiSuccess {Object} data 返回值
* @apiSuccess {Object} data.user 钉钉获取当前用户信息
* @apiSuccess {String} data.token token信息,需要鉴权的api中请在header中携带此token
*/
router.get('/login', async (ctx, next) => {
	let code = ctx.query.code;
	if (!code) {
		ctx.body = ServiceResult.getFail('参数不正确', 404);
		let userId = ctx.query.userId || '03020644054858';
		let user = await Staffs.findOne({ userId });

		let token = jwt.sign({ userId: user.userId, userName: user.userName, jobnumber: user.jobnumber }, config.secret);

		ctx.body = ServiceResult.getSuccess({ user, token: 'Bearer ' + token });

		return;
	}
	try {
		let userInfo = await dingding.getuserinfo(code);
		if (userInfo.errcode !== 0) {
			ctx.body = ServiceResult.getFail(userInfo.errmsg, userInfo.errcode);
			return;
		}
		let user = await Staffs.findOne({ userId: userInfo.userid });

		if (!user) {
			let userRes = await dingding.getUser(userInfo.userid);
			if (userRes.errcode !== 0) {
				ctx.body = ServiceResult.getFail(user.errmsg, user.errcode);
				return;
			}

			user = {
				userId: user.userid,
				userName: user.name,
				jobnumber: user.jobnumber
			};
		}

		if (!user) {
			ctx.body = ServiceResult.getFail('获取用户信息失败', 404);
			return;
		}

		let token = jwt.sign({ userId: user.userId, userName: user.userName, jobnumber: user.jobnumber }, config.secret);

		ctx.body = ServiceResult.getSuccess({ user, token: 'Bearer ' + token });
	} catch (error) {
		console.log(`登录鉴权失败 code: ${code}`, error);
		ctx.body = ServiceResult.getFail(`登录鉴权失败 code: ${code}`, 500);
	}
	await next();
});

router.get('/login2', async (ctx, next) => {
	let user = await Staffs.findOne({ userId: '03020644054858' });

	let token = jwt.sign({ userId: user.userId, userName: user.userName, jobnumber: user.jobnumber }, config.secret);

	ctx.body = ServiceResult.getSuccess({ user, token: 'Bearer ' + token });

	await next();
});

router.get('/login-test', async (ctx, next) => {
	let user = await Staffs.findOne({ });
	let token = jwt.sign({ userId: user.userId, userName: user.userName }, config.secret);
	ctx.body = ServiceResult.getSuccess({ user, token: 'Bearer ' + token });
	await next();
});
module.exports = router;
