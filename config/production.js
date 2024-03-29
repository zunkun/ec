module.exports = {
	PORT: 5600,
	secret: 'haier-ec',
	nonceStr: 'safasfsad',
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier',
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
	corpId: 'ding9f71dd70c3adb557',
	corpName: '海尔融资租赁股份有限公司',
	agentId: '258176054',
	appkey: 'dingfhcnhe8fysmv3j57',
	appsecret: 'NsAxZZmo_7pEEKlHg4uT2FA77y7Br3_EozCoUq65mLY6BU3QH91Dz9d6caWNFLlH',
	deptCron: '0 0 6,12 * * *',
	btripCron: '0 */20 * * * *',
	ncCron: '0 */2 * * * *',
	mobileBase: 'https://portal.haierfinancial.com:18612/ec/ecmobile/#/',
	warningLines: [ 0.8, 0.9, 0.95 ],
	warningCron: '0 0 9,18 * * *',
	incomingUri: 'http://10.164.12.34:8080/jx/api/mvc/insert',
	processCode: 'PROC-8AC305F0-9B7A-44D5-89E2-F0FC17898ED7',
	costcenter: 82653,
	invoice: 122331,
	tripCorn: '0 */10 * * * *',
	dingToken: 'abcd1234',
	ENCODING_AES_KEY: 'c6qlODY4SkxuN8MAzpozggkHVXY1Hgt2TQ91aEHvq4x'
};
