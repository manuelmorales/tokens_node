var express = require('express');
var bodyParser = require('body-parser');
//var TokensApi = require('./TokensApi');
var authenticator = require('./authenticator');
var authenticationUrl = 'http://qa.workshare.com/current_user.json';

var router = function (opts) {
	//var tokensApi = new TokensApi({repository: opts.repository});
	var app = express();

	app.use(bodyParser.json());
  app.use(authenticator({url: authenticationUrl}));
	//app.post('/tokens', tokensApi.createToken.bind(tokensApi));

	return app;
};

module.exports = router;
