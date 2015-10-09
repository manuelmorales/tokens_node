var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var tokenActions = require('../../../app/actions/TokenActions').tokenActions;

describe('TokenActions', function() {
    describe('create', function() {
        it('creates a token', function(done){
            tokenActions.create({
                creator: 'pepe'
            }, function(){

                assert.isEqual(arguments[0].createUser, "pepe");
                done();
            })
        });
    });
});