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
	deleteAdministrator,
	createChannel,
	getChannelList,
	getChannel,
	updateChannel,
	deleteChannel,
	// createWriter,
	// getWriterList,
	// getWriter,
	// deleteWriter
	createGroup,
	getGroupList,
	getGroup,
	updateGroup,
	deleteGroup,
	getMemberGroupList,
	getMemberGroup,
	getMemberAccountList,
	getMemberAccount,
	createMember,
	deleteMemberAccount
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
}), isAccountSignedIn, getAccount, updateAccount);

router.delete('/api/ufwd/service/account/:accountId', isAccountSignedIn, getAccount, deleteAccount);

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

router.delete('/api/ufwd/service/administrator/:administratorId', isAccountSignedIn, getAdministrator, deleteAdministrator);

router.post('/api/ufwd/service/channel', $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name', 'description']
}), isAccountSignedIn, createChannel);

router.get('/api/ufwd/service/channel', isAccountSignedIn, getChannelList);

router.get('/api/ufwd/service/channel/:channelId', isAccountSignedIn, getChannel);

router.put('/api/ufwd/service/channel/:channelId', isAccountSignedIn, $testBody({
	properties: {
		name: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getChannel, updateChannel);

router.delete('/api/ufwd/service/channel/:channelId', isAccountSignedIn, getChannel, deleteChannel);

// router.post('/api/ufwd/service/writer', isAccountSignedIn, createWriter);

// router.get('/api/ufwd/service/writer', isAccountSignedIn, getWriterList);

// router.get('/api/ufwd/service/writer/:writerId', isAccountSignedIn, getWriter);

// router.delete('/api/ufwd/service/writer/:writerId', isAccountSignedIn, deleteWriter);

router.post('/api/ufwd/service/group', $testBody({
	properties: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name', 'description']
}), isAccountSignedIn, createGroup);

router.get('/api/ufwd/service/group', isAccountSignedIn, getGroupList);

router.get('/api/ufwd/service/group/:groupId', isAccountSignedIn, getGroup);

router.put('/api/ufwd/service/group/:groupId', isAccountSignedIn, $testBody({
	properties: {
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getGroup, updateGroup);

router.delete('/api/ufwd/service/group/:groupId', isAccountSignedIn, getGroup, deleteGroup);

router.post('/api/ufwd/service/group/:groupId/account/:accountId', isAccountSignedIn, getGroup, getAccount, createMember);

router.get('/api/ufwd/service/account/:accountId/group', isAccountSignedIn, getAccount, getMemberGroupList);

router.get('/api/ufwd/service/account/:accountId/group/:groupId', isAccountSignedIn, getAccount, getGroup, getMemberGroup);

router.delete('/api/ufwd/service/account/:accountId/group/:groupId', isAccountSignedIn, getAccount, getGroup, deleteMemberAccount);

router.get('/api/ufwd/service/group/:groupId/account', isAccountSignedIn, getGroup, getMemberAccountList);

router.get('/api/ufwd/service/group/:groupId/account/:accountId', isAccountSignedIn, getGroup, getAccount, getMemberAccount);

router.delete('/api/ufwd/service/group/:groupId/account/:accountId', isAccountSignedIn, getGroup, getAccount, deleteMemberAccount);

router.post('/api/ufwd/app/account/session', signIn);



