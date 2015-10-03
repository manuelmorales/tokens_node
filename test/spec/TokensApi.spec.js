var chai = require('chai');
var expect = chai.expect;

var TokensApi = require('../../app/TokensApi');

describe('TokensApi', function () {
	beforeEach(function() {
		this.tokensApi = new TokensApi();
	});

    describe('Create', function() {
		it('should return 201 when all ok', function() {
			var res = this.tokensApi.createToken();

			expect(res).to.be.equals(201);
		});
	});
});
