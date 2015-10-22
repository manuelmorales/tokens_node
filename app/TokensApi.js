'use strict';

var createToken = function (req, res) {
	this.tokenActions.create(req.body, function (err, token) {
		if (err) {
			res.send(500);
		} else {
			res.header('Location', '/tokens/' + token.uuid);

			res
				.status(201)
				.send();
		}
	});
};

var TokensApi = function (opts) {
	this.tokenActions = opts.tokenActions;
	this.createToken = createToken.bind(this);
};

module.exports = TokensApi;
