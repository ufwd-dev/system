'use strict';

const {
	isAdminiSignedIn,
	serviceSignout,
	serviceSignIn
} = require('express-handler-loader')('ufwd');
const appRouter = require('./app');
const serviceRouter = require('./service');

const router = module.exports = require('express').Router();

router.use('/ufwd/app', appRouter);

router.use('/ufwd/service', isAdminiSignedIn, serviceRouter);

router.post('/account/session', serviceSignIn);

router.delete('/account/session', serviceSignout);