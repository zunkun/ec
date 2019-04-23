module.exports = {
	PORT: 5400,
	secret: 'haier-ec',
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier',
		user: 'dev',
		pass: '123456'
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
	btripCron: '0 0 7,12,18 * * *'
};
