var router = require('./app/router');
var config = require('./config');
var server = router(config);

server.listen(3000);
