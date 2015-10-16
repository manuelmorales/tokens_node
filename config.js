var Token = require('./app/models/Token');
var TokenActions = require('./app/actions/TokenActions')(Token);
var TokensApi = require('./app/TokensApi');
var mongoose = require('mongoose')
var config_file = require('./config/config.json');
var router = require('./app/router');
var swaggerMiddleware = require('./app/swaggerMiddleware')({ overrides: __dirname + '/swagger-ui/' });

var tokensApi = new TokensApi({tokenActions: TokenActions});
var authenticator = require('./app/authenticator')({
	url: 'http://qa.workshare.com/current_user.json',
	request: require('request')
});

module.exports = {
	server: function () { 
		mongoose.connect(config_file.mongo.uri, config_file.mongo.options);

		return router({
			tokensApi: tokensApi,
			authenticator: authenticator,
			createTokenValidator: require('./app/createTokenValidator')
		});
	},

	stop: function() {
		mongoose.disconnect();
	}
};
