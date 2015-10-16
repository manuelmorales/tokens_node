var chai = require('chai');
var assert = chai.assert;
var err = false;
var mongoose = require('mongoose');

var doubleToken = function(params) {
    this.createUser = params.createUser;
    this.uuid = params.uuid;

    this.save = function(callback) {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    }
}

var tokenActions = require('../../../app/actions/TokenActions')(doubleToken);

describe('TokenActions', function() {
    describe('create', function() {
        it('creates a token', function(done){
            tokenActions.create({
                creator: 'pepe'
            }, function(){
                    assert.equal(arguments[1].createUser, "pepe");
                    done();
            })
        });
    });

    describe('showActions', function(){
        before(function(done){
            mongoose.connect("mongodb://localhost/token-test");
            var Token = require('../../../app/models/Token');
            tokenActions = require('../../../app/actions/TokenActions')(Token);
            var token1 = new Token({
                uuid: 'fake-uuid-1',
                createUser: 'fake-user'
            });
            token1.save(done);
        });

        after(function(done){
            mongoose.connection.db.dropCollection('tokens', function () {
                done();
            });
        });

        describe('getByUuid', function(){
            it('shows a token', function(done) {
                tokenActions.show({
                    uuid: 'fake-uuid-1'
                }, function(error, token){
                    assert.equal(token.uuid, 'fake-uuid-1');
                    done();
                })
            });
        })

        describe('getAll', function(){
            it('shows a token', function(done) {
                tokenActions.showAll({
                    userUuid: 'fake-user'
                }, function(error, tokens){
                    assert.equal(tokens.length, 1);
                    done();
                })
            });
        })




    });
});
