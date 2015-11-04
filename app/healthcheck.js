module.exports  = function (opts) {
	var requestOpts = { url: opts.url };
	var request = opts.request;
	var cirrusState = 'healthy';
	var mongoState = 'healthy';
	var mongoose = require('mongoose');

	function checkHealth (req, res, next) {  
		request(requestOpts, function(err, res, body) {
			if(res.status == 500 || err) {
				cirrusState = 'unhealthy';
			}
		});

    	mongoose.connection.db.admin().ping(function (err, result) {
      		if (err || !result)
        		mongoState = 'unhealthy'
		});
		next();
	}

	return checkHealth;
};