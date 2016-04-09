#!/usr/bin/env node

var argv = require('yargs')
	.command(require('./config'))
	.command(require('./version'))
	.command(require('./jog'))
	.command(require('./home'))
	.command(require('./temp'))
	.demand(1)
	.argv;

