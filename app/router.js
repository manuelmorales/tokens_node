var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var logStream = fs.createWriteStream(__dirname + '/morgan.log',{flags: 'a'});

var router = function (opts) {

  this.tokensApi = opts.tokensApi

  var app = express();

  app.use(bodyParser.json());

  if(opts.logger) { app.use(opts.logger("default", { stream: logStream })); }
  if(opts.swaggerMiddleware) { opts.swaggerMiddleware(app); }
  if(opts.authenticator) { app.use(opts.authenticator); }

  app.use( function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.post('/tokens', opts.createTokenValidator, this.tokensApi.createToken.bind(this.tokensApi));

  app.get('/ping', function(req,res){
    res.send('pong');
  });

  app.get('/tokens/:uuid', this.tokensApi.show.bind(this.tokensApi));
  app.delete('/tokens/:uuid', this.tokensApi.destroy.bind(this.tokensApi));

  app.get('/tokens/', this.tokensApi.showAll.bind(this.tokensApi));

  return app;
};

module.exports = router;
