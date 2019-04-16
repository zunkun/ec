
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
		let uri = `${config.dingBaseUri}/department/list`;
		let data = await rp.get(uri, {
			qs: {
				id,
				fetch_child,
				access_token: await this.getAccessToken()
			},
			json: true
		});
		if (data.errcode === 0) {
			return data.department;
		} else {
			return [];
		}
	}

	async btrip (queryPath, rq) {
		let uri = `${config.dingBaseUri}${queryPath}`;
		let data = await rp({
			uri,
			method: 'POST',
			qs: { access_token: await this.getAccessToken() },
			body: { rq }
		});
		return data;
	}

	async postBtrip (queryPath, body) {
		let uri = `${config.dingBaseUri}${queryPath}`;
		let data = await rp.post(uri, {
			formData: JSON.stringify(body),
			json: true
		});
		return data;
	}
}

const dingding = new Dingding();

module.exports = dingding;
