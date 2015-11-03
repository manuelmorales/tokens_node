var url = require('url');

module.exports = function(opts){
  var request = opts.request;

  var authUrl = opts.url;
  var env = getEnv(authUrl);
  var cookieKey = opts.cookieKey || (env + '_session_id');

  function authentication(req, res, next) {
    var cookies = appendCookie(
      req.headers.cookie, [cookieKey, req.query.sessionid]
    );

    verifyCurrentUser(req, cookies, {
      success: function(){
        next();
      },
      failure: function(){
        res.status(401);
        res.json({error: { message: 'Auth error' }});
        res.end();
      }
    });
  }

  function getEnv(authUrl) {
    return url.parse(authUrl).host.split('.')[0];
  }

  function appendCookie(cookies, elm){
    return [cookies, elm.join('='), ''].join('; ');
  }

  function verifyCurrentUser(req, session, opts){
    var requestOpts = { url: authUrl, headers: { 'Cookie': session } };
    
    request(requestOpts, function (error, response, body) {
      if(!error && response.statusCode === 200) {
        req.body.creator = JSON.parse(response.body).uuid;
        opts.success(response, body)
      } else {
        opts.failure(error);
      }
    });
  }

  return authentication;
};
