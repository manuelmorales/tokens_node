module.exports = function(opts){
  var swaggerUiMiddleware = require('swagger-ui-middleware');

  return function(app){
    swaggerUiMiddleware.hostUI(app, opts);
  };
};
