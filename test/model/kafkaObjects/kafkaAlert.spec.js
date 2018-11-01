'use strict';
const KafkaAlert = require('../../../src/model/kafkaObjects/kafkaAlert');

const details = {
  type: 'Critical',
  message: '$1000 AML threshhold has been triggered by customer:DWR-1557',
  component: 'AML',
  alertCode: 'C001',
  datetime: '2018-08-30T01:40:09.00Z',
  venueId: '25',
  terminalId: '88',
  deviceId: '4',
  deviceType: 'EBT',
  wageringId: '3330F484-3C0A-4459-965C-A810B8AFA646'
};

describe('KafkaAlert', () => {

  describe('eventType', function () {
    it('should return kafkaAlert', function () {
      const kafkaAlert = new KafkaAlert(details);
      expect(kafkaAlert.eventType).to.equal('MonitoringAlert');
    });
  });

  describe('Matcher', () => {

    it('should return valid Alert Kafka Object when passed valid  Alert Object', () => {

      const kafkaAlert = new KafkaAlert(details);
      const result = KafkaAlert.Matcher(kafkaAlert);
      expect(result[0]).to.be.empty;
      expect(result[1]).to.be.an.instanceof(KafkaAlert);

    });

    it('should return error list and object type undefined when valid json is not passed', () => {

      const wrongDetails = {
        type: 'Critical',
        message: '$1000 AML threshhold has been triggered by customer:DWR-1557',
        component: 'AML',
        alertCode: 'C001',
        datetime: 'WRONG DATE',
        venueId: '25',
        terminalId: '88',
        deviceId: '4',
        deviceType: 'EBT',
        wageringId: '3330F484-3C0A-4459-965C-A810B8AFA646'
      };

      const result = KafkaAlert.Matcher(wrongDetails);
      expect(result[0]).to.have.lengthOf(1);
      expect(result[1]).to.be.an('undefined');

    });

    it('should return error list and object type undefined when valid json is not passed', () => {

      const wrongDetails = {
        type: 'Critical',
        message: '$1000 AML threshhold has been triggered by customer:DWR-1557',
        component: 123,
        alertCode: 'C001',
        datetime: 'WRONG DATE',
        venueId: '25',
        terminalId: '88',
        deviceId: '4',
        deviceType: 'EBT',
        wageringId: '3330F484-3C0A-4459-965C-A810B8AFA646'
      };

      const result = KafkaAlert.Matcher(wrongDetails);
      expect(result[0]).to.have.lengthOf(2);
      expect(result[1]).to.be.an('undefined');

    });

  });

  describe('fromJSON', () => {

    it('should throw an error if invalid json object is passed',  () => {
      const wrongDetails = {
        type: 'Critical',
        message: '$1000 AML threshhold has been triggered by customer:DWR-1557',
        component: 123,
        alertCode: 'C001',
        datetime: 'WRONG DATE',
        venueId: '25',
        terminalId: '88',
        deviceId: '4',
        deviceType: 'EBT',
        wageringId: '3330F484-3C0A-4459-965C-A810B8AFA646'
      };

      expect(() => KafkaAlert.fromJSON(wrongDetails)).to.throw();

    });

  });

});
