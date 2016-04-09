exports.command = 'version';

exports.describe = 'Get Octoprint version information';

exports.builder = {}

exports.handler = function (argv) {
	var octo = require('./octo')();

	octo.getVersion(function(err, version){
		console.log(version);
	});
}
