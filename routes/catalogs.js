const ServiceResult = require('../core/ServiceResult');
const Catalogs = require('../models/Catalogs');
const util = require('../core/util');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/catalogs');

/**
 * @api {get} /api/catalogs/ 获取预算分类
 * @apiName get-catalogs
 * @apiDescription 获取预算分类列表 【需要登录】
 * @apiGroup 预算分类
 * @apiParam {Number} year 年份 默认当年
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {Array{Object}} data.catalogs 预算分类列表
 * @apiSuccess {String}  data.catalogs.id 分类Id
 * @apiSuccess {String}  data.catalogs.name 分类名称
 */
router.get('/', async (ctx, next) => {
	let year = Number(ctx.query.year) || (new Date()).getFullYear();
	let catalogs = await Catalogs.find({ year });
	let data = { year, catalogs: [] };

	for (let catalog of catalogs) {
		data.depts.push({
			id: catalog.id,
			name: catalog.name
		});
	}

	ctx.body = ServiceResult.getSuccess(data);
	await next();
});

/**
 * @api {post} /api/catalogs/ 新增预算分类
 * @apiName create-catalogs
 * @apiDescription 新增预算分类 【需要登录】
 * @apiGroup 预算分类
 * @apiParam {Number} year 年份 默认当年
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {String}  data.id 分类Id
 * @apiSuccess {String}  data.name 分类名称
 */
router.post('/', async (ctx, next) => {
	let year = Number(ctx.query.year) || (new Date()).getFullYear();
	let name = ctx.request.body.name;
	if (!name) {
		ctx.body = ServiceResult.getFail('参数不正确', 400);
		return;
	}

	let catalog = await Catalogs.findOne({ year, name });
	if (catalog) {
		ctx.body = ServiceResult.getFail(`系统已存在名称为${name}的分类`, 400);
		return;
	}
	let id = util.genCatalogId();
	await Catalogs.create({ id, year, name });

	let data = { year, id, name };

	ctx.body = ServiceResult.getSuccess(data);
	await next();
});

/**
 * @api {put} /api/catalogs/:id 修改预算分类
 * @apiName put-catalogs
 * @apiDescription 修改预算分类 【需要登录】
 * @apiGroup 预算分类
 * @apiParam {String} id 年份 分类id
 * @apiParam {Number} year 年份 默认当年
 * @apiParam {String} name 年份 新的分类名称
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 * @apiSuccess {Number} data.year 年份
 * @apiSuccess {String}  data.id 分类Id
 * @apiSuccess {String}  data.name 分类名称
 */

router.put('/:id', async (ctx, next) => {
	let year = Number(ctx.query.year) || (new Date()).getFullYear();
	let doc = ctx.request.body;
	let id = ctx.params.id;
	let catalog;
	if (!name) {
		ctx.body = ServiceResult.getFail('参数不正确', 400);
		return;
	}
	catalog = await Catalogs.findOne({ id });
	if (!catalog) {
		ctx.body = ServiceResult.getFail('参数不正确', 400);
		return;
	}

	try {
		await Catalogs.updateOne({ id }, doc);
		catalog = await Catalogs.findOne({ id });
		let data = { year, id, name };
		ctx.body = ServiceResult.getSuccess(data);
	} catch (error) {
		console.log('更新catalog失败', error);
		ctx.body = ServiceResult.getFail('更新失败', 500);
	}
	await next();
});

/**
 * @api {delete} /api/catalogs/:id 删除预算分类
 * @apiName delete-catalogs
 * @apiDescription 删除预算分类，注意：如果已经开始使用该分类，请调整预算列表不再使用该分类，才可以删除 【需要登录】
 * @apiGroup 预算分类
 * @apiParam {String} id 分类id
 * @apiSuccess {Number} errcoce 正确时为0，错误时为错误代码
 * @apiSuccess {String} errmsg 错误提示，正确返回为空字符
 * @apiSuccess {Boolean} success 是否正确返回，true 正确, false错误
 * @apiSuccess {Object} data 正确返回时的数据
 */

router.delete('/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let catalog = await Catalogs.findOne({ id });
	if (!catalog) {
		ctx.body = ServiceResult.getFail('参数不正确', 400);
		return;
	}

	// Todo: 查询该分类是否被使用，如果已经被使用，则不允许删除

	try {
		await Catalogs.remove({ id });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log('删除catalog失败', error);
		ctx.body = ServiceResult.getFail('删除失败', 500);
	}
	await next();
});

module.exports = router;
