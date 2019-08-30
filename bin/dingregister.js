const dingding = require('../core/dingding');
const rp = require('request-promise');
const config = require('../config');

async function register () {
	let accessToken = await dingding.getAccessToken();

	let url = 'http://zk.vaiwan.com/api/dingtalk/callback';
	const body = {
		call_back_tag: [ 'bpms_instance_change' ],
		token: config.dingToken,
		aes_key: config.ENCODING_AES_KEY,
		url
	};

	rp({
		uri: `https://oapi.dingtalk.com/call_back/register_call_back?access_token=${accessToken}`,
		method: 'POST',
		body,
		json: true
	}).then(res => {
		console.log({ res });
	}).catch(error => {
		console.log({ error });
	});
}

register().then();
