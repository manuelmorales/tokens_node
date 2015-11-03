
var fs = require('fs');
var configurationFile = './config/config.json';
var configuration = JSON.parse(fs.readFileSync(configurationFile));

var Token = require('./app/models/Token');
var TokenActions = require('./app/actions/TokenActions')(Token);
var TokensApi = require('./app/TokensApi');
var mongoose = require('mongoose')
var configFile = require('./config/config.json');
var router = require('./app/router');
var swaggerMiddleware = require('./app/swaggerMiddleware')({ overrides: __dirname + '/swagger-ui/' });

var authenticator = require('./app/authenticator')({
	url: configuration.cirrus.url,
	request: require('request')
});

var tokensApi = new TokensApi({tokenActions: TokenActions});

module.exports = {
	tokensApi: tokensApi,
	authenticator: authenticator,
	createTokenValidator: require('./app/createTokenValidator'),
	mongoose: mongoose,
	configFile: configFile,
	router: router,
	swaggerMiddleware: swaggerMiddleware
};
