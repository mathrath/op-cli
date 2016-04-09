exports.command = 'jog';

exports.describe = 'Move extruder';

exports.builder = {
	'x': { type: 'number' },
	'y': { type: 'number' },
	'z': { type: 'number' },
}


exports.handler = function (argv) {
	if (!argv.x && !argv.y && !argv.z){
		console.error("You must specify at least one axis of movement");
		process.exit(1);
	}

	var octo = require("./octo")();

	octo.jog(argv.x, argv.y, argv.z, function(error, body){
		console.log("error: " + error);
		console.log("body: " + body);
	});
}
