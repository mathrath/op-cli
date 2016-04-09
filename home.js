exports.command = 'home';

exports.describe = 'Home axes';

exports.builder = {
	'x': { type: 'boolean' },
	'y': { type: 'boolean' },
	'z': { type: 'boolean' },
}

exports.handler = function (argv) {
	if (!argv.x && !argv.y && !argv.z){
		console.error("You must specify at least one axis to home");
		process.exit(1);
	}

	var octo = require("./octo")();

	octo.home(argv.x, argv.y, argv.z, function(error, body){
		console.log("error: " + error);
		console.log("body: " + body);
	});
};
