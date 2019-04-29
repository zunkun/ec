const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const Files = require('../models/Files');
const DeptGroups = require('../models/DeptGroups');
// const Budget = require('../models/Budget');
const Catalogs = require('../models/Catalogs');
const util = require('../core/util');

class BudgetFileService {
	constructor () {
		this.year = new Date().getFullYear();
		this.fileData = {};
		this.structMap = new Map();
		this.dataLists = [];
		this.groupCodeMap = new Map();
		this.catalogMap = new Map();
	}

	/**
	 * 解析年度预算表
	 * @param {Number} year 年费
	 */
	async parse (year) {
		this.year = year;
		try {
			await this.parseExcel();
			await this.parseData();
			for (let data of this.dataLists) {
				let groupCode = await this.getGroupCode(data['预算体']);
				this.setCatalog(data['费用项目编码'], data['费用项目名称']);
				let budgetData = {
					corpId: config.corpId,
					year: this.year,
					group: { code: groupCode, name: data['预算体'] },
					catalog: { code: data['费用项目编码'], name: data['费用项目名称'] },
					budget: Number(data['年度合计']) || 0,
					month1: Number(data['1月']) || 0,
					month2: Number(data['2月']) || 0,
					month3: Number(data['3月']) || 0,
					month4: Number(data['4月']) || 0,
					month5: Number(data['5月']) || 0,
					month6: Number(data['6月']) || 0,
					month7: Number(data['7月']) || 0,
					month8: Number(data['8月']) || 0,
					month9: Number(data['9月']) || 0,
					month10: Number(data['10月']) || 0,
					month11: Number(data['11月']) || 0,
					month12: Number(data['12月']) || 0
				};
				console.log(`【开始】保存 ${budgetData.group.name} ${this.year}年 ${budgetData.catalog.name} 预算`);
				// await AnnualBudget.updateOne({ year: this.year, corpId: config.corpId, 'group.code': groupCode, 'catalog.code': data['费用项目编码'] }, budgetData, { upsert: true });
			}
		} catch (error) {
			console.log('【失败】解析预算文件失败');
			return Promise.reject(error);
		}
	}

	async getGroupCode (name) {
		if (this.groupCodeMap.has(name)) {
			return this.groupCodeMap.get(name);
		}
		let deptGroup = await DeptGroups.findOne({ name, corpId: config.corpId });
		if (deptGroup) {
			this.groupCodeMap.set(name, deptGroup.code);
			return deptGroup.code;
		}
		let code = `Y${util.genCode()}`;
		deptGroup = await DeptGroups.create({ corpId: config.corpId, year: this.year, code, name });
		this.groupCodeMap.set(name, code);
		return code;
	}

	async setCatalog (code, name) {
		return Catalogs.updateOne({ code }, { code, name, year: this.year }, { upsert: true });
	}

	/**
	 * 解析预算表中数据结构
	 */
	async parseData () {
		if (!this.fileData || !this.fileData.length) {
			let error = '文件表数据解析错误';
			return Promise.reject(error);
		}

		let struct = this.fileData.shift();
		for (let key in struct) {
			this.structMap.set(struct[key], key);
		}

		for (let item of this.fileData) {
			let data = {};
			for (let key in item) {
				data[struct[key]] = item[key];
			}
			this.dataLists.push(data);
		}
	}

	/**
	 * 解析excel文件
	 */
	async parseExcel () {
		console.log('【开始】解析excel文件');
		let error = '文件不存在';
		const file = await Files.findOne({ year: this.year, corpId: config.corpId });
		if (!file) {
			return Promise.reject(error);
		}
		const filePath = path.join(__dirname, `../uploads/${file.name}`);
		let exists = fs.existsSync(filePath);
		if (!exists) {
			return Promise.reject(error);
		}

		try {
			const workbook = await XLSX.readFile(filePath);
			const wsname = workbook.SheetNames[0];
			const ws = workbook.Sheets[wsname];
			this.fileData = XLSX.utils.sheet_to_json(ws);
			return Promise.resolve();
		} catch (err) {
			console.error(err);
			error = '考勤文件解析错误';
			return Promise.reject(error);
		}
	}
}

const budgetFileService = new BudgetFileService();

module.exports = budgetFileService;
