const Applications = require('../models/Applications');
const Process = require('../models/Process');
const StaffProcess = require('../models/StaffProcess');
const util = require('../core/util');
const config = require('../config');
const message = require('./message');

class ApplicationService {
	constructor () {
		this.year = new Date().getFullYear();
	}
	async create (data) {
		this.year = new Date().getFullYear();
		if (!data.deptId || !data.cause) {
			return Promise.reject('参数错误');
		}
		data.id = util.timeCode();

		let application = await Applications.create(data);
		let process = await this.setProcess(application);
		this.sendAppMsg(process);
		return application;
	}

	async setProcess (application) {
		let staffProcess = await StaffProcess.findOne({
			corpId: config.corpId,
			userId: application.userId,
			deptId: application.deptId
		});

		if (!staffProcess) {
			return Promise.reject(`没有找到${application.userName}的流程配置`);
		}

		let process = {
			applicationId: application.id,
			userId: staffProcess.userId,
			userName: staffProcess.userName,
			deptId: application.deptId,
			deptName: application.deptName,
			corpId: config.corpId,
			corpName: config.corpName,
			year: this.year,
			group: staffProcess.group,
			applications: staffProcess.applications,
			finances: {
				users: staffProcess.finances
			},
			from: [],
			count: 0,
			status: 10
		};

		let res = await Process.create(process);
		return Promise.resolve(res);
	}

	async sendAppMsg (process) {
		console.log('给领导发审批消息');
		let applications = process.applications || [];
		let userIds = [];
		if (!applications.length) {
			return Promise.resolve();
		}
		let notifyIndex = 0;

		for (let [ index, application ] of applications.entries()) {
			if (!application.approvalTime) {
				let users = application.users || [];
				for (let user of users) {
					userIds.push(user.userId);
				}
				notifyIndex = index;
				break;
			}
		}

		if (!userIds.length) {
			return Promise.resolve();
		}
		try {
			await message.sendAppMsg(process, userIds);
			applications[notifyIndex].notify = true;
			applications[notifyIndex].notifyTime = new Date();

			await Process.updateOne({ _id: process._id }, { applications });
		} catch (error) {
			console.log('给领导发消息失败', error);
			return Promise.resolve({});
		}
	}

	async sendFinanceMsg (process) {
		console.log('给财务发调整消息');
		let userIds = [];
		let users = process.finances.users || [];
		for (let user of users) {
			userIds.push(user.userId);
		}

		if (!userIds.length) {
			return Promise.resolve();
		}
		await message.sendFinanceMsg(process, userIds);
		return Process.updateOne({ applicaitonId: process.applicaitonId }, {
			'finances.notify': true,
			'finances.notifyTime': new Date()
		});
	}
}

const applicationService = new ApplicationService();

module.exports = applicationService;
