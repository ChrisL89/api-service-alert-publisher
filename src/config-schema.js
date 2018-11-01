'use strict';

const strummer = require('strummer');

const CONFIG = new strummer.object({
  pkg: {
    name: 'string',
    version: 'string',
    description: 'string'
  },
  version: {
    releaseVersion: strummer.string({optional: true})
  },
  log: {
    logFile: strummer.string({optional: true}),
    logLevel: strummer.string({optional: true})
  },
  debug: {
    showStackTrace: strummer.string({optional: true})
  },
  apiServer: {
    publicUrl: strummer.string(),
    serverPort: strummer.number({parse: true}),
    redisHost: 'string',
    redisPort: strummer.number({parse: true}),
    redisQueueName: 'string',
    redisNamespace: 'string'
  },
  kafkaConfig: {
    nodeEnv: 'string',
    kafkaRestProxyURL: 'string',
    schemaRegistryURL: 'string',
    kafkaRestProxyUsername: strummer.string({optional: true}),
    kafkaRestProxyPassword: strummer.string({optional: true}),
    schemaLocalRepoLifetime: 'string',
    topicPrefix: strummer.string({optional: true})
  },
  splunkConfig: {
    name: 'string'
  }
});

module.exports = {
  CONFIG
};
