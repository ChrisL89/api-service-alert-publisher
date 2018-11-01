'use strict';

global.chai = require('chai');
global.expect = global.chai.expect;

process.env.PUBLIC_URL = 'localhost';
process.env.SERVER_PORT = 8080;
process.env.REDIS_HOST = 'redis';
process.env.REDIS_PORT = 6379;
process.env.KAFKA_PROXY_ENDPOINT = 'http://kafka:8082';
process.env.KAFKA_SCHEMA_REGISTRY_ENDPOINT = 'http://kafka:8081';
