'use strict';

var TokensApi = function () {};

TokensApi.prototype = {
	createToken: function (req, res) {
		res.status(201).send();
	}
};

module.exports = TokensApi;
