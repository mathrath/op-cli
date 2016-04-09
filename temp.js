exports.command = 'temp [set] [what] [temp]';

exports.describe = 'Get or set temperatures';

exports.builder = {}

exports.handler = function (argv) {

	var unit = "°C";

	var octo = require("./octo")();

	octo.getBedTemp(function(bedTemp){

		console.log("bed: " + bedTemp.actual + unit + " / " + bedTemp.target + unit);

		octo.getToolTemps(function(toolTemps){
			Object.keys(toolTemps).forEach(function(each){
				console.log(each + ": " + toolTemps[each].actual + unit + " / " + toolTemps[each].target + unit);
			});
		});
	});
}

