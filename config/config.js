var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tokens_node'
    },
    port: 3000,
    db: 'mysql://root@localhost/tokens_node_development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'tokens-node'
    },
    port: 3000,
    db: 'mysql://root@localhost/tokens_node_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tokens-node'
    },
    port: 3000,
    db: 'mysql://root@localhost/tokens_node_production'
  }
};

module.exports = config[env];
