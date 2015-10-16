var request = require('supertest');
var router = require('../../app/router');
var TokenActions = require('../../app/actions/TokenActions');
var TokensApi = require('../../app/TokensApi');
var chai = require('chai');
var assert = chai.assert;
var createTokenValidator = require('../../app/createTokenValidator');

describe('TokensApi', function () {
	beforeEach(function() {

        this.tokenActions = TokenActions;
        this.tokenActions.create= function(token, callback) {
			callback(null, {id: 1});
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

    describe('Create', function() {
		it('returns 201 OK', function (done) {
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
						assert.equal(call.res.headers.location, '/tokens/1')
						done();
					}
				});
		});
	});
});
