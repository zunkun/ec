module.exports = {
	PORT: 5600,
	secret: 'haier-ec',
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
	agentid: '246364010',
	appkey: 'dingfhcnhe8fysmv3j57',
	appsecret: 'NsAxZZmo_7pEEKlHg4uT2FA77y7Br3_EozCoUq65mLY6BU3QH91Dz9d6caWNFLlH',
	deptCron: '0 0 6,12 * * *',
	btripCron: '0 0 7,12,18 * * *'
};
