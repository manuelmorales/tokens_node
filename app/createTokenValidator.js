var validator = function (req, res, next) {
	if (req.body.content) {
		next();
	} else {
		res.sendStatus(422);
	}
}

module.exports = validator;
