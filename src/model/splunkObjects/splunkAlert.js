'use strict';

/**
 * Class representing a splunkAlert object
 */
class SplunkAlert {

  /**
   * Create a SpunkAlert object
   * @param alert
   */
  constructor(alert) {
    this.body = JSON.stringify(alert);
  }
}

module.exports = SplunkAlert;
