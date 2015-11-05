var date = new Date();

var tokenActions = function(Token) {
  return {
    create : function(params, callback) {
      var token = new Token({
        createUser: params.creator,
        content:    params.content,
        expiryDate: date.setDate(new Date().getDate() + params.maxAge),
        type: params.type
      });
      token.save(function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, token);
        }
      });
      date = new Date();
    },

    show: function(params, callback) {
      Token.findOne({ uuid: params.uuid }, function(err, token){
        callback(err, token);
      });
    },

    showAll: function(params, callback) {
      Token.find({
        createUser: params.creator
      }, function(err, tokens){
        callback(err, tokens);
      });
    },

    destroy: function(params, callback) {
      Token.findOneAndRemove({ uuid: params.uuid }, {passRawResult: true}, callback);
    }
  }

};

module.exports = tokenActions;

