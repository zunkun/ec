const ServiceResult = require('../core/ServiceResult');
const Approvals = require('../models/Approvals');
const Staffs = require('../models/Staffs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const util = require('../core/util');
const approvalService = require('../services/approval');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/approvals');

/**
 * @api {post} /api/approvals/ 生成审批单记录
 * @apiName create-approvals
 * @apiDescription 生成审批单记录，并写入商旅 【需要登录】
 * @apiGroup 审批单
 * @apiParam {String} userId	审批单发起人userId
 * @apiParam {String} userName	审批单发起人userName
 * @apiParam {Number} deptId	审批单发起人deptId,不直接从user中取得原因是某些人员有多个部门
 * @apiParam {Object} approvalUser 审批人
 * @apiParam {String} approvalUser.userId 审批人userId
 * @apiParam {String} approvalUser.userName 审批人userName
 * @apiParam {String} approvalId	审批单发起标识
 * @apiParam {Object} trip 出差信息
 * @apiParam {String} trip.title 申请单标题,比如 	北京出差
 * @apiParam {String} trip.cause 出差事由，比如 北京出差
 * @apiParam {Object[]} itineraries 行程列表
 * @apiParam {Number} itineraries.tripWay 行程类型：0单程，1往返
 * @apiParam {Number} itineraries.trafficType 交通方式：0飞机, 1,火车, 2汽车, 3其他
 * @apiParam {String} itineraries.depCity 	出发城市
 * @apiParam {Number} itineraries.arrCity 	到达城市
 * @apiParam {Date} itineraries.depDate 出发日期
 * @apiParam {Date} itineraries.arrDate 到达日期
 * @apiParam {Object[]} [travelers] 出行人列表,如果不填写，默认为userId 代表的用户出行
 * @apiParam {String} travelers.userId 出行人userId
 * @apiParam {String} travelers.userName 出行人姓名
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {String} data.approvalId 审批单标识
 * @apiSuccess {String} data.userId 发起审批的用户userId
 */
router.post('/', async (ctx, next) => {
	let user = jwt.decode(ctx.header.authorization.substr(7));
	let staff = await Staffs.findOne({ userId: user.userId });
	if (!user || !staff) {
		ctx.body = ServiceResult.getFail('当前用户不存在', 400);
		return;
	}

	let flag = util.validateApproval(ctx.request.body);
	if (!flag) {
		console.log('审批单参数不正确');
		ctx.body = ServiceResult.getFail('审批单参数不正确', 400);
		return;
	}

	try {
		await approvalService.createApproval(staff, ctx.request.body);
		ctx.body = ServiceResult.getSuccess({ });
	} catch (error) {
		ctx.body = ServiceResult.getFail('生成审批单失败', 500);
	}

	await next();
});

/**
 * @api {delete} /api/approvals/:approvalId 删除审批单记录
 * @apiName delete-approvals
 * @apiDescription 删除商旅审批单【需要登录】
 * @apiGroup 审批单
 * @apiParam {String} approvalId 审批单标识
 * @apiParam {Object} approvalUser 审批人
 * @apiParam {String} approvalUser.userId 审批人userId
 * @apiParam {String} approvalUser.userName 审批人userName
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */
router.delete('/:id', async (ctx, next) => {
	const approvalId = ctx.params.id;
	const { approvalUser } = ctx.request.body;
	if (!approvalUser.userId) {
		ctx.body = ServiceResult.getFail(`参数不正确，删除审批单${approvalId}失败`, 404);
		return;
	}

	let approval = await Approvals.findOne({
		approvalId,
		status: 1 // 只删除写入商旅且没有取消的审批单
	});
	if (!approval) {
		ctx.body = ServiceResult.getFail(`不存在审批单号 ${approvalId}`, 404);
		return;
	}
	try {
		console.log(`【开始】删除审批单 ${approvalId}`);
		approval = await approvalService.deleteApproval({ corpId: approval.corpId, approvalId, approvalUser });
		console.log(`【成功】删除审批单 ${approvalId}`);
		ctx.body = ServiceResult.getSuccess({ approvalId, approvalUser });
	} catch (error) {
		console.error(`【失败】删除审批单 ${approvalId}`, error);
		ctx.body = ServiceResult.getFail(`删除审批单${approvalId}失败`, 500);
	}
});

router.get('/basic', async (ctx, next) => {
	let { limit, page } = ctx.query;
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let user = jwt.decode(ctx.header.authorization.substr(7));

	let approvals = await Approvals.find({ userId: user.userId }).sort({ 'createTime': -1 }).skip(offset).limit(limit);
	let count = await Approvals.find({ userId: user.userId }).count();

	let data = [];
	for (let approval of approvals) {
		data.push({
			approvalId: approval.approvalId,
			createTime: approval.createTime,
			status: approval.status,
			trip: approval.trip,
			approvalUser: approval.approvalUser
		});
	}
	ctx.body = ServiceResult.getSuccess({
		count,
		approvals: data
	});

	await next();
});

module.exports = router;
