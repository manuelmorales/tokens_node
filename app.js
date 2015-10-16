var config = require('./config');
var Application = require('./application');
var application = new Application(config);

application.start().listen(3000);
