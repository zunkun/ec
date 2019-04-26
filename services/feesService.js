const BtripFee = require('../models/BTripFee');
const Depts = require('../models/Depts');
const Budgets = require('../models/Budgets');
const config = require('../config');

const oracle = require('../core/db/oracle');

class FeeService {
	/**
	 * 计算差旅已用费用
	 * @param {Number} deptId deptId
	 */
	async ncExpense (code, type) {
		// 获取NC费用
		let sql = `SELECT PERIODV, FCODE, FNAME, TYPE, AMOUNT FROM nc633.v_dd_budget_fse_amount WHERE FCODE='${code}' AND TYPE='${type}'`;

		try {
			let ncFees = 0;
			let startTime = Date.now();
			let data = await oracle.execute(sql);
			console.log(`用时: ${(Date.now() - startTime) / 1000}s`);
			for (let row of data.rows) {
				ncFees += Number(row[4]);
			}
			return ncFees;
		} catch (error) {
			console.error('【错误】 执行sql出错', { sql, error });
			return Promise.reject(error);
		}
	}

	async tripBalanceByDeptId (deptId) {
		let error;
		let date = new Date();
		let year = date.getFullYear().toString();

		if (!deptId) {
			error = '参数不正确';
			return Promise.reject(error);
		}
		deptId = Number(deptId);

		let dept = await Depts.findOne({ deptId });
		if (!dept || !dept.group || !dept.group.code) {
			error = '系统没有查询到当前部门的预算';
			return Promise.reject(error);
		}
		// 获取部门年度预算
		let budget = await Budgets.findOne({ corpId: config.corpId, year, code: dept.group.code });
		if (!budget) {
			error = '系统没有查询到当前部门的预算';
			return Promise.reject(error);
		}

		try {
			let tripFees = await this.getTripFees(dept.group.code);
			return Number(budget.trip) - tripFees;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async getTripFees (code) {
		let date = new Date();
		let year = date.getFullYear().toString();
		let month = date.getMonth() + 1;
		let monthStr = month >= 10 ? `${month}` : `0${month}`;

		// 获取商旅差旅费用
		let btripFees = 0;
		let btrip = await BtripFee.findOne({ year, month: monthStr, 'group.code': code });
		btripFees = btrip ? Number(btrip.total) : 0;

		try {
			let ncFees = await this.ncExpense(code, '交通差旅费');
			return btripFees + ncFees;
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async tripBalanceByCode (code) {
		let error;
		let date = new Date();
		let year = date.getFullYear().toString();

		// 获取部门年度预算
		let budget = await Budgets.findOne({ corpId: config.corpId, year, code });
		if (!budget) {
			error = '系统没有查询到当前部门的预算';
			return Promise.reject(error);
		}

		try {
			let tripFees = await this.getTripFees(code);
			return Number(budget.trip) - tripFees;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

const feeService = new FeeService();

// fees.compute(28745426).then(data => { console.log(data); }).catch(error => { console.log(error); });

module.exports = feeService;
