// No, this isn't the configuration file, this is the source of the 'config' command that
// allows you to make changes to the config file.

exports.command = 'config';

exports.describe = 'Set op-cli configuration options';

exports.builder = {
	'api':{
		alias:'a',
		desc:'API Key'
	},

	'server':{
		alias:'s',
		desc:'Server address'
	},

	'invert':{
		alias:'i',
		desc:'Invert jog motion',
		type:'array'
	},

	'uninvert':{
		alias:'u',
		desc:'Uninvert jog motion',
		type:'array'
	}
}

exports.handler = function (argv) {

	var settings = require('./settings')();

	var questions = [];
	var apiKey = settings.config.apiKey;
	var address = settings.config.address;

	var serverQuestion = {
		type: 'input',
		name: 'address',
		message: 'Octoprint server address'
	};

	var apiQuestion = {
		type: 'input',
		name: 'apiKey',
		message: 'Octoprint API Key'
	};

	if (!argv.server && !argv.api && !argv.invert){
		questions.push(serverQuestion);
		questions.push(apiQuestion);
	}
	else {
		if (argv.server){
			settings.config.address = argv.server;
		}

		if (argv.api){
			settings.config.apiKey = argv.api;
		}

		if (argv.invert){
			argv.invert.forEach(function(each){
				if (each == 'x') settings.config.invertX = true;
				if (each == 'y') settings.config.invertY = true;
				if (each == 'z') settings.config.invertZ = true;
			});
		}

		if (argv.uninvert){
			argv.uninvert.forEach(function(each){
				if (each == 'x') settings.config.invertX = false;
				if (each == 'y') settings.config.invertY = false;
				if (each == 'z') settings.config.invertZ = false;
			});
		}

	}

	// Now ask for missing field(s)
	if (!questions.isEmpty){
		var inquirer = require('inquirer');

		inquirer.prompt(questions, function(answers) {
			var results = {}
			settings.config.address = answers['address'] ? answers['address'] : address;
			settings.config.apiKey = answers['apiKey'] ? answers['apiKey'] : apiKey;

			settings.saveConfig(results);
		});
	}
	else {
		settings.saveConfig({
			'address':address,
			'apiKey':apiKey
		});
	}
}
