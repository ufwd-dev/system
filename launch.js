'use strict';
const { bootstrap } = require('lemonitor-service');

require('./');

bootstrap(options => {
	options.forceSync = true;
});

module.exports = require('lemonitor-application/webpack.dev');