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

	if (!argv.server && !argv.api){
		questions.push(serverQuestion);
		questions.push(apiQuestion);
	}
	else {
		if (argv.server){
			address = argv.server;
		}

		if (argv.api){
			apiKey = argv.api;
		}
	}

	// Now ask for missing field(s)
	if (!questions.isEmpty){
		var inquirer = require('inquirer');

		inquirer.prompt(questions, function(answers) {
			var results = {}
			results["address"] = answers['address'] ? answers['address'] : address;
			results["apiKey"] = answers['apiKey'] ? answers['apiKey'] : apiKey;

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
