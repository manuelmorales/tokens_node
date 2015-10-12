var express = require('express');
var request = require('supertest');
var bodyParser = require('body-parser');
var chai = require('chai');
var assert = chai.assert;
var validator = require('../../app/createTokenValidator');

describe('CreateTokenValidator', function () {
	beforeEach(function() {
		this.validToken = {
			content: 'content',
			type: 'login',
			maxAge: 99
		};

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
				.send(this.validToken)
				.expect(201)
				.end(done);
		});
	});

    describe('invalid request', function() {
		it('fails when no content is given', function (done) {
			this.validToken.content = undefined

			request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(422)
				.end(done)
		});

		it('fails when no type is given', function (done) {
			this.validToken.type = undefined

			request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(422)
				.end(done)
		});

		it('fails when maxAge is no an integer', function (done) {
			this.validToken.maxAge = 'some string'

			request(this.app)
				.post('/tokens')
				.send(this.validToken)
				.expect(422)
				.end(done)
		});

	});
});
