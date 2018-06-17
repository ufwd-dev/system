'use strict';

const {
	isAccountSignedIn,
	isAccountUnsignedIn,
	signOut,
	$testBody,
	createAccount
} = require('express-handler-loader')('all');

const {
	signIn,
	ufwdCreateAccount,
	createAdvise,
	getOwnAdviseList,
	getOwnAdvise,
	getInformation,
	updateInformation,
	updateOwnPassword,
	getOwnNotification,
	getOwnNotificationList,
	deleteOwnNotification,
	getOwnGroup,
	getOwnGroupList,
	getParty,
	getStreet,
	getPartyList,
	getStreetList,
	getIdentityList,
	createIdentityLabelList,
	getOwnIdentityLabelList,
	deleteIdentityLabel
} = require('express-handler-loader')('ufwd');

const router = module.exports = require('express').Router();

router.post('/account', $testBody({
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
				},
				identification: {
					type: 'string',
					pattern: '(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$)'
				},
				party: {
					type:  ['number', 'null']
				},
				street: {
					type: 'number'
				},
				unit: {
					type: 'string'
				},
				job: {
					type: 'string'
				}
			},
			required: ['name', 'sex', 'phone', 'identification']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), isAccountUnsignedIn, createAccount, getParty, getStreet, ufwdCreateAccount);

router.post('/account/session', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 32
		}
	},
	additionalProperties: false,
	required: ['name', 'password']
}), isAccountUnsignedIn, signIn);

router.delete('/account/session', isAccountSignedIn, signOut);

router.post('/advise', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		content: {
			type: 'string'
		},
		category: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, createAdvise);

router.get('/advise', isAccountSignedIn, getOwnAdviseList);

router.get('/advise/:adviseId', isAccountSignedIn, getOwnAdvise);

router.get('/account', isAccountSignedIn, getInformation);

router.put('/account', $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4,
			maxLength: 128
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
				},
				identification: {
					type: 'string',
					pattern: '(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$)'
				},
				party: {
					type:  ['number', 'null']
				},
				street: {
					type: 'number' 
				},
				job: {
					type: 'string'
				},
				unit: {
					type: 'string'
				}
			},
		}
	},
	additionalProperties: false,
}), isAccountSignedIn, getParty, getStreet, updateInformation);

router.patch('/account/password', $testBody({
	properties: {
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 32
		}
	},
	additionalProperties: false,
	required: ['password']
}), isAccountSignedIn, updateOwnPassword);

router.get('/notification', isAccountSignedIn, getOwnNotificationList);

router.get('/notification/:notificationId', isAccountSignedIn, getOwnNotification);

router.delete('/notification/:notificationId', isAccountSignedIn, getOwnNotification, deleteOwnNotification);

router.get('/group', isAccountSignedIn, getOwnGroupList);

router.get('/group/:groupId', isAccountSignedIn, getOwnGroup);

router.get('/identity', getIdentityList);

router.get('/party', getPartyList);

router.get('/street', getStreetList);

router.post('/identity/account/:accountId', $testBody({
	properties: {
		identityPool: {
			type: 'array',
			items: { 
				type: 'number'
			}
		}
	},
	additionalProperties: false,
	required: ['identityPool']
}), createIdentityLabelList);

router.get('/account/identity', isAccountSignedIn, getOwnIdentityLabelList);

router.delete('/identity/:identityId/account/:accountId', isAccountSignedIn, deleteIdentityLabel);