'use strict';

const {
	$testBody,
	$testQuery,
	createAccount
} = require('express-handler-loader')('all');

const {
	ufwdServiceCreateAccount,
	getAccountList,
	getAccount,
	getRealAccount,
	ufwdUpdateAccount,
	deleteAccount,
	updatePassword,
	createAdministrator,
	getAdministratorList,
	getAdministrator,
	deleteAdministrator,
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
	deleteMemberAccount,
	createNotification,
	getNotificationList,
	getNotification,
	getAdviseList,
	getAdvise,
	deleteAdvise,
	createParty,
	getPartyList,
	createStreet,
	getStreetList,
	getStreet,
	getParty,
	createMemberList
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
				}
			},
			additionalProperties: false,
			required: ['name', 'sex', 'phone', 'identification', 'party', 'street']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), createAccount, getParty, getStreet, ufwdServiceCreateAccount);

router.get('/account', $testQuery({
	properties: {
		name: {
			type: 'string'
		},
		examine: {
			type: 'string',
			pattern: '(^true$|^false$)'
		},
		username: {
			type: 'string'
		},
		phone: {
			type: 'string'
		},
		identification: {
			type: 'string',
			pattern: '(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$)'
		},
		sex: {
			type: 'string',
			pattern: '(^male$|^female$)'
		},
		party: {
			type:  ['number', 'null']
		},
		street: {
			type: 'number'
		}
	},
	additionalProperties: false
}), getAccountList);

router.get('/account/:accountId', getAccount);

router.put('/account/:accountId', $testBody({
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
				examine: {
					type: 'boolean'
				},
				party: {
					type:  ['number', 'null']
				},
				street: {
					type: 'number'
				}
			}
		}
	},
	additionalProperties: false
}), getParty, getStreet, ufwdUpdateAccount);

router.delete('/account/:accountId', getRealAccount, deleteAccount);

router.patch('/account/:accountId/password', $testBody({
	properties: {
		password: {
			type: 'string',
			minLength: 6,
			maxLength: 32
		}
	},
	additionalProperties: false,
	required: ['password']
}), updatePassword);

router.post('/administrator', $testBody({
	properties: {
		accountId: {
			type: 'number'
		}
	},
	additionalProperties: false,
	required: ['accountId']
}), createAdministrator);

router.get('/administrator', getAdministratorList);

router.get('/administrator/:administratorId', getAdministrator);

router.delete('/administrator/:administratorId', getAdministrator, deleteAdministrator);

router.post('/group', $testBody({
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
}), createGroup);

router.get('/group', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getGroupList);

router.get('/group/:groupId', getGroup);

router.put('/group/:groupId', $testBody({
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

router.delete('/group/:groupId', getGroup, deleteGroup);

router.post('/group/:groupId/account/:accountId', getGroup, getRealAccount, createMember);

router.post('/group/account/:accountId', $testBody({
	properties: {
		groupPool: {
			type: 'array',
			items: { 
				type: 'number'
			}
		}
	},
	additionalProperties: false,
	required: ['groupPool']
}), getRealAccount, createMemberList);

router.get('/account/:accountId/group', getRealAccount, getMemberGroupList);

router.get('/account/:accountId/group/:groupId', getRealAccount, getGroup, getMemberGroup);

router.delete('/account/:accountId/group/:groupId', getRealAccount, getGroup, deleteMemberAccount);

router.get('/group/:groupId/account', getGroup, getMemberAccountList);

router.get('/group/:groupId/account/:accountId', getGroup, getRealAccount, getMemberAccount);

router.delete('/group/:groupId/account/:accountId', getGroup, getRealAccount, deleteMemberAccount);

router.post('/notification', $testBody({
	properties: {
		recevierList: {
			type: 'array',
			items: {
				type: 'number'
			}
		},
		content: {
			type: 'string',
			minLength: 1
		}
	},
	required: ['recevierList', 'content'],
	additionalProperties: false
}), createNotification);

router.get('/notification', $testQuery({
	properties: {
		recevier: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getNotificationList);

router.get('/notification/:notificationId', getNotification);
router.get('/advise', $testQuery({
	properties: {
		accountId: {
			type: 'string'
		}
	},
	additionalProperties: false
}), getAdviseList);

router.get('/advise/:adviseId', getAdvise);

router.delete('/advise/:adviseId', getAdvise, deleteAdvise);

router.post('/party', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name']
}), createParty);

router.get('/party', getPartyList);

router.post('/street', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name']
}), createStreet);

router.get('/street', getStreetList);