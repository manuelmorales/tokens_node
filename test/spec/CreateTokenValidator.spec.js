var express = require('express');
var request = require('supertest');
var bodyParser = require('body-parser');
var chai = require('chai');
var assert = chai.assert;
var validator = require('../../app/createTokenValidator');

describe('CreateTokenValidator', function () {
	beforeEach(function() {
		this.validToken = {content: 'content', type: 'login', uuid: "user-uuid",
	   					   expiryDate: Date.now(), createDate: Date.now(), createUser : 'pepe' }; 
		this.app = express();
		this.app.use(bodyParser.json());
		this.validator = validator;
		this.app.use(this.validator);
		this.app.post('/tokens', function (req, res) { res.status(201).send(); });
	});

    describe('valid request', function() {
		it('returns 201 OK', function (done) {
			request(this.app)
				.post('/tokens')
				.send({content: 'my content'})
				.expect(201)
				.end(done);
		});
	});

    describe('invalid request', function() {
		it('fails when no content is given', function (done) {
		request(this.app)
			.post('/tokens')
			.send({})
			.expect(422)
			.end(done)
		});
	it('fails when no type is given', function (done) {
		request(this.app)
			.post('/tokens')
			.send({})
			.expect(422)
			.end(done)
		});

	});
});
