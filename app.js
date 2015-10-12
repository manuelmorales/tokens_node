var router = require('./app/router');
var config = require('./config');
var TokenActions = require('./app/actions/TokenActions');
var TokensApi = require('./app/TokensApi');

var tokensApi = new TokensApi({tokenActions: TokenActions});
var server = router({tokensApi: tokensApi, config: config});

var mongoose = require('mongoose'),
    config_file = require('./config/config.json');


var db = mongoose.connect(config_file.mongo.uri, config_file.mongo.options);


var tokenActions = require('./app/actions/TokenActions').tokenActions;

server.listen(3000);
