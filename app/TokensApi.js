'use strict';

var createToken = function (req, res) {
	var token = this.repository.create(req.body);

	res.header('Location', '/tokens/' + token.id);

	res
		.status(201)
		.send();
}

var TokensApi = function (opts) {
	this.repository = opts.repository;
	this.createToken = createToken.bind(this);
};

module.exports = TokensApi;
