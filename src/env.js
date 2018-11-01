'use strict';

require('dotenv').config();
const pkg = require('../package.json');
const configSchema = require('./config-schema');
const env = {};

env.pkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
};

env.version = {
  releaseVersion: process.env.RELEASE_VERSION,
};

env.log = {
  logFile: process.env.LOG_FILE,
  logLevel: process.env.LOG_LEVEL || 'info',
};

env.debug = {
  showStackTrace: process.env.SHOW_STACK_TRACE,
};

env.apiServer = {
  //Main url for the web service endpoint
  publicUrl: process.env.PUBLIC_URL,
  //Web service port number
  serverPort: process.env.SERVER_PORT,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  //Redis queue name(queue used to store alert messages)
  redisQueueName: process.env.REDIS_QUEUE_NAME || 'monitoringAlert',
  //Redis queue name prefix
  redisNamespace: process.env.REDIS_NAMESPACE || 'rsmq'
};

env.kafkaConfig = {
  nodeEnv: process.env.NODE_ENV || 'dev',
  kafkaRestProxyURL: process.env.KAFKA_PROXY_ENDPOINT,
  schemaRegistryURL: process.env.KAFKA_SCHEMA_REGISTRY_ENDPOINT,
  kafkaRestProxyUsername: process.env.KAFKA_PROXY_USERNAME,
  kafkaRestProxyPassword: process.env.KAFKA_PROXY_PASSWORD,
  schemaLocalRepoLifetime: process.env.KAFKA_LOCAL_SCHEMA_LIFETIME || '5m',
  topicPrefix: process.env.TOPIC_PREFIX || 'dev'
};

env.splunkConfig = {
  name: process.env.SPLUNK_CHANNEL_NAME || 'monitoring-alert'
};

const errors = configSchema.CONFIG.match(env);
if (errors.length > 0) {
  throw new Error(`Environment variable validation failed, error: ${JSON.stringify(errors)}`);
}

module.exports = env;