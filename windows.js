const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
	name: 'timeline',
	description: 'timeline',
	script: path.join(__dirname, './bin/www'),
	env: [{
		name: 'NODE_ENV',
		value: 'production'
	}, {
		PORT: 5800
	}]
});

svc.on('install', function () {
	console.log('時光程序启动');
	svc.start();
});

// svc.on('uninstall', function () {
// 	console.log('Uninstall complete.');
// 	console.log('The service exists: ', svc.exists);
// });

svc.install();
