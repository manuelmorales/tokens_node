var config = require('./config');
var Application = require('./application');
var application = new Application(config);

application.server().listen(config.configuration.port);
