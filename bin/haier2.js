#!/usr/bin/env node

require('console-stamp')(console, {
	pattern: 'yyyy-mm-dd\'T\'HH:MM:ss:l'
});
// require('../services/init');
process.env.NODE_ENV = 'haier2';
const config = require('../config');
// require('../services/scheduleDepts');
// require('../services/scheduleBtrip');
// require('../services/budgetWarning');

// 刘遵坤 4508346521365159
// 张超 2541536342791141

const rp = require('request-promise');
const dingding = require('../core/dingding');

const data = {
	process_code: 'PROC-8AC305F0-9B7A-44D5-89E2-F0FC17898ED7',
	originator_user_id: '4508346521365159',
	dept_id: 129374278, // 测试钉钉
	approvers: '4508346521365159',
	form_component_values: [
		{
			name: '出差事由',
			value: '这是出差事由'
		},
		{
			name: '出差备注',
			value: '这是备注'
		},
		{
			name: '同行人',
			value: JSON.stringify([ '2541536342791141' ])
		},
		{
			name: 'SYS-ATC',
			value: JSON.stringify({ 'startTime': '2019-07-21 上午', 'finishTime': '2019-07-21 下午', 'unit': 'halfDay' })
		},
		{
			name: '行程',
			value: JSON.stringify([
				[
					{
						name: '交通工具',
						value: '飞机'
					},
					{
						name: '单程往返',
						value: '单程'
					},
					{
						name: '出发城市',
						value: '上海'
					},
					{
						name: '目的城市',
						value: '信阳'
					},
					{
						name: '开始时间',
						value: '2019-07-21 上午'
					},
					{
						name: '结束时间',
						value: '2019-07-21 下午'
					},
					{
						name: '时长',
						value: 1
					}
				]
			])
		}
	]
};

class Test {
	static async approval () {
		console.log('开始发起审批单');
		let accessToken = await dingding.getAccessToken();
		console.log(accessToken);
		// let accessToken = "3a2fd2e66e80311aa028f5350f4365bd";
		let uri = `https://oapi.dingtalk.com/topapi/processinstance/create?access_token=${accessToken}`;
		console.log(data);
		rp({
			uri,
			method: 'POST',
			body: data,
			header: {
				'Content-Type': 'application/json'
			},
			json: true
		}).then(res => {
			console.log({
				res
			});
		}).catch(error => {
			console.error({
				error
			});
		});
	}

	static async cancel (process_instance_id) {
		let accessToken = await dingding.getAccessToken();
		let uri = 'https://oapi.dingtalk.com/topapi/process/workrecord/update?access_token=' + accessToken;
		rp({
			uri,
			method: 'POST',
			body: {
				request: {
					process_instance_id,
					status: 'COMPLETED',
					result: 'agree'
				}
			},
			header: {
				'Content-Type': 'application/json'
			},
			json: true
		}).then(res => {
			console.log({
				res
			});
		}).catch(error => {
			console.error({
				error
			});
		});
	}

	static async getLists () {
		let accessToken = await dingding.getAccessToken();
		let uri = `https://oapi.dingtalk.com/topapi/processinstance/listids?access_token=${accessToken}`;
		let date = new Date(2019, 7, 2, 0, 0);
		let endDate = new Date(2019, 7, 29, 15, 35);
		console.log(date, endDate, date.getTime(), endDate.getTime());
		rp({
			uri,
			method: 'POST',
			body: {
				process_code: 'PROC-935E2DD0-DC75-4605-8AE1-9A20DBE69275',
				start_time: date.getTime(),
				end_time: endDate.getTime()
			},
			json: true
		}).then(res => {
			console.log(res);
			let process_instance_id = res.result.list[0];
			this.getDetail(process_instance_id);
		}).catch(error => {
			console.error({
				error
			});
		});
	}

	static async getDetail (process_instance_id) {
		let accessToken = await dingding.getAccessToken();
		rp({
			uri: `https://oapi.dingtalk.com/topapi/processinstance/get?access_token=${accessToken}`,
			method: 'POST',
			body: {
				process_instance_id
			},
			json: true
		}).then(res => {
			console.log({ res });
			// console.log(res.process_instance.form_component_values);
		}).catch(error => {
			console.error({
				error
			});
		});
	}
}

// Test.approval();
// Test.getLists();
Test.cancel('382112e5-67b7-4698-8541-50773434d6fe');
