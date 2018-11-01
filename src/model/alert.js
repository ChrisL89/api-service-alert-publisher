'use strict';

const strummer = require('strummer');

const AlertMatcherFields = Object.freeze({
  type: 'string',
  message: 'string',
  component: 'string',
  alertCode: 'string',
  timestamp: 'integer',
  venueId: 'string',
  terminalId: 'string',
  deviceId: 'string',
  deviceType: 'string',
  wageringId: 'string',
});

const AlertMatcher = new strummer.object(AlertMatcherFields);

class Alert {
  constructor(jsonMessage) {
    const alert = Alert.toObject(jsonMessage);

    const unmatchedList = AlertMatcher.match(alert);
    if (unmatchedList.length > 0) {
      throw new Error('Cannot parse Alert');
    }

    Object.assign(this, alert);
  }

  static toObject(jsonMessage) {
    return {
      'type':jsonMessage.type,
      'message':jsonMessage.message,
      'component':jsonMessage.component,
      'alertCode':jsonMessage.alertCode,
      'timestamp':jsonMessage.timestamp,
      'venueId':jsonMessage.deviceInfo.venueId,
      'terminalId':jsonMessage.deviceInfo.terminalId,
      'deviceId':jsonMessage.deviceInfo.deviceId,
      'deviceType':jsonMessage.deviceInfo.deviceType,
      'wageringId':jsonMessage.deviceInfo.wageringId
    };

  }

}

module.exports = Alert;