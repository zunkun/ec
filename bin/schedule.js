#!/usr/bin/env node
require('console-stamp')(console, { pattern: 'yyyy-mm-dd\'T\'HH:MM:ss:l' });
require('../schedule/init');
require('../schedule/scheduleDepts');
require('../schedule/scheduleBtrip');
require('../schedule/budgetWarning');
