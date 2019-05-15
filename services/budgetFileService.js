process.env.NODE_ENV = 'production';

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const Files = require('../models/Files');
const DeptGroups = require('../models/DeptGroups');
const Budgets = require('../models/Budgets');
const Types = require('../models/Types');

class BudgetFileService {
	constructor () {
		this.year = new Date().getFullYear();
		this.name = '';
		this.fileData = [];
		this.groupMap = new Map();
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
	 * 解析年度预算表
	 * @param {Number} year 年费
	 */
	async parse (options) {
		console.log('开始解析预算文件');
		this.year = options.year || new Date().getFullYear();
		this.name = options.name;
		if (!options.name) return Promise.reject('参数错误');
		try {
			await this.initSelfTypes();
			await this.initGroups();
			await this.parseExcel();
			await this.parseData();
		} catch (error) {
			console.log('【失败】解析预算文件失败', error);
			return Promise.reject(error);
		}
	}

	async initSelfTypes () {
		let types = await Types.find({ corpId: config.corpId, type: 'budgets', catalog: 1 });
		for (let type of types) {
			this.selfTypes.push(type.code);
		}
	}
	async initGroups () {
		let deptGroups = await DeptGroups.find({ corpId: config.corpId });

		for (let deptGroup of deptGroups) {
			this.groupMap.set(deptGroup.code, deptGroup.name);
		}
	}

	/**
	 * 解析预算表中数据结构
	 */
	async parseData () {
		console.log('开始处理数据');
		if (!this.fileData || !this.fileData.length) {
			let error = '文件表数据解析错误';
			return Promise.reject(error);
		}
		let promiseArray = [];
		for (let item of this.fileData) {
			let code = item.code.trim().replace();
			if (!this.groupMap.has(code)) {
				continue;
			}

			let data = {
				corpId: config.corpId,
				year: this.year,
				code,
				name: this.groupMap.get(code),
				benefits: this.handleNum(item.benefits),
				budgets: this.handleNum(item.budgets),
				others: this.handleNum(item.others),
				self: {}
			};
			if (this.selfTypes.length) {
				for (let typeCode of this.selfTypes) {
					data.self[typeCode] = this.handleNum(item[typeCode]);
				}
			}
			console.log(`保存 ${this.groupMap.get(code)} 费用`);
			let promise = Budgets.updateOne({
				corpId: config.corpId,
				year: this.year,
				code
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

const budgetFileService = new BudgetFileService();

module.exports = budgetFileService;
