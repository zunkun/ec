process.env.NODE_ENV = 'development';
const rp = require('request-promise');
const dingding = require('../core/dingding');

async function setProcess () {
	console.log('开始设置考勤');
	// let accessToken = await dingding.getAccessToken();
	let accessToken = '31f118c58bfa3a3d883a9c95b93b147f';
	console.log({ accessToken });
	let uri = 'https://oapi.dingtalk.com/topapi/attendance/approve/duration/calculate?access_token=' + accessToken;

	let data = await rp({
		uri,
		method: 'POST',
		body: {
			userid: '4508346521365159',
			biz_type: 2,
			from_time: '2019-09-12 AM',
			to_time: '2019-09-13 AM',
			duration_unit: 'halfDay',
			calculate_model: 1
		},
		json: true
	});

	console.log({ data });
}

setProcess().then()
;
