//Read configuration

//Get server version

var request = require('request');
var settings;

var exports = {};

doPost = function(subAddress, payload, expected, callback){
	var options = {
		url: "http://" + settings.address + subAddress,
		json: payload,
		headers: {
			'X-Api-Key':settings.apiKey
		}
	};

	request.post(options, function(error, response, body){
		if (response && response.statusCode == expected){
			callback(null, body);
		}
		else {
			callback(error, body);
		}
	});
}



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

exports.jog = jog = function(x, y, z, callback){
	var payload = {};
	payload["command"] = "jog";

	if (x) payload["x"] = x;
	if (y) payload["y"] = y;
	if (z) payload["z"] = z;

	console.log(payload);

	doPost("/api/printer/printhead", payload, 204, callback);
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
