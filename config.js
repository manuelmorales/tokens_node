module.exports = {
  authenticator: require('./app/authenticator')({
    url: 'http://qa.workshare.com/current_user.json',
    request: require('request')
  }),
  createTokenValidator: require('./app/createTokenValidator')
}
