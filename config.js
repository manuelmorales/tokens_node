
var fs = require('fs');
var configurationFile = './config/application-defaults.json';
var configuration = JSON.parse(fs.readFileSync(configurationFile));

var Token = require('./app/models/Token');
var TokenActions = require('./app/actions/TokenActions')(Token);
var createTokenValidator = require('./app/createTokenValidator');
var TokensApi = require('./app/TokensApi');
var mongoose = require('mongoose')
var logger = require('morgan');

var router = require('./app/router');
var swaggerMiddleware = require('./app/swaggerMiddleware')({ overrides: __dirname + '/swagger-ui/' });

var authenticator = require('./app/authenticator')({
	url: configuration.cirrus.url+'current_user.json',
	request: require('request')
});

var healthcheck = require('./app/healthcheck')({
	url: configuration.cirrus.url+'is_alive',
	request: require('request'),
});

var tokensApi = new TokensApi({tokenActions: TokenActions});

module.exports = {
	tokensApi: tokensApi,
	authenticator: authenticator,
	createTokenValidator: createTokenValidator,
	mongoose: mongoose,
	configFile: require(configurationFile),
	router: router,
	swaggerMiddleware: swaggerMiddleware,
	logger: logger,
	healthcheck: healthcheck
};
