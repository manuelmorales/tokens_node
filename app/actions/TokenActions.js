var Token = require('../models/Token');


var tokenActions = {
    create : function(params, callback) {
        var token = new Token({
            createUser: params.creator,
            expiryDate: params.maxAge,
            type: params.type
        });
        token.save(function (err) {
            if (err) {
                callback(null, err);
            } else {
                callback(token, null);
            }
        });
    }

};

module.exports.tokenActions = tokenActions;

