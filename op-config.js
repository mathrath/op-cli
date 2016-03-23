// No, this isn't the configuration file, this is the source of the 'config' command that
// allows you to make changes to the config file.

var commander = require('commander');
commander
	.option('-a, --api [apiKey]', 'API Key')
	.option('-s, --server [address]', 'Server address')
	.option('-v, --verbose', 'Verbose output')
	.parse(process.argv);

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

if (!commander.server && !commander.api){
	questions.push(serverQuestion);
	questions.push(apiQuestion);
}
else {
	if (commander.server){
		address = commander.server;
	}

	if (commander.api){
		apiKey = commander.api;
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
