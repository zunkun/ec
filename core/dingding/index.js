
const rp = require('request-promise');
const config = require('../../config');

class Dingding {
	constructor () {
		this.token = {};
	}

	async getAccessToken () {
		if (!this.token.expires || this.token.expires < Date.now() + 20 * 60 * 1000) {
			let data = await rp.get(`${config.dingBaseUri}/gettoken?appkey=${config.appkey}&appsecret=${config.appsecret}`, { json: true });
			if (!data || data.errcode !== 0) {
				throw data;
			}
			this.token = {
				access_token: data.access_token,
				expires: Date.now() + 7200 * 1000
			};
			return data.access_token;
		} else {
			return this.token.access_token;
		}
	}

	async getDeptLists (id = 1, fetch_child = true) {
		const accessToken = await this.getAccessToken();
		let uri = `${config.dingBaseUri}/department/list`;
		console.log(id, fetch_child, uri, accessToken);
		let data = await rp.get(uri, {
			qs: {
				id,
				fetch_child,
				access_token: await this.getAccessToken()
			},
			json: true
		});
		console.log({ data });
		if (data.errcode === 0) {
			return data.department;
		} else {
			return [];
		}
	}
}

const dingding = new Dingding();

module.exports = dingding;
