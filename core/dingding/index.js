
const rp = require('request-promise');
const config = require('../../config');
const util = require('../../util');
class Dingding {
	constructor () {
		this.token = {};
	}

	/**
	 * 获取access_token
	 */
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

	/**
	 * 获取子部门列表
	 * @param {Number} id 根部门id
	 * @param {Boolean} fetch_child 是否遍历所有子部门
	 */
	async getDeptLists (options = { id: 1, fetch_child: false }) {
		let uri = `${config.dingBaseUri}/department/list`;
		let data = await rp.get(uri, {
			qs: {
				id: options.id || 1,
				fetch_child: options.fetch_child,
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

	/**
	 *获取部门人员列表
	 * @param {Number} deptId 部门id
	 */
	async getDeptUsers (deptId) {
		// https://oapi.dingtalk.com/user/simplelist?access_token=ACCESS_TOKEN&department_id=1
		let accessToken = await this.getAccessToken();
		let uri = `${config.dingBaseUri}/user/simplelist`;
		let options = {
			uri,
			method: 'GET',
			qs: {
				access_token: accessToken,
				department_id: deptId,
				size: 100
			},
			json: true
		};
		let userLists = await this.getUserLists([], options);
		return userLists;
	}

	async getUserLists (userLists = [], options, offset = 0) {
		options.qs.offset = offset;
		offset += 1;
		let data = await rp(options);

		if (data.errcode === 0) {
			userLists = userLists.concat(data.userlist || []);
			if (!data.hasMore) {
				return userLists;
			}
			await util.wait(200);
			return this.getUserLists(userLists, options, offset);
		} else {
			return userLists;
		}
	}

	async btrip (queryPath, rq) {
		let accessToken = await this.getAccessToken();
		let uri = `${config.topBaseUri}${queryPath}?access_token=${accessToken}`;
		let data = await rp({
			uri,
			method: 'POST',
			body: { rq },
			json: true
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
