module.exports = function (opts) {
  var authUrl = opts.host + '/api/v1.4/current_user.json'
  var request = opts.request;


  return function (req) {

    var result;

    request({authUrl}, function (err, res, body) {
      if (res.statusCode == 200) {
        result = {a: 'b'};
      } else {
        result = undefined;
      }
    });

    return result;
  }
}
