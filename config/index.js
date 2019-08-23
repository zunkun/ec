let config = process.env.NODE_ENV === 'production' ? require('../config/production') : require('../config/development');
if (process.env.NODE_ENV === 'haier2') {
	config = require('../config/haier2');
}

module.exports = config;
