var mongoose = require('mongoose'),
    config = require('./config/config.json');


var db = mongoose.connect(config.mongo.uri, config.mongo.options);


var tokenActions = require('./app/actions/TokenActions').tokenActions;
var Router = require('./app/Router');
require('./app/models/Token');
var server = new Router({});

tokenActions.create({
    creator: 'pepe'
}, function(){
    console.log(arguments);
})


server.listen(3000)
