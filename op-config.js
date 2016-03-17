// No, this isn't the configuration file, this is the source of the 'config' command that
// allows you to make changes to the config file.

const CONFIG_FILE = require('untildify')('~/.config/op-cli/op-cli.cfg');

var commander = require('commander');
commander
	.option('-a, --api [apiKey]', 'API Key')
	.option('-s, --server [address]', 'Server address')
	.option('-v, --verbose', 'Verbose output')
	.parse(process.argv);

var questions = [];
var apiKey;
var address;

// Server address
if (commander.server) {
	address = commander.server;
}
else {
	questions.push(
	{
		type: 'input',
		name: 'address',
		message: 'Octoprint server address'
	});
}

// Server API Key
if (commander.api) {
	apiKey = commander.api;
}
else {
	questions.push(
	{
		type: 'input',
		name: 'apiKey',
		message: 'Octoprint API Key'
	});
}

// Now ask for missing field(s)
if (!questions.isEmpty){
	var inquirer = require('inquirer');

	inquirer.prompt(questions, function(answers) {
		var results = {}
		results["address"] = address ? address : answers['address'];
		results["apiKey"] = apiKey ? apiKey : answers['apiKey'];
		checkAndSaveConfig(results);
	});
}
else {
	checkAndSaveConfig({
		'address':address,
		'apiKey':apiKey
	});
}


// And this is what we do with that information when we get it`
function checkAndSaveConfig(config){

	//TODO Check server connection

	var jsonfile = require('jsonfile');
	var fs = require('fs');
	var path = require('path');
	var mkdirp = require('mkdirp');

	mkdirp(path.dirname(CONFIG_FILE), function (err) {
		if (err) {
			console.err('Unable to create configuration folder');
		}
		else {
			jsonfile.writeFile(CONFIG_FILE, config, function(err){
				if (err){
					console.error(err);
				}
				else {
					console.log('Configuration saved: ' + JSON.stringify(config))
				}
			});
		}
	});
}

