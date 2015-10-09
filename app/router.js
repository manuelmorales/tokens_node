var express = require('express');
var bodyParser = require('body-parser');
var TokensApi = require('./TokensApi');
var authenticator = require('./authenticator');

var router = function (opts) {
	var tokensApi = new TokensApi({repository: opts.repository});
	var app = express();
  var authentication = authenticator({
    url: opts.authentication.url,
    request: opts.request
  });

	app.use(bodyParser.json());
  app.use(authentication);
	app.post('/tokens', tokensApi.createToken.bind(tokensApi));

	return app;
};

module.exports = router;
