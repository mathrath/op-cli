exports.command = 'jog';

exports.describe = 'Move extruder';

exports.builder = {
	'left': { 
		alias: 'l',
		requiresArg: true,
		type: 'number' 
	},
	'right': { 
		alias: 'r',
		requiresArg: true,
		type: 'number' 
	},

	'forward': { 
		alias: ['f', 'front'],
		requiresArg: true,
		type: 'number' 
	},
	'back': { 
		alias: 'b',
		requiresArg: true,
		type: 'number' 
	},

	'up': { 
		alias: 'u',
		requiresArg: true,
		type: 'number' 
	},
	'down': { 
		alias: 'd',
		requiresArg: true,
		type: 'number' 
	}

}


exports.handler = function (argv) {
	if (!argv.left && !argv.right && !argv.forward && !argv.back && !argv.up && !argv.down){
		console.error("You must specify at least one movement to make");
		process.exit(1);
	}

	if ((argv.left && argv.right) ||
		(argv.forward && argv.back) ||
		(argv.up && argv.down)){

		console.error("You specified multiple directions for one axis");
		process.exit(1);
	}

	var x;
	var y;
	var z;

	if (argv.right) x = argv.right;
	if (argv.left) x = argv.left * -1;
	if (argv.front) y = argv.front;
	if (argv.back) y = argv.back * -1;
	if (argv.up) z = argv.up;
	if (argv.down) z = argv.down * -1;

	var octo = require("./octo")();

	octo.jog(x, y, z, function(error, body){
		console.log("error: " + error);
		console.log("body: " + body);
	});
}
