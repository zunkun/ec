#!/usr/bin/env node
require('console-stamp')(console, { pattern: 'yyyy-mm-dd\'T\'HH:MM:ss:l' });
require('../services/scheduleDepts');
require('../services/scheduleBtrip');
