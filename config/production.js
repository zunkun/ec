module.exports = {
	PORT: 5600,
	mysql: {
		dbHost: '127.0.0.1',
		dbUser: 'root',
		dbPassword: '123456',
		database: 'ec'
	},
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier',
		user: 'dev',
		pass: '123456'
	},
	baseDeptId: 1,
	baseDeptName: '上海铭悦软件有限公司',
	dingBaseUri: 'https://oapi.dingtalk.com',
	corpId: 'dingcbcbb63d3edd5478',
	agentid: '246364010',
	appkey: 'dingzjzljz7xyeqdqrcg',
	appsecret: 'G7AA-I0BtNrbY7vOGYw64if1UqQnaKCaIyPBMZ2hqHE6MTw-9zBzhrvxhMAqVsEr',
	schedule: '0 8/18 0 * * *'
};
