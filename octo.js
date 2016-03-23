//Read configuration

//Get server version

var request = require('request');
var settings;

var exports = {};

exports.getVersion = getVersion = function(callback){
	
	var options = {
		url: "http://" + settings.address + "/api/version",
		headers: {
			'X-Api-Key':settings.apiKey
		}
	}

	request(options, function(error, response, body){
		if (response && response.statusCode == 200){
			callback(null, body)
		}
		else {
			callback(error, null);
		}
	});
}

module.exports = function (s) {
	if (s) {
		settings = s;
	}
	else {
		settings = require('./settings')();
	}

	return exports;
};
