var express = require('express');
var bodyParser = require('body-parser');
var TokensApi = require('./TokensApi');

var router = function (opts) {
	var tokensApi = new TokensApi({repository: opts.repository});
	var app = express();

	app.use(bodyParser.json());

  if(opts.authenticator) app.use(opts.authenticator);

  app.post('/tokens', opts.createTokenValidator, tokensApi.createToken.bind(tokensApi));

	return app;
};

module.exports = router;
