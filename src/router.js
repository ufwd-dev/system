'use strict';

const {

} = require('express-handler-loader')('all');

const {
	createProfile
} = require('express-handler-loader')('ufwd');

const router = module.exports = require('express').Router();

router.post('/api/account', createProfile);



