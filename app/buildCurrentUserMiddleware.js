module.exports = function (opts) {
  var getCurrentUser = opts.getCurrentUser;

  return function (req, res, next) {
    req.currentUser = getCurrentUser(req);
    next();
  }
}
