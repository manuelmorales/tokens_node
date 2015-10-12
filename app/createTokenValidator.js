var validator = function (req, res, next) {
	if (!req.body.content) { res.sendStatus(422); res.end(); }
	if (!req.body.type) { res.sendStatus(422); res.end(); }
	if (typeof(req.body.maxAge) != 'number') { res.sendStatus(422); res.end(); }
	next();
}

module.exports = validator;
