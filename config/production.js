module.exports = {
	PORT: 5600,
	secret: 'haier-ec',
	mongodb: {
		uri: 'mongodb://127.0.0.1:27017/haier',
		user: 'haier',
		pass: 'abcd1234'
	},
	baseDeptId: 1,
	baseDeptName: '上海铭悦软件有限公司',
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
