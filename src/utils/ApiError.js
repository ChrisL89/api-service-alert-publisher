'use strict';

const ApiError = require('@tabdigital/api-error')();

ApiError.code = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  BAD_REQUEST_ERROR: 'BAD_REQUEST_ERROR',
};
ApiError.status = {
  VALIDATION_ERROR: 503,
  BAD_REQUEST_ERROR: 400,
};

Object.freeze(ApiError);

module.exports = ApiError;