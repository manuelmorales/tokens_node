var chai = require('chai');
var assert = chai.assert;

describe('tokensSerializer', function () {
	beforeEach(function() {
		var Serializer = function () { }
		Serializer.prototype = {dump: function (token) {
			var clean_token = {
				uuid: token.uuid,
				type: token.type,
				content: token.content,
				expiryDate: token.expiryDate,
				createDate: token.createDate,
				createUser: token.createUser
			}
			return JSON.stringify(clean_token);
		}};

		this.serializer = new Serializer();
	});

	it('exists', function () {
		assert(typeof(this.serializer) !== 'undefined', 'serializer not defined')
	})

	describe('dump', function() {
		beforeEach(function () {
			this.token = {
				uuid: 'aaa-bbb-ccc',
				type: 'login',
				content: 'some content',
				expiryDate: new Date(2015, 10, 09, 16, 13, 0, 18),
				createDate: new Date(2015, 10, 09, 16, 14, 0, 18),
				createUser: 'user-uuid',
			   	some: 'rubbish'
			};

			this.getResult = function () {
			   	return JSON.parse(this.serializer.dump(this.token));
			}
		});

		it('returns uuid', function() {
			var result = this.getResult();
			assert.equal(result.uuid, this.token.uuid); 
		});

		it('returns type', function() {
			var result = this.getResult();
			assert.equal(result.type, this.token.type); 
		});

		it('returns content', function() {
			var result = this.getResult();
			assert.equal(result.content, this.token.content); 
		});

		it('returns expiryDate', function() {
			var result = this.getResult();
			assert.equal(result.expiryDate, '2015-11-09T16:13:00.018Z'); 
		});

		it('returns createDate', function() {
			var result = this.getResult();
			assert.equal(result.createDate, '2015-11-09T16:14:00.018Z');
		});

		it('returns createUser', function() {
			var result = this.getResult();
			assert.equal(result.createUser, this.token.createUser); 
		});

		it('doesn\'t return anything else', function() {
			var result = this.getResult();
			assert.notEqual(result.some, 'rubbish'); 
		});
	});
});
