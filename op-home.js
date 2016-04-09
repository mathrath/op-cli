var commander = require('commander');
commander
	.option('-x', 'home X axis')
	.option('-y', 'home Y axis')
	.option('-z', 'home Z axis')
	.option('-v, --verbose', 'Verbose output')
	.parse(process.argv);

if (!commander.X && !commander.Y && !commander.Z) {
	console.error("You must specify at least one axis to home");
	process.exit(1);
}

var octo = require("./octo")();

octo.home(commander.X, commander.Y, commander.Z, function(error, body){
	console.log("error: " + error);
	console.log("body: " + body);
});
