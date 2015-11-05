var healhtheck = function(req, res) {
	
	var cirrusState = 'healthy';
	var mongoState = 'healthy';
	var mongoose = require('mongoose');

	request(requestOpts, function(err, res, body) {
			if(res.status == 500 || err) {
				cirrusState = 'unhealthy';
			}
		});

    	mongoose.connection.db.admin().ping(function (err, result) {
      		if (err || !result)
        		mongoState = 'unhealthy'
		});
	
	if(mongoState === 'unhealthy' || cirrusState === 'unhealthy')
		res
			.status(500)
		    .send();
}

var healthcheckApi = function (opts) {
  
  this.healhtheck = healhtheck.bind(this);
  this.requestOpts = { url: opts.url };
  this.request = opts.request;
  
};

module.exports = TokensApi;