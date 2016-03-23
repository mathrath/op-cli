var octo = require('./octo')();

octo.getVersion(function(err, version){
	console.log(version);
});
