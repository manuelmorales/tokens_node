var chai = require('chai');
var assert = chai.assert;
var Token = require('../../../app/models/Token');

describe('TokenModel', function() {
  describe('default values', function() {
    it('assings an uuid and a createdAt as default values', function(){
      var token = new Token();
      assert.isNotNull(token.uuid);
    });
  });
});
