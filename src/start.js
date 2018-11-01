'use strict';

const async = require('async');
const env = require('./env');
const consumerService = require('./bootstraps/consumer-service');
const log = require('./log');
const kafkaClient = require('@tabdigital/kafka-client');

process.on('uncaughtException', function (err) {
  const message = err.message || 'unknown error';
  log.error('Uncaught exception, shutting down the server: ' + message);
  log.error(err);
  process.exit(1);
});

process.on('SIGINT', function () {
  log.warn('SIGINT (Ctrl-C) received');
  process.exit(1);
});

process.on('SIGTERM', function () {
  log.warn('SIGTERM received');
  process.exit(1);
});

const kafkaConfig = env.kafkaConfig;
kafkaClient.init({
  nodeEnv: kafkaConfig.nodeEnv,
  schemaRegistryURL: kafkaConfig.schemaRegistryURL,
  kafkaRestProxyURL: kafkaConfig.kafkaRestProxyURL,
  kafkaRestProxyUsername: kafkaConfig.kafkaRestProxyUsername,
  kafkaRestProxyPassword: kafkaConfig.kafkaRestProxyPassword,
  topicPrefix: kafkaConfig.topicPrefix,
  logger: log
});

function ready(err) {
  if (err) {
    log.error('Failed to start: ' + err.message);
    process.exit(1);
  } else {
    log.info(`${env.pkg.name} is ready.`);
  }
}

async.series([
  next => consumerService(next),
], ready);
