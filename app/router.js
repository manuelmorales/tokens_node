var express = require('express');
var bodyParser = require('body-parser');

var router = function (opts) {

  this.tokensApi = opts.tokensApi

  var app = express();

  app.use(bodyParser.json());

  if(opts.swaggerMiddleware) { opts.swaggerMiddleware(app); }
  if(opts.authenticator) { app.use(opts.authenticator); }

  app.post('/tokens', opts.createTokenValidator, this.tokensApi.createToken.bind(this.tokensApi));

  app.get('/ping', function(req,res){
    res.send('pong');
  });

  app.get('/tokens/:uuid',this.tokensApi.show.bind(this.tokensApi));

  return app;
};

module.exports = router;
