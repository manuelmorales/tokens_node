module.exports = function (opts) {
	var authUrl = opts.host + '/api/v1.4/current_user.json'
	var request = opts.request;

   	return function (req) {
		// var cookie = req.headers.cookie
		// var requestOpts = { url: authUrl, headers: { 'Cookie': cookie } };

		// request(requestOpts, function (error, response, body) {
		// 	if(!error && response.statusCode === 200) {
		// 		user = JSON.parse(response.body)
		// 		return {uuid: user.uuid}
		// 	} else {
		// 		return undefined
		// 	}
		// });
		
		var result;

		request({}, function (err, res, body) {
			if (res.statusCode == 200) {
				result = {a: 'b'};
			} else {
				result = undefined;
			}
		});

		return result;
	}
}
