var Token = require('./app/models/Token');
var TokenActions = require('./app/actions/TokenActions')(Token);
var TokensApi = require('./app/TokensApi');
var mongoose = require('mongoose')
var configFile = require('./config/config.json');
var router = require('./app/router');
var swaggerMiddleware = require('./app/swaggerMiddleware')({ overrides: __dirname + '/swagger-ui/' });

var tokensApi = new TokensApi({tokenActions: TokenActions});
var authenticator = require('./app/authenticator')({
	url: 'http://qa.workshare.com/current_user.json',
	request: require('request')
});

module.exports = {
	tokensApi: tokensApi,
	authenticator: authenticator,
	createTokenValidator: require('./app/createTokenValidator'),
	mongoose: mongoose,
	configFile: configFile,
	router: router,
	swaggerMiddleware: swaggerMiddleware
};
