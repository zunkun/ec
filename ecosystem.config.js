module.exports = {
	apps: [ {
		name: 'EC',
		script: 'bin/www.js',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '2G',
		env_production: {
			PORT: 5600,
			name: 'EC_PRODUCTION',
			NODE_ENV: 'production'
		}
	}, {
		name: 'EC_SCHEDULE',
		script: 'bin/schedule.js',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '2G',
		env_production: {
			PORT: 5602,
			name: 'SCHEDULE_PRODUCTION',
			NODE_ENV: 'production'
		}
	} ]
};
