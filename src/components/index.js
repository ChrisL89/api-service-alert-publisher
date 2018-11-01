'use strict';

function register(apiRouter) {
  require('./status/routes').register(apiRouter);
}

module.exports = {
  register
};
