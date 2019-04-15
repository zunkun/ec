// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const config = require('../../config');

let db = mongoose.createConnection(config.mongodb.uri, { user: config.mongodb.user, pass: config.mongodb.pass, useNewUrlParser: true });

db.on('error', console.error.bind(console, '【失败】Mongodb连接错误:'));

db.once('open', function () {
	console.log('【成功】Mongodb 数据库被打开');
});

module.exports = db;
