'use strict';

var createError = require('errno').create;

var B4bcoreNodeError = createError('B4bcoreNodeError');

var RPCError = createError('RPCError', B4bcoreNodeError);

module.exports = {
  Error: B4bcoreNodeError,
  RPCError: RPCError
};
