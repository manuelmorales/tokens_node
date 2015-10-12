var TokenActions = require('./app/actions/TokenActions');
var TokensApi = require('./app/TokensApi');
var mongoose = require('mongoose')
var config_file = require('./config/config.json');
var tokenActions = require('./app/actions/TokenActions').tokenActions;
var router = require('./app/router');

var db = mongoose.connect(config_file.mongo.uri, config_file.mongo.options);
var tokensApi = new TokensApi({tokenActions: TokenActions});
var authenticator = require('./app/authenticator')({
	url: 'http://qa.workshare.com/current_user.json',
	request: require('request')
})


var server = router({
	tokensApi: tokensApi,
	authenticator: authenticator,
	createTokenValidator: require('./app/createTokenValidator')
});

module.exports = {
  server: function () { return server },
}
