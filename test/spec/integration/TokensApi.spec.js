var config = require('../../../config');
var request = require('supertest');
var Application = require('../../../application');


describe('integration', function () {
	before(function() {
		this.validToken = {
			content: 'content',
			type: 'login',
			maxAge: 99
		};

		delete config['authenticator']; 

		this.application = new Application(config);

		this.app = this.application.server();

	});

	after(function() {
		this.application.stop();
	});

	describe('TokensApi', function () {
		
		describe('Create', function() {
			it('returns 201 OK', function (done) {
				request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(201)
				.end(done);
			});
		});

	});
});
