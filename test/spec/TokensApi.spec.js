var request = require('supertest');
var router = require('../../app/router');
var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var createTokenValidator = require('../../app/createTokenValidator');

describe('TokensApi', function () {
	beforeEach(function() {
		var repoCreate = function () { return {id: 33} }
		this.repository = {create: repoCreate};
		sinon.spy(this.repository, 'create');

		this.validToken = {
			content: 'content',
			type: 'login',
			maxAge: 99
		};

		this.app = router({
			repository: this.repository,
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

		it('creates the token', function (done) {
			var repo = this.repository;
			var expected_attrs = this.validToken

			request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.end(function (err) {
					if (err) {
						done(err);
					} else {
						assert(repo.create.calledOnce, 'Repository create not called');
						assert.equal(repo.create.args[0][0].content, expected_attrs.content)
						assert.equal(repo.create.args[0][0].maxAge, expected_attrs.maxAge)
						assert.equal(repo.create.args[0][0].type, expected_attrs.type)
						done();
					}
				});

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
						assert.equal(call.res.headers.location, '/tokens/33')
						done();
					}
				});
		});
	});
});
