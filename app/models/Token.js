var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    uuid:  { type: String, default: uuid.v4 },
    type: String,
    content:   String,
    expiryDate:   Date,
    createDate: { type: Date, default: Date.now },
    createUser: String
});

var Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

