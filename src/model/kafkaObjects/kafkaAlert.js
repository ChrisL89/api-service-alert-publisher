'use strict';

/**
 * This is the kafka sign up model class
 */
const strummer = require('strummer');
const pick = require('lodash/pick');
const KafkaObject = require('./kafkaObject');

const MonitoringAlertMatcherFields = Object.freeze({
  type: 'string',
  message: 'string',
  component: 'string',
  alertCode: 'string',
  timestamp: new strummer.isoDate(),
  venueId: 'string',
  terminalId: 'string',
  deviceId: 'string',
  deviceType: 'string',
  wageringId: 'string',
});

const MonitoringAlertMatcher = new strummer.object(MonitoringAlertMatcherFields);

const MANDATORY_FIELDS = [
  'type',
  'message',
  'component',
  'alertCode',
  'timestamp',
  'venueId',
  'terminalId',
  'deviceId',
  'deviceType',
  'wageringId'
];

/**
 * Class representing a kafkaAlert object
 * @extends KafkaObject
 */
class KafkaAlert extends KafkaObject {
  /**
   * Create a KafkaAlert object
   * @param {object} details - MinitoringAlert details
   */
  constructor(details) {
    super();
    this.eventType = 'MonitoringAlert';
    this.body = pick(details, MANDATORY_FIELDS);
  }

  /**
   * Validate the given object to this kafka object schema if valid return a valid KafkaAlert Kafka Object
   *
   * @param mayMonitoringAlertObject
   * @returns [[error], SignupObject]  return tuple of two elements
   * first element is the error list , if the validation fails.
   * second element is an instance of SignupObject if the validation passes.
   * @constructor
   */
  static Matcher(mayMonitoringAlertObject) {
    let errors = [];

    if (mayMonitoringAlertObject instanceof KafkaAlert) {
      return [errors, mayMonitoringAlertObject];
    }

    errors = MonitoringAlertMatcher.match(mayMonitoringAlertObject);
    return (errors.length === 0) ? [errors, new KafkaAlert(mayMonitoringAlertObject)] : [errors, undefined];
  }

}

module.exports = KafkaAlert;
