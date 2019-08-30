const config = require('../config');
const Trips = require('../models/Trips');
const TripService = require('../services/trip');
const DingTalkEncryptor = require('dingtalk-encrypt');
const utils = require('dingtalk-encrypt/Utils');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/dingtalk');

/**
 * 正常钉钉回调接口
 */
router.post('/callback', async (ctx, next) => {
	console.log('--------------------------------------------------------------');
	console.log('开始解密钉钉回调数据');

	const query = ctx.query;
	const { encrypt } = ctx.request.body;
	const encryptor = new DingTalkEncryptor(config.dingToken, config.ENCODING_AES_KEY, config.corpId);

	const plainText = encryptor.getDecryptMsg(query.signature, query.timestamp, query.nonce, encrypt);
	const result = JSON.parse(plainText);

	console.log(result);

	if (result.EventType === 'check_url') {
		console.log('当前请求为注册接口验证');
		console.log('响应数据：加密\'success\'，签名等等');
		let data = encryptor.getEncryptedMap('success', query.timestamp, utils.getRandomStr(8));
		console.log('返回数据', data);
		ctx.body = data;
		return;
	}
	console.log('当前请求为审批单变动');
	const processInstanceId = result.processInstanceId;
	// 获取审批单详情
	let instance = await TripService.getInstance(processInstanceId);
	const bizAction = instance.biz_action;
	const businessId = instance.business_id;
	let trip = await Trips.findOne({ processInstanceId });

	switch (bizAction) {
	case 'NONE': // 正常审批结果
		// 开始创建
		if (result.type === 'start') {
			console.log('发起审批');
			return;
		}
		// 发起人撤回审批单
		if (result.type === 'terminate') {
			console.log(`发起人撤销审批单${processInstanceId}`);
			await Trips.updateOne({ processInstanceId, status: 20 }, { $set: { status: 50, url: result.url, result: 'terminate' } });
			return;
		}
		// 接下来的代码表示审批结束， result.type === 'finish'
		// 审批单被拒绝
		if (result.result === 'refuse') {
			console.log(`审批 ${processInstanceId}拒绝审批单`);
			await Trips.updateOne({ processInstanceId, status: 20 }, { $set: { status: 31, url: result.url, result: 'refuse' } });
			return;
		}
		// 审批单同意
		if (result.result === 'agree') {
			await Trips.updateOne({ processInstanceId, status: 20 }, { $set: { status: 30, url: result.url, result: 'agree' } });
			// 写入商旅
			await TripService.sync2Btrip(trip.processInstanceId, trip);
			return;
		}
		break;
	case 'MODIFY': // MODIFY表示该审批实例是基于原来的实例修改而来
		// 开始创建修改审批单
		// 获取审批单详情，在本地创建一条新的审批单数据
		if (result.type === 'start') {
			console.log('发起审批修改审批单');
			await TripService.syncUpdateTrip(processInstanceId, instance);
			return;
		}
		// 发起人撤回审批单
		// 修改作废，则新的审批单作废，旧的审批单数据不变
		if (result.type === 'terminate') {
			await Trips.updateOne({ processInstanceId }, { $set: { approvalStatus: 'TERMINATED', status: 60 } });
			return;
		}
		// 接下来的代码表示审批结束， result.type === 'finish'
		// 审批单被拒绝，则同撤销审批单操作，新的审批单拒绝，旧审批单不变
		if (result.result === 'refuse') {
			await Trips.updateOne({ processInstanceId }, { $set: { approvalStatus: 'COMPLETED', result: 'refuse', status: 60 } });
			return;
		}
		// 审批单同意，旧的审批单作废，更改新的审批数据状态，同时修改写入商旅的审批单数据
		if (result.result === 'agree') {
			// 旧审批单作废
			await Trips.updateOne({ businessId, bizAction: 'NONE' }, { $set: { status: 60 } });
			await Trips.updateOne({ businessId, bizAction: 'MODIFY' }, {
				$set: {
					approvalStatus: instance.status,
					result: instance.result,
					status: 30
				}
			});

			let oldTrip = await Trips.findOne({ businessId, bizAction: 'NONE' });
			// 更新商旅审批单
			// await TripService.update2Btrip(processInstanceId, trip);
			return;
		}
		break;
	case 'REVOKE': // REVOKE表示该审批实例对原来的实例进行撤销
		// 开始创撤回审批单
		// 获取审批单详情，在本地创建一条新的审批单数据
		if (result.type === 'start') {
			console.log('发起审批撤回审批单');
			await TripService.syncUpdateTrip(processInstanceId, instance);
			return;
		}
		// 发起人撤回审批单
		// 撤回审批单操作被撤回，则新的审批单作废，旧的审批单正常使用
		if (result.type === 'terminate') {
			console.log('撤回审批单被中止');
			await Trips.updateOne({ processInstanceId }, { $set: { approvalStatus: 'TERMINATED', status: 60 } });
			return;
		}
		// 接下来的代码表示审批结束， result.type === 'finish'
		// 撤回审批单被拒绝，新的审批单拒绝，旧审批单正常使用
		if (result.result === 'refuse') {
			console.log('撤回审批单被拒绝，原审批单继续有效');
			await Trips.updateOne({ processInstanceId }, { $set: { approvalStatus: 'COMPLETED', result: 'refuse', status: 60 } });
			return;
		}
		// 撤回审批单被审批单同意，更改新的审批数据状态，旧审批单作废，同时撤回写入商旅中的数据
		if (result.result === 'agree') {
			// 设置新的审批单状态
			console.log('撤回审批单被同意，原审批单被用户撤销，同时撤销商旅出差');
			await Trips.updateOne({ processInstanceId }, { $set: { approvalStatus: 'COMPLETED', result: 'agree' } });
			let oldTrip = await TripService.findOne({ businessId, bizAction: 'NONE' });
			// 删除商旅审批单
			await TripService.cancelBtrip(oldTrip);
			// 设置旧的审批单为用户取消
			await Trips.updateOne({ businessId, bizAction: 'NONE' }, { $set: { status: 60 } });
			return;
		}
		break;
	default:
		break;
	}

	console.log('--------------------------------------------------------------');

	await next();
});

module.exports = router;
