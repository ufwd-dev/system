'use strict';

const {
	isAccountSignedIn,
	isAccountUnsignedIn,
	signIn,
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	createAccount,
	serviceSignIn,
	getAccountList,
	getAccount,
	updateAccount,
	deleteAccount,
	updatePassword,
	createAdministrator,
	getAdministratorList,
	getAdministrator,
	deleteAdministrator
} = require('express-handler-loader')('ufwd');

const router = module.exports = require('express').Router();
const session = require('express-session');

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
					pattern: '(^male$|^female$)'
				},
				phone: {
					type: 'string',
					pattern: '(^1[3|4|5|8][0-9]{5,9}$)'
				}
			},
			required: ['name', 'sex', 'phone']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), createAccount);

router.post('/api/ufwd/service/account/session', serviceSignIn);

router.get('/api/ufwd/service/account', $testQuery({
	properties: {
		examine: {
			type: 'string',
			pattern: '(^true$|^false$)'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getAccountList);

router.get('/api/ufwd/service/account/:accountId', isAccountSignedIn, getAccount);

router.put('/api/ufwd/service/account/:accountId', $testBody({
	properties: {
		examine: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['examine']
}), isAccountSignedIn, updateAccount);

router.delete('/api/ufwd/service/account/:accountId', isAccountSignedIn, deleteAccount);

router.patch('/api/ufwd/service/account/:accountId/password', $testBody({
	properties: {
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 32
		}
	},
	additionalProperties: false,
	required: ['password']
}), isAccountSignedIn, updatePassword);

router.post('/api/ufwd/service/administrator', isAccountSignedIn, createAdministrator);

router.get('/api/ufwd/service/administrator', isAccountSignedIn, getAdministratorList);

router.get('/api/ufwd/service/administrator/:administratorId', isAccountSignedIn, getAdministrator);

router.delete('/api/ufwd/service/administrator/:administratorId', isAccountSignedIn, deleteAdministrator);

router.post('/api/ufwd/app/account/session', signIn);



