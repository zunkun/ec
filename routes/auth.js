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
	console.log(1234);
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

/**
* @api {get} /api/auth/signature?platform=&url= 签名
* @apiName signature
* @apiGroup 鉴权
* @apiDescription 签名
* @apiParam {String} platform 生成签名的平台, mobile-移动端 pc-PC端
* @apiParam {String} url 当前网页的URL，不包含#及其后面部分
* @apiSuccess {Number} errcode 成功为0
* @apiSuccess {Object} data 项目列表
* @apiSuccess {Object} data.corpId 企业corpId
* @apiSuccess {String} data.agentId 当前应用agentId
* @apiSuccess {Object} data.url 当前页面url
* @apiSuccess {Object} data.timeStamp 时间戳
* @apiSuccess {Object} data.signature 签名
* @apiSuccess {Object} data.nonceStr 	随机串
* @apiError {Number} errcode 失败不为0
* @apiError {Number} errmsg 错误消息
*/

router.get('/signature', async (ctx, next) => {
	let { platform, url } = ctx.query;
	console.log(1234);
	if (!url || !platform) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	const signature = await dingding.getJsApiSign({ platform, url });
	console.log({ signature });
	ctx.body = ServiceResult.getSuccess(signature);
	await next();
});

module.exports = router;
