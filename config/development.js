module.exports = {
	PORT: 5400,
	secret: 'haier-ec',
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier',
		user: 'dev',
		pass: '123456'
	},
	oracle: {
		user: 'nc_query',
		password: 'nc_query',
		connectString: '10.164.12.99:1521/orcl'
	},
	baseDeptId: 1,
	baseDeptName: '上海铭悦软件有限公司',
	dingBaseUri: 'https://oapi.dingtalk.com',
	topBaseUri: 'https://oapi.dingtalk.com/topapi',
	corpId: 'dingcbcbb63d3edd5478',
	corpName: '上海铭悦软件有限公司',
	agentid: '246364010',
	appkey: 'dingzjzljz7xyeqdqrcg',
	appsecret: 'G7AA-I0BtNrbY7vOGYw64if1UqQnaKCaIyPBMZ2hqHE6MTw-9zBzhrvxhMAqVsEr',
	deptCron: '0 0 6,15 * * *',
	btripCron: '0 */20 * * * *',
	ncCron: '0 */2 * * * *',
	mobileBase: 'http://172.18.1.100:4500/#/',
	warningLines: [ 0.8, 0.9, 0.95 ],
	warningCron: '0 0 9,18 * * *',
	incomingUri: 'http://127.0.0.1:3000/api/incomings'
};
