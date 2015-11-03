'use strict';

var createToken = function (req, res) {
	this.tokenActions.create(req.body, function (err, token) {
		if (err) {
			res.send(500);
		} else {
			console.log(JSON.stringify(req.body));
			res.header('Location', '/tokens/' + token.uuid);

			res
				.status(201)
				.send();
		}
	});
};

var show = function (req, res) {
	this.tokenActions.show(req.params, function(err,token) {
		if(err)
			res.sendStatus(404);
		else
			res
				.status(200)
				.send(token);
	})
};

var showAll = function (req, res) {
	this.tokenActions.showAll(req.params, function(err,token) {
		if(err)
			res.sendStatus(500);
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
	this.showAll = showAll.bind(this);
};

module.exports = TokensApi;
