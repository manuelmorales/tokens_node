var tokenActions = function(Token) {
    return {
        create : function(params, callback) {
            var token = new Token({
                createUser: params.creator,
                expiryDate: params.maxAge,
                type: params.type
            });
            token.save(function (err) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, token);
                }
            });
        },

        show: function(params, callback) {
            Token.findOne({
                uuid: params.uuid
            }, function(err, token){
                callback(err, token);
            });
        },

        showAll: function(params, callback) {
            Token.find({
                createUser: params.userUuid
            }, function(err, tokens){
                callback(err, tokens);
            });
        }


    }

};

module.exports = tokenActions;

