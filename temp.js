var unit = "°C";
var octo = require("./octo")();

exports.command = 'temp';

exports.describe = 'Get or set temperatures';

exports.builder = {
	"list":{
		alias:["l", "p", "print"]
	},
	
	"bed":{
		alias:"b"
	}
}

exports.handler = function (argv) {

	if (argv.list){
		listTemps();
	}
	if (argv.bed || argv.bed == 0){
		var newBedTemp = argv.bed;

		octo.setBedTemp(newBedTemp, function(err, body){
			console.log("body: " + body);
			console.log("error: " + err);
		});
	}
	else {
		listTemps();
	}

}

function listTemps(){

	octo.getBedTemp(function(bedTemp){

		console.log("bed: " + bedTemp.actual + unit + " / " + bedTemp.target + unit);

		octo.getToolTemps(function(toolTemps){
			Object.keys(toolTemps).forEach(function(each){
				console.log(each + ": " + toolTemps[each].actual + unit + " / " + toolTemps[each].target + unit);
			});
		});
	});
}

