'use strict';

const pkg = require('../package');

module.exports.info = {
  swagger: '2.0',
  info: {
    title: pkg.name,
    version: pkg.version
  }
};
