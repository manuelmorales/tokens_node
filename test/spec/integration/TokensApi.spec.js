var config = require('../../../config');
var request = require('supertest');
var Application = require('../../../application');
var chai = require('chai');
var expect = chai.expect;
var Token = require('../../../app/models/Token');

describe('integration', function () {
  before(function() {
    this.validToken = {
      content: 'content',
      type: 'login',
      maxAge: 99
    };

    this.invalidToken = {
      type: 'invalid'
    }

    delete config.authenticator;

    this.application = new Application(config);

    this.app = this.application.server();

  });

  after(function() {
    this.application.stop();
  });

  afterEach(function(){
    Token.remove({}).exec();
  });

  describe('TokensApi', function () {

    describe('Create', function() {
      it('returns 201 Created using a valid token', function (done) {
        request(this.app)
        .post('/tokens')
        .send(this.validToken)
        .expect(201)
        .end(done);
      });


      it('returns 422 Unproccesable entity using an invalid token', function (done) {
        request(this.app)
        .post('/tokens')
        .send(this.invalidToken)
        .expect(422)
        .end(done);
      });

      it('Returns 200 OK when a valid uuid is provided', function (done) {
        request(this.app)
        .post('/tokens')
        .send(this.validToken)
        .expect(201)
        .end(done)
      });
    });

    describe('Show', function() {
      it('Returns 200 OK when a valid uuid is provided', function (done) {
        request(this.app)
        .post('/tokens')
        .send(this.validToken)
        .expect(201)
        .end(function(error,res) {
          if(error) {
            done(error);
          } else {
            request(this.app)
            .get(res.header.location)
            .expect(200)
            .end(function(error,res) {
              done(error);
            });
          }
        });
      });

      it('returns 404 when an invalid uuid is provided', function (done) {
        request(this.app)
        .get('/tokens/nonexistingtokenuuid')
        .expect(404)
        .end(function(error,res) {
          done(error);
        })
      });
    });

    describe('destroy', function(){
      beforeEach(function(){
        this.dorequest = function(params) {
          return request(this.app).delete('/tokens/' + this.params.uuid).send();
        };
        this.existinguuid = 'some_existing_uuid';
        this.withtoken = function(callback) {
          var token = new Token({
            uuid: this.params.uuid,
            createuser: 'someone',
            content:    'some_content',
            expirydate: (new Date().getDate() + 100000),
            type: 'some_type'
          });
          token.save(callback);
        };
      });

      describe('when valid uuid provided', function(){

        beforeEach(function(){
          this.params = { uuid: this.existinguuid };
        });

        describe('when there is a token with the given uuid in the db', function(){

          it('returns a 204', function(done){
            var that = this;

            this.withtoken(function(err){
              that.dorequest(this.params).expect(204).end(done);
            });
          });

          it('removes the elm from the database', function(done){
            var uuid = this.params.uuid;
            this.withtoken(function(err){
              this.dorequest(this.params).end(function(error, res){
                if(error) {
                  done();
                } else {
                  Token.findOne({ uuid: uuid }, function(err, tokenafter){
                    expect(tokenafter).to.be.null;
                    done();
                  });
                };
              });
            }.bind(this));
          });
        });

        describe('when there is not a token with the given uuid in the db', function(){
          beforeEach(function(){
            this.params = { uuid: 'some_unexisting_uuid' };
          });

          it('returns a 404', function(done){
            var that = this;
            var that = this;
            that.dorequest(that.params).expect(404).end(done);
          });
        });

        describe.skip('when invalid uuid provided', function(){
          // what defines an invalid uuid?
          it('returns a 422', function(done){
            this.dorequest(this.params).expect(422).end(done);
          });
        });
      });

    });
  });
});
