'use strict';

const apiRouter = require('@tabdigital/connect-router');
const components = require('./components');
const swagger = require('./swagger');

const create = server => {
  const router = apiRouter();
  registerSwaggerRoutes(router);
  components.register(router, server);
  return router;
};

function registerSwaggerRoutes(router) {
  router.get({
    name: 'swagger-json',
    path: '/swagger.json',
    handlers: [(req, res) => res.send(toSwagger())],
  });
}

function toSwagger() {
  const router = apiRouter();
  components.register(router);
  return router.toSwagger(swagger.info);
}

module.exports = {
  create,
};
