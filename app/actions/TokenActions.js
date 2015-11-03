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
                if(token===null)
                    err=404;
                callback(err, token);
            });
        },

        showAll: function(params, callback) {
            Token.find({
                createUser: params.creator
            }, function(err, tokens){
                callback(err, tokens);
            });
        }


    }

};

module.exports = tokenActions;

