#!/usr/bin/env node
require('console-stamp')(console, { pattern: 'yyyy-mm-dd\'T\'HH:MM:ss:l' });
require('../schedule/init');
require('../scheule/scheduleDepts');
require('../scheule/scheduleBtrip');
require('../scheule/budgetWarning');
