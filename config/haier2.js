module.exports = {
	PORT: 5600,
	secret: 'haier-ec',
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier2',
		user: 'haieradmin',
		pass: 'abcd1234'
	},
	oracle: {
		user: 'nc_query',
		password: 'nc_query',
		connectString: '10.164.12.99:1521/orcl'
	},
	baseDeptId: 1,
	dingBaseUri: 'https://oapi.dingtalk.com',
	topBaseUri: 'https://oapi.dingtalk.com/topapi',
	corpId: 'dingb4c8d704ba27d52f35c2f4657eb6378f',
	corpName: '测试2海尔',
	agentid: '282603839',
	appkey: 'ding1njlrdb0cdl6cfgx',
	appsecret: 'ntQopyzA56FSzaJb5DCVEcYtiF5tsvbNCXXQ2CQzuz1M284Ghd18gtQH3deR5ITa',
	deptCron: '0 0 6,12 * * *',
	btripCron: '0 */20 * * * *',
	ncCron: '0 */2 * * * *',
	mobileBase: 'https://portal.haierfinancial.com:18612/ec/ecmobile/#/',
	warningLines: [ 0.8, 0.9, 0.95 ],
	warningCron: '0 0 9,18 * * *',
	incomingUri: 'http://10.164.12.34:8080/jx/api/mvc/insert',
	processCode: 'PROC-8AC305F0-9B7A-44D5-89E2-F0FC17898ED7'
};
