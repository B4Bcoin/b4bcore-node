'use strict';

var path = require('path');

/**
 * Will return the path and default b4bcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to b4bcoin database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }
  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['b4bd', 'web'],
      servicesConfig: {
        b4bd: {
          spawn: {
            datadir: options.datadir || path.resolve(process.env.HOME, '.b4b'),
            exec: path.resolve(__dirname, '../../bin/b4bd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
