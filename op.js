#!/usr/bin/env node

var commander = require('commander');

commander
	.version('0.0.1')
	.command('config', 'Change Octoprint connection settings')
	.parse(process.argv);



