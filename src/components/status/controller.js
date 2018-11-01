'use strict';

const _ = require('lodash');
const os = require('os');
const env = require('../../env');
const packageJSON = require('../../../package.json');

function get(req, res, next) {
  res.send(200, {
    code: 200,
  });
  next();
}

function details(req, res, next) {
  res.send(200, {
    hostname: getHostname(),
    components: getComponents()
  });
  next();
}

function getHostname() {
  return _.first(os.hostname().split('.'));
}

function getComponents() {
  const components = {};
  const version = packageJSON.version + ':' + (env.version.releaseVersion ? env.version.releaseVersion : 'UNKNOWN_RELEASE_VERSION');
  components[packageJSON.name] = version;
  return components;
}

module.exports = {
  get,
  details,
};
