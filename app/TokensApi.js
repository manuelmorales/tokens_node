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

var show = function (req, res) {
	console.log('[API] New request: ' + JSON.stringify(req.params));
	this.tokenActions.show(req.params.uuid, function(err,token) {
		if(err)
			res.send(404);
		else
			res
				.status(200)
				.send(token);
	})
};

var TokensApi = function (opts) {
	this.tokenActions = opts.tokenActions;
	this.createToken = createToken.bind(this);
	this.show = show.bind(this);
};

module.exports = TokensApi;
