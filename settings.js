const CONFIG_FILE = require('untildify')('~/.config/op-cli/op-cli.cfg');

var jsonfile = require('jsonfile');

var apiKey;
var address;

var invertX = false;
var invertY = false;
var invertZ = false;

var exports = {};

var saveConfig = exports.saveConfig = module.exports.saveConfig = function() {

	var path = require('path');
	var mkdirp = require('mkdirp');

	mkdirp(path.dirname(CONFIG_FILE), function (err) {
		if (err) {
			console.err('Unable to create configuration folder');
		}
		else {
			jsonfile.writeFile(CONFIG_FILE, exports.config, function(err){
				if (err){
					console.error(err);
				}
				else {
					console.log('Configuration saved: ' + JSON.stringify(exports.config));
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
		exports.invertX = (exports.config.invertX ? exports.config.invertX : false);
		exports.invertY = (exports.config.invertY ? exports.config.invertY : false);
		exports.invertZ = (exports.config.invertZ ? exports.config.invertZ : false);
	}

	return exports;
}


