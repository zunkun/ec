const Router = require('koa-router');
const Files = require('../models/Files');
const multer = require('koa-multer');
const config = require('../config');
const ServiceResult = require('../core/ServiceResult');
const budgetFileService = require('../services/budgetFileService');

const storage = multer.diskStorage({
	// 文件保存路径
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	// 修改文件名称
	filename: (req, file, cb) => {
		const fileFormat = (file.originalname).split('.'); // 以点分割成数组，数组的最后一项就是后缀名
		cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
	}
});
// 加载配置
const upload = multer({ storage });

const router = new Router();
router.prefix('/api/files');

/**
* @api {post} /api/files/upload 上传预算报表
* @apiName upload
* @apiGroup 文件上传
* @apiDescription 上传预算报表，必须是.xlsx文件类型，并且是给定的模板 【需要登录】
* @apiParam {String} [year] 年 默认当年
* @apiSuccess {Object} data 返回值
*/
router.post('/upload', upload.single('file'), async (ctx, next) => {
	const data = ctx.req.body;
	const year = Number(data.year) || new Date().getFullYear();
	if ([ 'budgets', 'incomings' ].indexOf(data.type) === -1) {
		ctx.body = ServiceResult.getFail('参数不正确');
		return;
	}
	const fileInfo = ctx.req.file;

	let file = await Files.updateOne({ year, corpId: config.corpId }, {
		year,
		corpId: config.corpId,
		type: data.type,
		name: fileInfo.filename,
		origin: fileInfo.originalname,
		status: 0
	}, { upsert: true });

	try {
		if (data.type === 'budgets') {
			await budgetFileService.parse({
				year,
				name: fileInfo.filename
			});
		} else {
			console.log('收入目标文件处理');
		}
		console.log(`【成功】${config.corpName} ${year} 文件解析成功`);
		Files.updateOne({ _id: file._id }, { status: 1 });
		ctx.body = ServiceResult.getSuccess({ year, name: fileInfo.name });
	} catch (error) {
		console.log(`【失败】${config.corpName} ${year} 文件解析失败`, error);
		Files.updateOne({ _id: file._id }, { status: 2 });
		ctx.body = ServiceResult.getFail(error, 500);
	}
	await next();
});

module.exports = router;
