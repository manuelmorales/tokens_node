var Serializer = function () { }

Serializer.prototype = {dump: function (token) {
  var clean_token = {
    uuid: token.uuid,
    type: token.type,
    content: token.content,
    expiryDate: token.expiryDate,
    createDate: token.createDate,
    createUser: token.createUser
  }
  return JSON.stringify(clean_token);
}};

module.exports = Serializer;
