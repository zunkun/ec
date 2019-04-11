import mongoose from 'mongoose';

const config = require('../../config');

let db = mongoose.connect(config.mongodb.uri, { useNewUrlParser: true });

db.on('error', console.error.bind(console, '【失败】Mongodb连接错误:'));

db.once('open', function () {
	console.log('【成功】Mongodb 数据库被打开');
});
export default db;
