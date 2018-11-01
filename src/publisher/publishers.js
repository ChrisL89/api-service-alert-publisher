'use strict';

const kafkaPublisher = require('./kafkaPublisher');
const splunkPublisher = require('./splunkPublisher');
const KafkaAlert = require('../model/kafkaObjects/kafkaAlert');
const SplunkAlert = require('../model/splunkObjects/splunkAlert');

const TYPE_MAP = {
  KAFKA: 'KAFKA',
  SPLUNK: 'SPLUNK',
};

//Mapping to describe which storage should the alert go
const ALERT_PUBLISHER_MAP = {
  C001: TYPE_MAP.KAFKA,
  C002: TYPE_MAP.KAFKA,
  W001: TYPE_MAP.SPLUNK
};

/**
 * function to use alertCode from jsonMessage to workout which publisher it needs to call
 * @param alert
 */
function publish(alert) {
  const publisherType = ALERT_PUBLISHER_MAP[alert.alertCode];
  let message;
  let publisher;

  switch (publisherType) {
  case TYPE_MAP.KAFKA:
    publisher = kafkaPublisher;
    message = new KafkaAlert(alert);
    break;
  case TYPE_MAP.SPLUNK:
    publisher = splunkPublisher;
    message = new SplunkAlert(alert);
    break;
  default:
    //Given each alert message is important, we should not throw away any message simply because alert code is not predefined.
    // Instead, we use KAFKA as default storage for any unrecognisable alert code
    publisher = kafkaPublisher;
    message = new KafkaAlert(alert);
  }

  publisher.sendObject(message);
}

module.exports = {
  publish
};