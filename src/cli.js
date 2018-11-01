#!/usr/bin/env node
'use strict';

const apiServiceAlertPublisher = require('./');
const meow = require('meow');

const cli = meow(`
Usage
  $ api-service-alert-publisher [input]

Options
  --example   Example Input. [Default: false]

Examples
  $ api-service-alert-publisher --example=true bar
`);

apiServiceAlertPublisher(cli.input[0], cli.flags);
