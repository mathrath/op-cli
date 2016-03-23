#!/usr/bin/env node

var commander = require('commander');

commander
	.command('config', 'Change Octoprint connection settings')
	.command('version', 'Get Octoprint version information')
	.command('jog', 'Move extruder around')
	.parse(process.argv);



