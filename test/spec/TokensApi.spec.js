var request = require('supertest');
var router = require('../../app/router');
var TokenActions = require('../../app/actions/TokenActions');
var TokensApi = require('../../app/TokensApi');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var assert = chai.assert;
var expect = chai.expect;

var createTokenValidator = require('../../app/createTokenValidator');

describe('TokensApi', function () {

  describe('Create', function() {
    beforeEach(function() {

      this.tokenActions = TokenActions;
      this.tokenActions.create= function(token, callback) {
        callback(null, {id: 1, uuid: 'the-token-uuid'});
      };

      this.tokensApi = new TokensApi({tokenActions: this.tokenActions});

      this.validToken = {
        content: 'content',
        type: 'login',
        maxAge: 99
      };


      this.app = router({
        tokensApi: this.tokensApi,
        createTokenValidator: createTokenValidator
      });

    });

    it('calls the action with the creator', function(done){
      spy = sinon.spy(TokenActions, 'create');
      request(this.app)
      .post('/tokens')
      .send(this.validToken)
      .end(function() {
        finalToken = {
          content: 'content',
          type: 'login',
          maxAge: 99,
          creator: 'fake-uuid'
        };
        assert(spy.withArgs(finalToken, sinon.match.any));
        done();
      });
    });

    it('returns 201 Created', function (done) {
      request(this.app)
      .post('/tokens')
      .send(this.validToken)
      .expect(201)
      .end(done);
    });

    it('returns no body', function (done) {
      request(this.app)
      .post('/tokens')
      .send(this.validToken)
      .expect(201)
      .end(function (err, call) {
        if (err) {
          done(err);
        } else {
          assert.equal(call.res.body, undefined)
          done();
        }
      });
    });

    it('returns the token URL in the location header', function (done) {
      request(this.app)
      .post('/tokens')
      .send(this.validToken)
      .expect(201)
      .end(function (err, call) {
        if (err) {
          done(err);
        } else {
          assert.equal(call.res.headers.location, '/tokens/the-token-uuid')
          done();
        }
      });
    });
  });

  describe('Show', function() {
    beforeEach(function() {
      this.tokenActions = TokenActions;
      this.tokenActions.show= function(token, callback) {
        callback(null, {_id: "562fac3cf9d752d5236aa8cb", content: 'Content', uuid: 'the-token-uuid', expiryDate: "2015-10-27T16:54:20.405Z", creator: 'some-user', type: 'test', __v: 0});
      };

      this.tokensApi = new TokensApi({tokenActions: this.tokenActions});
      this.app = router({
        tokensApi: this.tokensApi,
        createTokenValidator: createTokenValidator
      });

    });

    it('returns 200 OK', function (done) {
      var creator = { creator: 'some-user' }

      request(this.app)
      .get('/tokens/'+'random-token-uuid')
      .send(creator)
      .expect(200)
      .end(done);
    });

    it('returns the content',function(done) {
      var creator = { creator: 'some-user' }

      request(this.app)
      .get('/tokens/'+'random-token-uuid')
      .send(creator)
      .end(function(err, res) {
        assert.isDefined(res.body, 'content');
        done();
      });
    });

    it('returns 403 when the user is not the owner', function(done) {
      var creator = { creator: 'uuid' }
      request(this.app)
      .get('/tokens/'+'random-token-uuid')
      .send(creator)
      .expect(403)
      .end(done);
    });

  });

  describe('ShowAll', function() {
    beforeEach(function() {

      this.tokenActions = TokenActions;
      this.tokenActions.showAll = function(token, callback) {
        callback(null, [{_id: "562fac3cf9d752d5236aa8cb", content: 'Content', uuid: 'the-token-uuid', expiryDate: "2015-10-27T16:54:20.405Z", type: 'test', __v: 0}]);
      };

      this.tokensApi = new TokensApi({tokenActions: this.tokenActions});

      this.app = router({
        tokensApi: this.tokensApi,
        createTokenValidator: createTokenValidator
      });

    });
    it('returns 200 OK', function (done) {
      request(this.app)
      .get('/tokens/')
      .expect(200)
      .end(done);
    });

    it('returns an array',function(done) {
      request(this.app)
      .get('/tokens/')
      .expect(200)
      .end(function(err, res) {
        assert(Array.isArray(res.body));
        done();
      });
    });
  });
});
