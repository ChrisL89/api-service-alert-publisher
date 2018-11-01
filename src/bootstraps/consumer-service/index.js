'use strict';

const RSMQWorker = require('rsmq-worker');
const server = require('./server');
const env = require('../../env');
const log = require('../../log');
const publisher = require('../../publisher/publishers');
const Alert = require('../../model/alert');

function service(next) {

  const options = {
    host: env.apiServer.redisHost,
    port: env.apiServer.redisPort,
    ns: env.apiServer.redisNamespace
  };
  const redisQueueName = env.apiServer.redisQueueName;
  const worker = new RSMQWorker(redisQueueName, options);

  log.info('Initializing rsmq worker');
  worker.on('message', function (msg, next, id ){
    // process your message
    log.info(`Message id : ${id}`);
    log.info(`Message: ${msg}`);

    const jsonMessage = JSON.parse(msg);
    //Create Alert object out of jsonMessage
    const  alert = new Alert(jsonMessage);
    //Publisher will work out which storage it needs to go and publish it
    publisher.publish(alert);
    next();
  });
  // optional error listeners
  worker.on('error', function ( err, msg ){
    log.error( 'ERROR', err, msg.id );
  });
  worker.on('exceeded', function ( msg ){
    log.error( 'EXCEEDED', msg.id );
  });
  worker.on('timeout', function ( msg ){
    log.error( 'TIMEOUT', msg.id, msg.rc );
  });
  worker.start();

  //Bring up api service
  const app = server.create();
  app.listen(env.apiServer.serverPort, next);
  log.info(`API Service is available at ${env.apiServer.publicUrl}:${env.apiServer.serverPort}`);
}

module.exports = service;

