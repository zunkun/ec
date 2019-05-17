const dingding = require('../core/dingding');
const Roles = require('../models/Roles');
// const Staffs = require('../models/Staffs');
const config = require('../config');

class RoleServices {
	constructor () {
		this.year = new Date().getFullYear();
		this.roles = [];
	}
	async start () {
		this.year = new Date().getFullYear();
		await this.getRoleLists();
		await this.getRoleUsers();
	}

	async getRoleLists () {
		let roleGroups = await dingding.getCorpRoles();
		this.roles = [];
		for (let group of roleGroups) {
			for (let item of group.roles) {
				console.log(`【保存】角色 ${item.name}`);
				await Roles.updateOne({
					corpId: config.corpId,
					year: this.year,
					id: item.id
				}, {
					group: {
						id: group.id,
						name: group.name
					},
					id: item.id,
					name: item.name,
					corpId: config.corpId,
					year: this.year
				}, {
					upsert: true
				});

				this.roles.push({
					id: item.id,
					name: item.name
				});
			}
			console.log('【成功】保存角色人信息');
		}
	}

	async getRoleUsers () {
		for (let role of this.roles) {
			let userLists = await dingding.getCorpRoleUsers(role.id);
			let users = [];
			for (let item of userLists) {
				users.push({
					userId: item.userid,
					userName: item.name
				});
			}
			console.log(`【保存】角色 ${role.name}的人员列表`);
			await Roles.updateOne({ corpId: config.corpId, year: this.year, id: role.id }, { users });
		}
		console.log('【成功】保存角色人员列表成功');
	}
}

let roleService = new RoleServices();
module.exports = roleService;
