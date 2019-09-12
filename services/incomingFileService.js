const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const Files = require('../models/Files');
const Incomings = require('../models/Incomings');
const Staffs = require('../models/Staffs');
const Types = require('../models/Types');
const IncomingRecords = require('../models/IncomingRecords');
const syncIncomings = require('./syncIncomings');
const { toFixedNum } = require('../core/util');

class IncomingFileService {
	constructor () {
		this.year = new Date().getFullYear();
		this.name = '';
		this.fileData = [];
		this.staffMap = new Map();
		this.typeMap = new Map();
		this.manager = {};
		this.genDataLists = [];
		this.errorSet = new Set();
	}

	handleNum (str) {
		if (!str) {
			return 0;
		}
		str = str.trim().replace(/,|-/g, '');
		return Number(str);
	}

	/**
	 * 解析年度收入目标表
	 * @param {Number} year 年
	 */
	async parse (options) {
		console.log('开始解析输入目标文件');
		this.year = options.year || new Date().getFullYear();
		this.name = options.name;
		this.genDataLists = [];
		this.errorSet = new Set();
		if (options.userId) {
			let staff = await Staffs.findOne({ corpId: config.corpId, userId: options.userId });
			this.manager = { userId: options.userId, userName: staff.userName };
		}

		if (!options.name) return Promise.reject('参数错误');
		try {
			await this.initTypes();
			await this.initStaffs();
			await this.parseExcel();
			await this.parseData();
		} catch (error) {
			console.log('【失败】解析输入目标文件失败', error);
			return Promise.reject(error);
		}
	}

	async initTypes () {
		let types = await Types.find({ corpId: config.corpId, type: 'incomings' });
		for (let type of types) {
			this.typeMap.set(type.code, type);
		}
	}
	async initStaffs () {
		let staffs = await Staffs.find({ corpId: config.corpId });
		for (let staff of staffs) {
			if (!staff.jobnumber) {
				continue;
			}
			this.staffMap.set(staff.jobnumber, {
				userId: staff.userId,
				userName: staff.userName
			});
		}
	}

	/**
	 * 解析输入目标表中数据结构
	 */
	async parseData () {
		console.log('开始处理数据');
		if (!this.fileData || !this.fileData.length) {
			let error = '文件表数据解析错误';
			return Promise.reject(error);
		}
		let promiseArray = [];
		let promiseArray2 = [];
		// let incomings = [];
		let syncGateIncomings = [];
		let timestamp = Date.now();
		for (let item of this.fileData) {
			let jobnumber = item['工号'] ? `${item['工号']}`.trim() : '';
			let code = item['编码'] ? `${item['编码']}`.trim() : '';
			let period = item['周期'] ? `${item['周期']}`.trim() : '';

			let type = this.typeMap.get(code);
			let errorArray = [];

			if (!this.staffMap.has(jobnumber)) {
				errorArray.push('工号不正确');
				this.errorSet.add('工号不正确');
			}
			if (!this.typeMap.has(code) || !type) {
				errorArray.push('编码不正确');
				this.errorSet.add('编码不正确');
			}
			if (!period) {
				errorArray.push('周期不正确');
				this.errorSet.add('周期不正确');
			}

			if (errorArray.length) {
				item['是否错误'] = '错误';
				item['错误原因'] = errorArray.join('、');
				this.genDataLists.push(item);
				continue;
			}
			item['是否错误'] = '正确';
			item['错误原因'] = '';
			this.genDataLists.push(item);
			let data = {
				corpId: config.corpId,
				year: this.year,
				jobnumber,
				userId: this.staffMap.get(jobnumber).userId,
				userName: this.staffMap.get(jobnumber).userName,
				code,
				period,
				typeName: type.name,
				axis: type.axis,
				qq: type.qq,
				pm: type.pm,
				unit: type.unit,
				weights: toFixedNum(item['权重']),
				incomings: toFixedNum(item['目标']),
				line2: toFixedNum(item['2区位']),
				line4: toFixedNum(item['4区位']),
				line6: toFixedNum(item['6区位']),
				line8: toFixedNum(item['8区位']),
				line10: toFixedNum(item['10区位']),
				status: 1
			};
			// 搜集需要同步的数据
			if (type.syncGateway) {
				syncGateIncomings.push(data);
			}

			console.log(`保存 ${this.staffMap.get(jobnumber).userName}  ${this.typeMap.get(code).name} ${period} 目标`);
			let options = {
				corpId: config.corpId,
				year: this.year,
				jobnumber,
				code,
				period,
				status: 1
			};
			let promise;
			let promise2;

			let incoming = await Incomings.findOne(options);
			if (incoming) {
				promise = Incomings.updateOne(options, data, { upsert: true });

				promise2 = IncomingRecords.create({
					corpId: config.corpId,
					year: this.year,
					jobnumber,
					userId: this.staffMap.get(jobnumber).userId,
					userName: this.staffMap.get(jobnumber).userName,
					code,
					period,
					typeName: type.name,
					axis: type.axis,
					qq: type.qq,
					pm: type.pm,
					unit: type.unit,
					syncGateway: !!type.syncGateway,
					changeType: 2,
					timestamp,
					before: {
						weights: incoming.weights,
						incomings: incoming.incomings,
						line2: incoming.line2,
						line4: incoming.line4,
						line6: incoming.line6,
						line8: incoming.line8,
						line10: incoming.line10,
						status: incoming.status
					},
					after: {
						weights: toFixedNum(item['权重']),
						incomings: toFixedNum(item['目标']),
						line2: toFixedNum(item['2区位']),
						line4: toFixedNum(item['4区位']),
						line6: toFixedNum(item['6区位']),
						line8: toFixedNum(item['8区位']),
						line10: toFixedNum(item['10区位']),
						status: 1
					},
					manager: this.manager
				});
			} else {
				promise = Incomings.create(data);

				promise2 = IncomingRecords.create({
					corpId: config.corpId,
					year: this.year,
					jobnumber,
					userId: this.staffMap.get(jobnumber).userId,
					userName: this.staffMap.get(jobnumber).userName,
					code,
					period,
					typeName: type.name,
					axis: type.axis,
					qq: type.qq,
					pm: type.pm,
					unit: type.unit,
					syncGateway: !!type.syncGateway,
					changeType: 1,
					timestamp,
					before: {
						weights: null,
						incomings: null,
						line2: null,
						line4: null,
						line6: null,
						line8: null,
						line10: null,
						status: null
					},
					after: {
						weights: toFixedNum(item['权重']),
						incomings: toFixedNum(item['目标']),
						line2: toFixedNum(item['2区位']),
						line4: toFixedNum(item['4区位']),
						line6: toFixedNum(item['6区位']),
						line8: toFixedNum(item['8区位']),
						line10: toFixedNum(item['10区位']),
						status: 1
					},
					manager: this.manager
				});
			}
			promiseArray.push(promise);
			promiseArray2.push(promise2);
		}
		Promise.all(promiseArray2).then();

		return Promise.all(promiseArray).then(async () => {
			await this.generateErrorFile();
			return syncIncomings.syncArray(syncGateIncomings, 1, timestamp, this.year);
		});
	}

	/**
	 * 解析excel文件
	 */
	async parseExcel () {
		console.log('【开始】解析excel文件');
		const filePath = path.join(__dirname, `../public/files/上传文件/${this.name}`);
		let exists = fs.existsSync(filePath);
		if (!exists) {
			return Promise.reject('解析失败，文件不存在');
		}

		try {
			const workbook = await XLSX.readFile(filePath);
			const wsname = workbook.SheetNames[0];
			const ws = workbook.Sheets[wsname];
			this.fileData = XLSX.utils.sheet_to_json(ws);
			return Promise.resolve();
		} catch (err) {
			console.error(err);
			return Promise.reject('考勤文件解析错误');
		}
	}

	async generateErrorFile () {
		console.log('保存文件处理结果');
		var wb = XLSX.utils.book_new();
		var ws = XLSX.utils.json_to_sheet(this.genDataLists);
		XLSX.utils.book_append_sheet(wb, ws, '收入目标文件处理结果');
		await XLSX.writeFile(wb, `public/files/收入目标/${this.name}`);
		let data = { error: false, errorMsg: '' };
		if (Array.from(this.errorSet).length) {
			data = { error: true, errorMsg: Array.from(this.errorSet).join('、') };
		}
		await Files.updateOne({ name: this.name }, data);
	}

	async test () {
		let file = await Files.findOne({});
		await this.parse(file);
	}
}

const incomingFileService = new IncomingFileService();

module.exports = incomingFileService;
