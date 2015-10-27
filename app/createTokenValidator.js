var validator = function (req, res, next) {
	var errors = [];

	console.log("[Token Validator], request: " + JSON.stringify(req.body.content));

	if (!req.body.content) {
	   	errors.push({message: 'content is a mandatory attribute'});
   	}

	if (!req.body.type) {
	   	errors.push({message: 'type is a mandatory attribute' });
	}

	if (typeof(req.body.maxAge) !== 'number') {
	   	errors.push({message: 'maxAge must be an integer' });
	}

	if (errors.length > 0) {
		res.status(422);
		res.send({errors: errors});
	} else {
		next();
	}
}

module.exports = validator;
