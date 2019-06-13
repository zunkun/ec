const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const Files = require('../models/Files');
const Incomings = require('../models/Incomings');
const Staffs = require('../models/Staffs');
const Types = require('../models/Types');

class IncomingFileService {
	constructor () {
		this.year = new Date().getFullYear();
		this.name = '';
		this.fileData = [];
		this.staffMap = new Map();
		this.typeMap = new Map();
		this.selfTypes = [];
	}

	handleNum (str) {
		if (!str) {
			return 0;
		}
		str = str.trim().replace(/,|-/g, '');
		return Number(str);
	}

	/**
	 * 解析年度输入目标表
	 * @param {Number} year 年费
	 */
	async parse (options) {
		console.log('开始解析输入目标文件');
		this.year = options.year || new Date().getFullYear();
		this.name = options.name;
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
			this.typeMap.set(type.code, type.name);
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
		for (let item of this.fileData) {
			let jobnumber = item['工号'] ? `${item['工号']}`.trim() : '';
			let code = item['编码'] ? `${item['编码']}`.trim() : '';
			let period = item['周期'] ? `${item['周期']}`.trim() : '';

			if (!this.staffMap.has(jobnumber) || !this.typeMap.has(code) || !period) {
				continue;
			}

			let data = {
				corpId: config.corpId,
				year: this.year,
				jobnumber,
				userId: this.staffMap.get(jobnumber).userId,
				userName: this.staffMap.get(jobnumber).userName,
				code,
				typeName: this.typeMap.get(code),
				incomings: Number(item['目标']) || 0,
				line2: Number(item['2区位']) || 0,
				line4: Number(item['4区位']) || 0,
				line6: Number(item['6区位']) || 0,
				line8: Number(item['8区位']) || 0,
				line10: Number(item['10区位']) || 0,
				status: 1
			};

			console.log(`保存 ${this.staffMap.get(jobnumber).userName}  ${this.typeMap.get(code)} ${period} 目标`);
			let promise = Incomings.updateOne({
				corpId: config.corpId,
				year: this.year,
				jobnumber,
				code,
				period
			}, data, { upsert: true });
			promiseArray.push(promise);
		}
		return Promise.all(promiseArray);
	}

	/**
	 * 解析excel文件
	 */
	async parseExcel () {
		console.log('【开始】解析excel文件');
		const filePath = path.join(__dirname, `../uploads/${this.name}`);
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

	async test () {
		let file = await Files.findOne({});
		await this.parse(file);
	}
}

const incomingFileService = new IncomingFileService();

module.exports = incomingFileService;