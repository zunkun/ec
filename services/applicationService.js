const Applications = require('../models/Applications');
const Process = require('../models/Process');
const StaffProcess = require('../models/StaffProcess');
const util = require('../core/util');
const config = require('../config');

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
		await this.setProcess(application);
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
			status: 10
		};

		await Process.create(process);
		return Promise.resolve();
	}
}

const applicationService = new ApplicationService();

module.exports = applicationService;
