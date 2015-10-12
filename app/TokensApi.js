'use strict';

var createToken = function (req, res) {
	console.log('createToken', this.tokenActions);

	var token = this.tokenActions.create(req.body);

	res.header('Location', '/tokens/' + token.id);

	res
		.status(201)
		.send();
}

var TokensApi = function (opts) {
	this.tokenActions = opts.tokenActions;
	this.createToken = createToken.bind(this);
};

module.exports = TokensApi;
