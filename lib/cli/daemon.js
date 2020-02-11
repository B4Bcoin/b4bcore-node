'use strict';

var program = require('commander');
var path = require('path');
var b4bcore = require('..');

function main(servicesPath, additionalServices) {
  /* jshint maxstatements: 100 */

  var version = b4bcore.version;
  var start = b4bcore.scaffold.start;
  var findConfig = b4bcore.scaffold.findConfig;
  var defaultConfig = b4bcore.scaffold.defaultConfig;

  program
    .version(version)
    .description('Start the current node')
    .option('-c, --config <dir>', 'Specify the directory with B4bcore Node configuration');

  program.parse(process.argv);

  if (program.config) {
    program.config = path.resolve(process.cwd(), program.config);
  }
  var configInfo = findConfig(program.config || process.cwd());
  if (!configInfo) {
    configInfo = defaultConfig({
      additionalServices: additionalServices
    });
  }
  if (servicesPath) {
    configInfo.servicesPath = servicesPath;
  }
  start(configInfo);
}

module.exports = main;
