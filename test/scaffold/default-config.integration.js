'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/b4bd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'b4bd',
        'web'
      ],
      servicesConfig: {
        b4bd: {
          spawn: {
            datadir: process.env.HOME + '/.b4bcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.b4bcore/b4bcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.b4bcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['b4bd', 'web']);
    var b4bd = info.config.servicesConfig.b4bd;
    should.exist(b4bd);
    b4bd.spawn.datadir.should.equal(home + '/.b4bcore/data');
    b4bd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'b4bd',
        'web',
        'insight-api',
        'insight-ui'
      ],
      servicesConfig: {
        b4bd: {
          spawn: {
            datadir: process.env.HOME + '/.b4bcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.b4bcore/b4bcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api', 'insight-ui']
    });
    info.path.should.equal(home + '/.b4bcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'b4bd',
      'web',
      'insight-api',
      'insight-ui'
    ]);
    var b4bd = info.config.servicesConfig.b4bd;
    should.exist(b4bd);
    b4bd.spawn.datadir.should.equal(home + '/.b4bcore/data');
    b4bd.spawn.exec.should.equal(expectedExecPath);
  });
});
