var request = require('supertest');
var Router = require('../../app/Router');

describe('TokensApi', function () {
	beforeEach(function() {
		this.app = new Router();
	});

    describe('Create', function() {
		it('returns 201 OK', function (done) {
			request(this.app)
				.post('/tokens')
				.expect(201)
				.end(done);
		});
	});
});
