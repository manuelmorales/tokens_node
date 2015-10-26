var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var buildGetCurrentUser = require('../../app/buildGetCurrentUser');

describe('getCurrentUser', function () {
	beforeEach(function() {
		var that = this;
		this.res = {statusCode: 200}

		this.request = function (opts, callback) {
			var err = undefined;
			var body = '';
			callback(err, that.res, body);
	   	}

		this.getCurrentUser = buildGetCurrentUser({request: this.request});
		this.req = {};
	});

	describe('on success', function () {
		beforeEach(function() {
			this.res.statusCode = 200 
		});

		it('returns an object', function () {
			var user = this.getCurrentUser(this.req);
			assert.isDefined(user);
		});
	});

	describe('on failure', function () {
		beforeEach(function() {
			this.res.statusCode = 401
		});

		it('returns undefined', function () {
			var user = this.getCurrentUser(this.req);
			assert.isUndefined(user);
		});
	});
});
