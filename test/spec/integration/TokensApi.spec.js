var config = require('../../../config');
var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var mongoose = require('mongoose');

describe.only('integration', function () {
	describe('TokensApi', function () {
		before(function() {
			this.validToken = {
				content: 'content',
				type: 'login',
				maxAge: 99
			};

			this.app = config.server();
		});

        after(function(done){
            mongoose.disconnect(done);
        });

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
