module.exports = function(opts){
    var request = require('request');

    var url = opts.url;

    var authentication = function(req, res, next) {
        var cookies = req.headers.cookie;

        verifyCurrentUser(cookies, {
            success: function(){
                next();
            },
            failure: function(){
                res.status(401);
                res.json({error: { message: 'Auth error' }});
                res.end();
            }
        );
    };

    var verifyCurrentUser = function(session, opts){
        request(url, function (error, response, body) {
          (!error && response.statusCode == 200) ? opts.success(response) : opts.failure(error);
        });
    };

    return authentication;
};
