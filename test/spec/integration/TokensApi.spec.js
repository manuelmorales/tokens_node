var config = require('../../../config');
var request = require('supertest');
var Application = require('../../../application');
var chai = require('chai');
var expect = chai.expect;
var Token = require('../../../app/models/Token');

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
				.end(done)
			});
		});

		describe('Destroy', function(){
			beforeEach(function(){
				this.doRequest = function(params) {
					return request(this.app).delete('/tokens/' + this.params.uuid).send();
				};
				this.existingUuid = 'some_existing_uuid';

				this.withToken = function(callback) {
					var token = new Token({
						uuid: this.params.uuid,
	          createUser: 'someone',
	          content:    'some_content',
	          expiryDate: (new Date().getDate() + 100000),
	          type: 'some_type'
	        });
	        token.save(callback);
				};
			});

			describe('when valid uuid provided', function(){
				beforeEach(function(){
					this.params = { uuid: this.existingUuid };
				});

				describe('when there is a token with the given uuid in the db', function(){
					it('returns a 204', function(done){
						var that = this;

						this.withToken(function(err){
							that.doRequest(this.params).expect(204).end(done);
						});
					});

					it('removes the elm from the database', function(done){
						var uuid = this.params.uuid;
						var that = this;

						this.withToken(function(err){
							Token.findOne({ uuid: uuid }, function(err, tokenBefore){
								expect(tokenBefore).to.not.be.null;

								that.doRequest(that.params).end(function(error, res){
									if(error) {
										done();
									} else {
										Token.findOne({ uuid: uuid }, function(err, token){
											expect(token).to.be.null;
											done();
										});
									};
								});
							});
						});
					});
				});

				describe('when there is not a token with the given uuid in the db', function(){
					beforeEach(function(){
						this.params = { uuid: 'some_unexisting_uuid' };
					});

					it('returns a 404', function(done){
						var that = this;

						that.doRequest(that.params).expect(404).end(done);
					});
				});
			});

			describe.skip('when invalid uuid provided', function(){
				// What defines an invalid uuid?
				it('returns a 422', function(done){
					this.doRequest(this.params).expect(422).end(done);
				});
			});
		});
	});
});
