const StaffProcess = require('../models/StaffProcess');
const Process = require('../models/Process');
const ServiceResult = require('../core/ServiceResult');
const applicationService = require('../services/applicationService');
const budgetChange = require('../services/budgetChange');
const jwt = require('jsonwebtoken');
const Depts = require('../models/Depts');
const message = require('../services/message');

const config = require('../config');

const Router = require('koa-router');
const router = new Router();

router.prefix('/api/processes');

router.get('/staffs', async (ctx, next) => {
	let { page, limit, keywords } = ctx.query;
	page = Number(page) || 1;
	limit = Number(limit) || 10;
	let offset = (page - 1) * limit;

	let options = {
		corpId: config.corpId
	};
	if (keywords && keywords !== 'undefined') {
		let regex = new RegExp(keywords, 'i');
		options.$or = [
			{ userName: { $regex: regex } },
			{ deptName: { $regex: regex } },
			{ 'group.name': { $regex: regex } },
			{ 'approvals.users.userName': { $regex: regex } }
		];
	}
	let rows = [];
	let processes = await StaffProcess.find(options).skip(offset).limit(limit);
	let count = await StaffProcess.find(options).countDocuments();

	for (let process of processes) {
		let managers1 = [];
		let managers2 = [];
		let approvals = process.approvals;
		if (approvals[0]) {
			for (let user of approvals[0].users) {
				managers1.push(user.userName);
			}
		}

		if (approvals[1]) {
			for (let user of approvals[1].users) {
				managers2.push(user.userName);
			}
		}

		let row = {
			_id: process._id,
			userId: process.userId,
			userName: process.userName,
			deptId: process.deptId,
			deptName: process.deptName,
			group: process.group,
			type: process.type,
			approvals: process.approvals,
			managers1,
			managers2
		};

		rows.push(row);
	}

	ctx.body = ServiceResult.getSuccess({ rows, count });
});

router.get('/personal/:deptId', async (ctx) => {
	let deptId = Number(ctx.params.deptId);
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}

	let process = await StaffProcess.findOne({ corpId: config.corpId, userId: user.userId, deptId });
	if (!process) {
		ctx.body = ServiceResult.getFail('获取process 失败');
		return;
	}

	ctx.body = ServiceResult.getSuccess(process);
});

router.get('/application/:id', async (ctx) => {
	let id = ctx.params.id;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}

	let process = await Process.findOne({ corpId: config.corpId, applicationId: id });
	if (!process) {
		ctx.body = ServiceResult.getFail('获取process 失败');
		return;
	}

	ctx.body = ServiceResult.getSuccess(process);
});

router.post('/application/:id/cancel', async (ctx) => {
	let id = ctx.params.id;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 10, 20 ] },
			userId: user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('撤销失敗');
			return;
		}
		await Process.updateOne({ _id: process._id }, { status: 11 });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.error(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/reject', async (ctx) => {
	let id = ctx.params.id;
	let body = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('拒绝失败');
			return;
		}
		let applications = process.applications || [];

		for (let [ index, item ] of applications.entries()) {
			let userIndex = item.users.findIndex(info => {
				return info.userId === user.userId;
			});
			if (item.approvalTime || userIndex === -1) continue;
			applications[index].status = 30;
			applications[index].note = body.note || '';
			applications[index].approvalTime = new Date();
			applications[index].approvalUser = {
				userId: user.userId,
				userName: user.userName
			};
			break;
		}
		await Process.updateOne({ _id: process._id }, { status: 21, applications });
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.error(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/agree', async (ctx) => {
	let id = ctx.params.id;
	let body = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}
		let applications = process.applications || [];

		for (let [ index, item ] of applications.entries()) {
			let userIndex = item.users.findIndex(info => {
				return info.userId === user.userId;
			});
			if (item.approvalTime || userIndex === -1) continue;
			applications[index].status = 20;
			applications[index].note = body.note || '';
			applications[index].approvalTime = new Date();
			applications[index].approvalUser = {
				userId: user.userId,
				userName: user.userName
			};
			break;
		}
		await Process.updateOne({ _id: process._id }, { applications });

		let exists = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: 10,
			'applications.approvalTime': null
		});
		console.log({ exists });
		if (!exists) {
			// 给财务发消息
			applicationService.sendFinanceMsg(process);
			await Process.updateOne({ _id: process._id }, { status: 30 });
		} else {
			// 给上一级领导发消息
			applicationService.sendAppMsg(exists);
		}

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/financesave', async (ctx) => {
	let id = ctx.params.id;
	let { from } = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 30, 31 ] },
			'finances.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let toArray = [];
		let toDept = await Depts.findOne({
			'group.code': process.group.code,
			corpId: config.corpId
		});

		if (toDept && toDept.managers.length) {
			for (let manager of toDept.managers) {
				toArray.push({
					userId: manager.userId,
					userName: manager.userName
				});
			}
		}

		let count = 0;
		let userIds = [];
		let fromArray = [];
		for (let item of from) {
			count += Number(item.amount);
			let users = [];
			let fromItem = {
				code: item.code,
				name: item.name,
				amount: Number(item.amount),
				notified: true,
				notifyTime: new Date(),
				status: 10
			};

			let dept = await Depts.findOne({
				'group.code': item.code,
				corpId: config.corpId
			});

			if (dept && dept.managers.length) {
				for (let manager of dept.managers) {
					userIds.push(manager.userId);
					users.push({
						userId: manager.userId,
						userName: manager.userName
					});
				}
			}

			fromItem.users = users;
			fromArray.push(fromItem);
		}

		userIds = Array.from(new Set(userIds));
		await message.sendFromMsg(process, userIds);
		await Process.updateOne({
			_id: process._id
		}, {
			from: fromArray,
			to: toArray,
			count,
			status: 40
		});

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/withdraw', async (ctx) => {
	let id = ctx.params.id;
	let user = jwt.decode(ctx.header.authorization.substr(7));

	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 40, 50 ] },
			'finances.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let userIds = [];
		for (let item of process.from) {
			for (let user of item.users) {
				userIds.push(user.userId);
			}
		}
		userIds = Array.from(new Set(userIds));

		await message.sendWithdrawMsg(process, userIds);
		await Process.updateOne({ _id: process._id }, {
			from: [],
			count: 0,
			status: 30
		});

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/fromback', async (ctx) => {
	let id = ctx.params.id;
	let { note } = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 40 ] },
			'from.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let userIds = [];
		for (let user of process.finances.users) {
			userIds.push(user.userId);
		}

		userIds = Array.from(new Set(userIds));

		await message.sendFromBackMsg(process, user, userIds, note);
		await Process.updateOne({ _id: process._id }, {
			from: [],
			count: 0,
			status: 30
		});

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/frompass', async (ctx) => {
	let id = ctx.params.id;
	let { note } = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 40 ] },
			'from.users.userId': user.userId,
			'from.status': 10
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let newFrom = [];
		// let allPass = true;
		for (let item of process.from) {
			if (item.status !== 10) {
				newFrom.push(item);
				continue;
			}
			for (let userInfo of item.users) {
				if (user.userId === userInfo.userId) {
					item.approvalTime = new Date();
					item.approvalUser = {
						userId: user.userId,
						userName: user.userName
					};
					item.status = 20;
					item.note = note;
				}
			}
			newFrom.push(item);
		}

		await Process.updateOne({ _id: process._id }, {
			from: newFrom
		});

		let exist = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 40 ] },
			'from.status': { $in: [ 10, 30 ] }
		});

		// 给调入的部门领导发消息
		if (!exist) {
			console.log('给调入部门领导发消息');
			let userIds = [];
			let newTo = [];
			for (let item of process.to) {
				userIds.push(item.userId);
				newTo.push({
					userId: item.userId,
					userName: item.userName,
					notified: true,
					notifyTime: new Date(),
					status: 10
				});
			}

			userIds = Array.from(new Set(userIds));

			await message.sendToMsg(process, userIds);
			await Process.updateOne({ _id: process._id }, {
				to: newTo,
				status: 50
			});
		}

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('操作失败');
	}
});

router.post('/application/:id/toback', async (ctx) => {
	let id = ctx.params.id;
	let { note } = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 50 ] },
			'to.users.userId': user.userId
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let userIds = [];
		for (let user of process.finances.users) {
			userIds.push(user.userId);
		}

		userIds = Array.from(new Set(userIds));

		await message.sendBackMsg(process, user, userIds, note);
		await Process.updateOne({ _id: process._id }, {
			from: [],
			count: 0,
			status: 30
		});

		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('拒绝失败');
	}
});

router.post('/application/:id/topass', async (ctx) => {
	let id = ctx.params.id;
	let { note } = ctx.request.body;
	let user = jwt.decode(ctx.header.authorization.substr(7));
	if (!user.userId) {
		ctx.body = ServiceResult.getFail('鉴权失败');
		return;
	}
	try {
		let process = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 50 ] },
			'to.userId': user.userId,
			'to.status': 10
		});

		if (!process) {
			ctx.body = ServiceResult.getFail('操作失败');
			return;
		}

		let newTo = [];
		// let allPass = true;
		for (let item of process.to) {
			if (item.status !== 10) {
				newTo.push(item);
				continue;
			}
			if (user.userId === item.userId) {
				item.approvalTime = new Date();
				item.approvalUser = {
					userId: user.userId,
					userName: user.userName
				};
				item.status = 20;
				item.note = note;
			}
			newTo.push(item);
		}

		await Process.updateOne({ _id: process._id }, {
			to: newTo
		});

		let exist = await Process.findOne({
			corpId: config.corpId,
			applicationId: id,
			status: { $in: [ 50 ] },
			'to.status': { $in: [ 10, 30 ] }
		});

		// 调整预算
		if (!exist) {
			await Process.updateOne({ _id: process._id }, {
				status: 60
			});

			await budgetChange.start(process.applicationId);
			message.sendAppSuccessMsg(process);
		}
		ctx.body = ServiceResult.getSuccess({});
	} catch (error) {
		console.log(error);
		ctx.body = ServiceResult.getFail('操作失败');
	}
});

module.exports = router;
