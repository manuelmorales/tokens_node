var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var TokensAction = require('../../app/TokensAction');

describe('TokensAction', function () {

    beforeEach(function() {

        this.token = {uuid: 'token', body: {token:'lala'}};

        this.repository = {
            //TODO this is going to be a stub in order to check it has been called
            create: function(token) {
                return token;
            },
            update: function(token) {
                return token;
            },
            get: function(uuid) {
                var token = {uuid: uuid};
                return token;
            },
            getAll: function() {
                var tokens = [{uuid: 'token', body: {token:'lala'}}];
                return tokens;
            },
            delete: sinon.spy()
        };

        this.tokensAction = new TokensAction({repository: this.repository});

    });

    afterEach(function() {

    });


    describe('Create', function() {

        it('should delegate to db', function () {
            var insertedToken = this.tokensAction.create(this.token);

            expect(insertedToken).to.be.deep.equals(this.token);
        });

    });

    describe('Get all', function() {

        it('should delegate to db', function() {
            var tokens = this.tokensAction.getAll();

            expect(tokens).to.be.deep.equals([this.token]);
        });
    });

    describe('Get by uuid', function() {

        it('should delegate to db', function() {

            var token = this.tokensAction.get('uuid');

            expect(token.uuid).to.be.deep.equals('uuid');
        });
    });

    describe('delete', function() {

        it('should delegate to db', function() {
            this.tokensAction.delete('uuid');

            expect(this.repository.delete.calledWith('uuid')).to.be.true;
        })
    })
});
