var express = require('express');
var TokensApi = require('./TokensApi');
var app = express();

var Router = function () {
	var tokensApi = new TokensApi();

	var init = function () {
		app.post('/tokens', tokensApi.createToken);

		return app;
	};

	return init();
};

module.exports = Router;
