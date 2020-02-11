'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export b4bcore-lib', function() {
    var b4bcore = require('../');
    should.exist(b4bcore.lib);
    should.exist(b4bcore.lib.Transaction);
    should.exist(b4bcore.lib.Block);
  });
});
