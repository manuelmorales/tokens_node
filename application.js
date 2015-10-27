var Application = function (config) {
	var mongoose = config.mongoose;
	var tokensApi = config.tokensApi;
	var authenticator = config.authenticator;
	var createTokenValidator = config.createTokenValidator;
	var configFile = config.configFile;
	var router = config.router;
	var swaggerMiddleware = config.swaggerMiddleware;

	this.server = function () { 
		mongoose.connect(configFile.mongo.uri, configFile.mongo.options);

		return router({
			swaggerMiddleware: swaggerMiddleware,
			tokensApi: tokensApi,
			authenticator: authenticator,
			createTokenValidator: createTokenValidator
		});
	};

	this.stop = function() {
		mongoose.disconnect();
	};
};

module.exports = Application;
