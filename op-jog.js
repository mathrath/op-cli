var commander = require('commander');
commander
	.option('-x <x>', 'mm to move in X axis')
	.option('-y <y>', 'mm to move in Y axis')
	.option('-z <z>', 'mm to move in Z axis')
	.option('-v, --verbose', 'Verbose output')
	.parse(process.argv);

if (!commander.X && !commander.Y && !commander.Z){
	console.error("You must specify at least one axis of movement");
	process.exit(1);
}

var octo = require("./octo")();

octo.jog(commander.X, commander.Y, commander.Z, function(error, body){
	console.log("error: " + error);
	console.log("body: " + body);
});
