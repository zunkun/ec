// Using a fixed Oracle time zone helps avoid machine and deployment differences
const oracledb = require('oracledb');
const config = require('../../config');

class Oracle {
	constructor () {
		this.connection = null;
	}
	async getConnection () {
		if (this.connection) {
			return this.connection;
		}
		try {
			this.connection = oracledb.getConnection({
				user: config.oracle.user,
				password: config.oracle.password,
				connectString: config.oracle.connectString
			});
			console.log('【成功】oracle连接成功');
			return this.connection;
		} catch (error) {
			console.log('【失败】oracle 连接失败', error);
			return Promise.reject(error);
		}
	}

	async execute (sql, bindParams) {
		try {
			let connection = await this.getConnection();
			let data = await connection.execute(sql);
			return data;
		} catch (error) {
			return Promise.reject(error);
		}
	}
}

const oracle = new Oracle();

module.exports = oracle;
