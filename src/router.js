'use strict';

const {
	isAccountSignedIn,
	$testBody
} = require('express-handler-loader')('all');

const {
	createAccount
} = require('express-handler-loader')('ufwd');

const router = module.exports = require('express').Router();

router.post('/api/ufwd/service/account', $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4,
			maxLength: 128
		},
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 32
		},
		ufwd: {
			type: 'object',
			properties: {
				name: {
					type: 'string'
				},
				sex: {
					type: 'string',
					pattern: "['male'|'female']"
				},
				phone: {
					type: 'string',
					pattern: "1[3|4|5|8][0-9]{5,9}"
				}
			},
			required: ['name', 'sex', 'phone']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), createAccount);



