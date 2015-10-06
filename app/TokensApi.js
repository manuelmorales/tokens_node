'use strict';

var createToken = function (req, res) {
	this.repository.create();
	res.status(201).send();
}

var TokensApi = function (opts) {
	this.repository = opts.repository;
	this.createToken = createToken.bind(this);
};

module.exports = TokensApi;
