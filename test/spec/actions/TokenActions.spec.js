var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var tokenActions = require('../../../app/actions/TokenActions').tokenActions;

var mongoose = require('mongoose');

describe('TokenActions', function() {
    describe('create', function() {
        it('creates a token', function(done){
            var connection = mongoose.connect("mongodb://localhost/fullstack-dev");
            tokenActions.create({
                creator: 'pepe'
            }, function(){
                    assert.equal(arguments[0].createUser, "pepe");
                    done();
            })
        });
    });
});