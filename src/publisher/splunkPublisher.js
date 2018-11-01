'use strict';

const log = require('../log.js');
const splunkConnector = require('../connectors/splunkConnector');

function sendObject(message) {
  log.info('Publishing message to Splunk');
  splunkConnector.info(message.body);
}

function getName() {
  return 'SPLUNK Publisher';
}

module.exports = {
  sendObject,
  getName
};