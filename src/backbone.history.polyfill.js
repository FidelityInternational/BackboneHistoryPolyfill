(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function (Backbone, _) {
      return (root.bhp = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(root, Backbone, _);
  } else {
    root.bhp = factory(root, root.Backbone, root._);
  }
}(this, function (root, Backbone, _) {
  'use strict';

  if (typeof _ === 'undefined') { throw new Error('Underscore is not defined'); }
  if (typeof Backbone === 'undefined') { throw new Error('Backbone is not defined'); }
  
  var bhp = {};
  bhp.VERSION = '1.0.0';
  
  var defaultOptions = {
    validateHash: true
  };

  bhp.config = function(options) {
    _.extend(defaultOptions, options);
  };

  var History = Backbone.History.extend({
    constructor: function () {
      Backbone.History.apply(this, arguments);
      this._subscribeToEvents();
    },

    _subscribeToEvents: function () {
      Backbone.$(root).on('hashchange', _.bind(this._hashChanged, this));
    },
    
    _checkDefaultHash: function () {
      var hash = this.getHash();
      if (hash) {
        this._addHash(hash);
      }
    },

    _hashChanged: function () {
      var hash = this.getHash();
      if (defaultOptions.validateHash) {
        var _isHashInRoutes = this._isHashInRoutes(hash);
        if (_isHashInRoutes) {
          this._addHash(hash);
        }
      } else {
        this._addHash(hash);
      }
    },

    _isHashInRoutes: function (hash) {
      var handler, handlers = this.handlers;
      var isExist = false;
      for (var i = 0, len = handlers.length; i < len; i++) {
        handler = handlers[i];
        if (handler.route.toString() === Backbone.Router.prototype._routeToRegExp(hash).toString()) {
          isExist = true;
          break;
        }
      }
      return isExist;
    },

    _addHash: function (hash) {
      var _hashes = this._hashes || [];
      _hashes.push(hash);
      var length = _hashes.length;
      this._hashes = _hashes.slice(length - 2, length);
    },

    getPreviousHash: function () {
      if (!Backbone.History.started) { throw new Error('Backbone.history has not been started'); }
      var _hashes = this._hashes || [];
      return _hashes[0] || '';
    },

    start: function () {
      this._hashes = [];
      var ret = Backbone.History.prototype.start.apply(this, arguments);
      this._checkDefaultHash();
      return ret;
    }
  });

  Backbone.history = new History();
  
  return bhp;
}));