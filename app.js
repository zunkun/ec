'use strict';

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const fs = require('fs');
const path = require('path');

// middlewares
app.use(bodyparser({
	enableTypes: [ 'json', 'form', 'text' ]
}));
app.use(json());

// Sessions
app.keys = [ 'haier', 'ec' ];
app.use(session({}, app));

// 请求出错日志
app.on('error', function (err) {
	console.error(err);
});

app.use(require('koa-static')(path.join(__dirname, '/public')));

let files = fs.readdirSync('./routes');
files.map(item => {
	const router = require(`./routes/${item.substr(0, item.indexOf('.'))}`);
	app.use(router.routes());
});

module.exports = app;
