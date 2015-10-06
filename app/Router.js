var express = require('express');
var TokensApi = require('./TokensApi');

var Router = function (opts) {
	var tokensApi = new TokensApi({repository: opts.repository});
	var app = express();

	app.post('/tokens', tokensApi.createToken.bind(tokensApi));

	return app;
};

module.exports = Router;
