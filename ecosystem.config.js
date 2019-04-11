module.exports = {
	apps: [ {
		name: 'HAIER_EC_DEV',
		script: 'bin/www',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '4G',
		env_production: {
			PORT_MAIN: 4600,
			NODE_ENV: 'development'
		}
	}, {
		name: 'HAIER_EC_PROD',
		script: 'bin/www',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '4G',
		env_production: {
			PORT_MAIN: 4800,
			NODE_ENV: 'production'
		}
	} ]
};
