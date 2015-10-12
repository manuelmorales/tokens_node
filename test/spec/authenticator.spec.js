var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var authenticator = require('../../app/authenticator');

describe('authenticator', function () {
  beforeEach(function() {
    this.sessionid = 'mysessionid';

    this.req = {
      headers: {
        cookie: ''
      },
      query: {
        sessionid: this.sessionid
      }
    };

    this.res = {
      status: sinon.spy(),
      json: sinon.spy(),
      end: sinon.spy()
    };

    this.next = sinon.spy();

    this.url = 'http://qa.some_url.com/auth.json';

    this.error = undefined;
    this.responseStatusCode = 200;

    this.buildResponse = function(){
      this.response = { statusCode: this.responseStatusCode };
    };

    this.buildRequest = function(){
      var that = this;

      this.request = function(opts, callback){
        var validUrl = (opts.url == that.url);
        var cookie = opts.headers['Cookie'];
        var validCookie = cookie.indexOf('qa_session_id=mysessionid;') > -1;

        if(validUrl && validCookie) {
          callback(that.error, that.response);
        } else {
          throw 'Unexpected request params';
        }
      };
    };

    this.buildAuthenticator = function(config){
      config = config || { url: this.url, request: this.request };
      this.authenticator = authenticator(config);
    };
  });

  describe('when logged in in the authentication service', function() {
    beforeEach(function(){
      this.buildResponse();
      this.buildRequest();
      this.buildAuthenticator();
    });

    it('calls next', function () {
      this.authenticator(this.req, this.res, this.next);

      assert(this.next.called, 'Next was not called');
    });
  });

  describe('when the authorization is not successful', function() {
    describe('when there is an error during the request', function(){
      beforeEach(function(){
        this.error = true;

        this.buildResponse();
        this.buildRequest();
        this.buildAuthenticator();
      });

      it('does not call next', function () {
        this.authenticator(this.req, this.res, this.next);

        assert(!this.next.called, 'Next was called');
      });

      it('responds with an error', function() {
        this.authenticator(this.req, this.res, this.next);

        assert(this.res.status.calledWith(401), '401 was not returned');
        assert(this.res.json.called, 'Error message was not returned');
        assert(this.res.json.calledWith({error: {message: 'Auth error'}}),
          'Error message was not returned in format'
        );
        assert(this.res.end.called, 'Response was not ended');
      });
    });

    describe('when the response is not successful', function(){
      beforeEach(function(){
        this.responseStatusCode = 401;

        this.buildResponse();
        this.buildRequest();
        this.buildAuthenticator();
      });

      it('does not call next', function () {
        this.authenticator(this.req, this.res, this.next);

        assert(!this.next.called, 'Next was called');
      });

      it('responds with an error', function() {
        this.authenticator(this.req, this.res, this.next);

        assert(this.res.status.calledWith(401), '401 was not returned');
        assert(this.res.json.called, 'Error message was not returned');
        assert(this.res.json.calledWith({error: {message: 'Auth error'}}),
          'Error message was not returned in format'
        );
        assert(this.res.end.called, 'Response was not ended');
      });
    });
  });
});
