var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var buildCurrentUserMiddleware = require('../../app/buildCurrentUserMiddleware');

describe('currentUserMiddleware', function () {
	beforeEach(function() {
		var that = this;
		this.req = {}
		this.res = {}
		this.next = sinon.spy();
		this.currentUser = {}
		var getCurrentUser = function () { return that.currentUser }
		this.currentUserMiddleware = buildCurrentUserMiddleware({getCurrentUser: getCurrentUser});
	});

	it('calls next', function () {
		this.currentUserMiddleware(this.req, this.res, this.next);
		assert(this.next.called, 'Next was not called');
	});

	it('injects the user in the request', function () {
		this.currentUserMiddleware(this.req, this.res, this.next);
		assert.isDefined(this.req.currentUser);
	});

	it('sets the user uuid to the one received', function () {
		this.currentUserMiddleware(this.req, this.res, this.next);
		assert.equal(this.req.currentUser.uuid, this.currentUser.uuid);
	});
});
