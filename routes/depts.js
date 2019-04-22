const ServiceResult = require('../core/ServiceResult');
const Depts = require('../models/Depts');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/depts');

/**
 * @api {get} /api/depts/?year=:year 获取部门列表
 * @apiName get-dept-lists
 * @apiDescription 获取部门列表,即需要做费控的部门列表，此列表只是钉钉部门的一级部门 【需要登录】
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
	let depts = await Depts.find({ year });
	let data = { year, depts: [] };

	for (let dept of depts) {
		data.depts.push({
			deptId: dept.deptId,
			deptName: dept.deptName,
			parentId: dept.parentId,
			parentName: dept.parentName
		});
	}

	ctx.body = ServiceResult.getSuccess(data);
	await next();
});

module.exports = router;
