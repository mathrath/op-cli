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

doGet = function(subAddress, expected, callback){
	var options = {
		url: "http://" + settings.address + subAddress,
		headers: {
			'X-Api-Key':settings.apiKey
		}
	};

	request.get(options, function(error, response, body){
		if (response && response.statusCode == expected){
			callback(null, body);
		}
		else {
			callback(error, null);
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

exports.home = home = function(x, y, z, callback){
	var payload = {};
	var axes = [];

	if (x) axes.push("x");
	if (y) axes.push("y");
	if (z) axes.push("z");

	payload["command"] = "home";
	payload["axes"] = axes;

	doPost("/api/printer/printhead", payload, 204, callback);
}

exports.getBedTemp = getBedTemp = function(callback){
	doGet("/api/printer/bed", 200, function(err, body){
		if (err) {
			console.log("err: " + err);
			process.exit(1);
		}

		var obj = JSON.parse(body);
		var actualTemp = obj.bed.actual;
		var targetTemp = obj.bed.target;

		if ((actualTemp != 0 && !actualTemp) || (targetTemp != 0 && !targetTemp)) {
			console.log("Unexpected response from server: " + body);
			process.exit(1);
		}
		else {
			callback({actual:actualTemp, target:targetTemp});
		}
	});
}

exports.getToolTemps = getToolTemps = function(callback){
	doGet("/api/printer/tool", 200, function(err, body){
		if (err){
			console.log("err: " + err);
			process.exit(1);
		}

		obj = JSON.parse(body);
		var result = {};

		Object.keys(obj).forEach(function (each) {
			if (each.startsWith("tool")) {

				var actualTemp = obj[each].actual;
				var targetTemp = obj[each].target;

				if ((actualTemp != 0 && !actualTemp) || (targetTemp != 0 && !targetTemp)) {
					console.log("Unexpected response from server: " + body);
					process.exit(1);
				}
				else {
					result[each] = {actual:actualTemp, target:targetTemp};
				}
			}
		});

		callback(result);

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
