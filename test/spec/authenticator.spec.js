var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var authenticator = require('../../app/authenticator');

describe('authenticator', function () {
  beforeEach(function() {
    var that = this;

    this.sessionid = 'mysessionid';

    this.req = {
      headers: {
        cookie: ''
      },
      query: {
        sessionid: this.sessionid
      }
    };

    this.resStatus = sinon.spy();
    this.resJson = sinon.spy();
    this.resEnd = sinon.spy();
    this.res = {
      status: this.resStatus,
      json: this.resJson,
      end: this.resEnd
    };

    this.next = sinon.spy();

    this.url = 'http://qa.some_url.com/auth.json';
    this.error = undefined;
    this.responseStatusCode = 200;
    this.response = { statusCode: this.responseStatusCode }

    this.buildRequest = function(){
      that.request = function(opts, callback){
        callback(that.error, that.response);
      };
    };

    this.buildAuthenticator = function(config){
      config = config || { url: that.url, request: that.request };
      that.authenticator = authenticator(config);
    };
  });

  describe('when logged in in the authentication service', function() {
    beforeEach(function(){
      this.buildRequest();
      this.buildAuthenticator();
    });

    it('calls next', function () {
      this.authenticator(this.req, this.res, this.next);

      assert(this.next.called === true, 'Next was not called');
    });
  });

  describe('when not logged in in the authentication service', function() {
    beforeEach(function(){
      var that = this;
      this.error = true;
      this.responseStatusCode = 401;
      this.response = { statusCode: this.responseStatusCode }
      this.request = function(opts, callback){
        callback(that.error, that.response);
      };
      this.buildAuthenticator({request: this.request, url: this.url});
    });

    it('does not call next', function () {
      this.authenticator(this.req, this.res, this.next);

      assert(this.next.called === false, 'Next was called');
    });

    it('responds with an error', function() {
      this.authenticator(this.req, this.res, this.next);

      assert(this.resStatus.calledWith(401) === true, '401 was not returned');
      assert(this.resJson.called === true, 'Error message was not returned');
      assert(this.resJson.calledWith({error: {message: 'Auth error'}}) === true,
        'Error message was not returned in format'
      );
      assert(this.resEnd.called === true, 'Response was not ended');
    });
  });
});
