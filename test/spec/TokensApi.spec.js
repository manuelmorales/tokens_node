var request = require('supertest');
var Router = require('../../app/Router');
var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;

describe('TokensApi', function () {
	beforeEach(function() {
		this.repository = {create: sinon.spy()};
		this.app = Router({repository: this.repository});
	});

    describe('Create', function() {
		it('returns 201 OK', function (done) {
			request(this.app)
				.post('/tokens')
				.expect(201)
				.end(done);
		});

		it('creates the token', function (done) {
			var repo = this.repository;

			request(this.app)
				.post('/tokens')
				.send({content: 'some content'})
				.end(function (err) {
					if (err) {
						done(err);
					} else {
						assert(repo.create.calledOnce, 'Repository create not called');
						assert(repo.create.calledWith({content: 'some content'}), 'Wrong content');
						done();
					}
				});

		});
	});
});
