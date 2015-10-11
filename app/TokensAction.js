'use strict';

var TokensAction = function (opts) {
    this.repository = opts.repository;
};

TokensAction.prototype = {
    create: function(token) {
        return this.repository.create(token);
    },

    get: function(uuid) {
        return this.repository.get(uuid);
    },

    getAll: function() {
        return this.repository.getAll();
    },

    delete: function(uuid) {
        this.repository.delete(uuid);
    }
};

module.exports = TokensAction;
