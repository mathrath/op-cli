const CONFIG_FILE = require('untildify')('~/.config/op-cli/op-cli.cfg');

var jsonfile = require('jsonfile');

var apiKey;
var address;

var exports = {};

var saveConfig = exports.saveConfig = module.exports.saveConfig = function(config) {

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
					console.log('Configuration saved: ' + JSON.stringify(config));
				}
			});
		}
	});
}

var readConfig = exports.readConfig = module.exports.readConfig = function() {
	var config = jsonfile.readFileSync(CONFIG_FILE);

	return config
}


module.exports = function(){
	exports.config = readConfig();
	
	if (exports.config) {
		exports.apiKey = exports.config.apiKey;
		exports.address = exports.config.address;
	}

	return exports;
}


