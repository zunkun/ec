const ServiceResult = require('../core/ServiceResult');
const Depts = require('../models/Depts');
const DeptGroups = require('../models/DeptGroups');
const config = require('../config');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/depts');

/**
 * @api {get} /api/depts/?year=:year 获取部门列表
 * @apiName get-dept-lists
 * @apiDescription 获取部门列表 【需要登录】
 * @apiGroup 部门接口
 * @apiParam {Number} year 年份 默认当年
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Object[]} data.depts 部门列表
 * @apiSuccess {Number}  data.depts.deptId 部门deptId
 * @apiSuccess {String}  data.depts.deptName 部门名称
 * @apiSuccess {Number}  data.depts.parentId 父部门deptId
 * @apiSuccess {String}  data.depts.parentName 父部门deptName
 */
router.get('/', async (ctx, next) => {
	let year = Number(ctx.query.year) || (new Date()).getFullYear();
	let depts = await Depts.find({ year, corpId: config.corpId });
	let data = { year, depts: [] };
	for (let dept of depts) {
		data.depts.push({
			deptId: dept.deptId,
			deptName: dept.deptName,
			parentId: dept.parentId,
			parentName: dept.parentName,
			group: dept.group
		});
	}

	ctx.body = ServiceResult.getSuccess(data);
	await next();
});

/**
 * @api {get} /api/depts/group 获取预算体列表
 * @apiName get-dept-group
 * @apiDescription 获取预算体列表 【需要登录】
 * @apiGroup 部门接口
 * @apiParam {Number} year 年份 默认当年
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object[]} data 正确返回时的数据
 * @apiSuccess {Number} data.code 预算体编码
 * @apiSuccess {Number} data.name 预算体名称
 * @apiSuccess {Object[]} data.depts 使用该预算体的部门
 * @apiSuccess {Number} data.depts.deptId 部门deptId
 * @apiSuccess {String} data.depts.deptName 部门名称
 */
router.get('/group', async (ctx, next) => {
	let year = Number(ctx.query.year) || new Date().getFullYear();
	let deptGroups = await DeptGroups.find({ year, corpId: config.corpId });

	let groups = [];
	for (let deptGroup of deptGroups) {
		let group = {
			code: deptGroup.code,
			name: deptGroup.name,
			depts: []
		};
		let depts = await Depts.find({ 'group.code': deptGroup.code, year }) || [];
		for (let dept of depts) {
			group.depts.push({
				deptId: dept.deptId,
				deptName: dept.deptName
			});
		}
		groups.push(group);
	}
	ctx.body = ServiceResult.getSuccess(groups);
	await next();
});

/**
 * @api {post} /api/depts/groupmap 生成部门和预算体对应关系
 * @apiName set-dept-group
 * @apiDescription 生成部门和预算体对应关系 【需要登录】
 * @apiGroup 部门接口
 * @apiParam {Number} year 年份 默认当年
 * @apiParam {Number} deptId 部门deptId
 * @apiParam {String} code 预算体编号
 * @apiParam {Boolean} notChild 是否不应用到子部门，默认false, true 时不会设置子部门对应父部门的预算体
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Number} data.deptId 部门deptId
 * @apiSuccess {String} data.code 预算体code
 */
router.post('/groupmap', async (ctx, next) => {
	let { deptId, code, year, notChild } = ctx.request.body;
	year = Number(year) || new Date().getFullYear();
	deptId = Number(deptId);
	if (!deptId || !code) {
		ctx.body = ServiceResult.getFail('参数不正确', 404);
		return;
	}

	let deptGroup = await DeptGroups.findOne({ code, year, corpId: config.corpId });
	if (!deptGroup) {
		ctx.body = ServiceResult.getFail('系统没有找到预算体', 404);
		return;
	}

	let dept = await Depts.findOne({ deptId });
	if (!dept) {
		ctx.body = ServiceResult.getFail('系统没有找到部门信息', 404);
		return;
	}
	let conditions = { deptId, year };
	if (!notChild) {
		conditions.deptPath = deptId;
	}
	console.log(conditions, { group: { code, name: deptGroup.name } });
	await Depts.updateOne(conditions, { group: { code, name: deptGroup.name } });

	ctx.body = ServiceResult.getSuccess(ctx.request.body);
	await next();
});

router.get('/approval/:deptId', async (ctx, next) => {
	let { deptId } = ctx.params;
	deptId = Number(deptId);

	let dept = await Depts.findOne({ deptId, corpId: config.corpId });
	let approvalDepts = [];
	if (!dept) {
		ctx.body = ServiceResult.getSuccess(approvalDepts);
		return;
	}

	for (let i = 0, length = dept.deptPath.length; i < length; i++) {
		let _deptId = dept.deptPath[i];
		if (_deptId === 1) {
			break;
		}
		let _dept = i === 0 ? dept : await Depts.findOne({ deptId: _deptId, corpId: config.corpId });

		let _managers = [];
		if (!_dept.managers.length) {
			continue;
		}
		for (let manager of _dept.managers) {
			_managers.push({
				userId: manager.userId,
				userName: manager.userName
			});
		}
		approvalDepts.push({
			deptId: _dept.deptId,
			deptName: _dept.deptName,
			users: _managers,
			notified: false,
			approval: false
		});
	}

	ctx.body = ServiceResult.getSuccess(approvalDepts);
	await next();
});

module.exports = router;
