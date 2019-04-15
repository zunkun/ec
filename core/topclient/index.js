const config = require('../../config');

const TopClient = require('./topClient').TopClient;
var topClient = new TopClient({
	'appkey': config.appKey,
	'appsecret': config.appSecret,
	'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

module.exports = (api, rq) => {
	return new Promise((resolve, reject) => {
		topClient.execute(api, { rq }, function (error, response) {
			if (!error) {
				resolve(response);
				return;
			}
			reject(error);
		});
	});
};
