var config = require('../../../config');
var request = require('supertest');
var Application = require('../../../application');
var chai = require('chai');
var expect = chai.expect;

describe('integration', function () {
	before(function() {
		this.validToken = {
			content: 'content',
			type: 'login',
			maxAge: 99
		};

		this.invalidToken = {
			type: 'invalid'
		}

		delete config.authenticator; 

		this.application = new Application(config);

		this.app = this.application.server();

	});

	after(function() {
		this.application.stop();
	});

	describe('TokensApi', function () {
		
		describe('Create', function() {
			it('returns 201 Created using a valid token', function (done) {
				request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(201)
				.end(done);
			});
			it('returns 422 Unproccesable entity using an invalid token', function (done) {
				request(this.app)
				.post('/tokens')
				.send(this.invalidToken)
				.expect(422)
				.end(done);
			});
		});

		describe('Show', function() {
			it('Returns 200 OK when a valid uuid is provided', function (done) {
				request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(201)
				.end(function(error,res) {
				    if(error)
				    	done();
				    else {
				    	request(this.app)
				    		.get(res.header.location)
				    		.expect(200)
				    		.end(function(error,res) {
				    			done();
				    		});
					}
				});
			});
            it('Returns 200 OK when a valid uuid is provided', function (done) {
				request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(201)
				.end(function(error,res) {
				    if(error)
				    	done();
				    else {
				    	request(this.app)
				    		.get(res.header.location)
				    		.expect(200)
				    		.end(function(error,res) {
				    			expect(JSON.parse(res.text)).to.have.property('content');
				    			done();
				    		});
					}
				});
			});
		});

	});
});
