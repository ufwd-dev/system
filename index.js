'use strict';
const path = require('path');
const { appendEntry, appendAlias } = require('lemonitor-application');

require('./src/model');
require('express-handler-loader')('ufwd', {
	pathname: path.resolve(__dirname, './src/middleware')
});

const router = require('./src/router');

appendEntry('bundle', path.resolve(__dirname, './app'));
appendAlias('vuelidate$', 'vuelidate/dist/vuelidate.min.js');

const service = require('lemonitor-service');

service.extend((app) => {
	app.use('/api', router);
});
