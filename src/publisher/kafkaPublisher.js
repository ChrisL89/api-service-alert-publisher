'use strict';

const kafkaConnector = require('../connectors/kafkaConnector');

const log = require('../log.js');

/**
 * Main function to publish message to KAFKA
 * @param kafkaObject
 */
function sendObject(kafkaObject) {

  kafkaConnector.sendObject(kafkaObject, function (error) {
    if (error) {
      log.info(`Failed to publish message to kafka, error: ${error}`);
    } else {
      log.info(`Successfully published data to kafka, alertCode: ${kafkaObject.body.alertCode}`);
    }
  });
}

function getName() {
  return 'KAFKA Publisher';
}

module.exports = {
  sendObject,
  getName
};