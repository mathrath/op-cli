var commander = require('commander');

commander
	.option('-v, --verbose', 'Verbose output')
	.parse(process.argv);

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
