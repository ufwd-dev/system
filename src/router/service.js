'use strict';

const {
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	ufwdServiceCreateAccount,
	getAccountList,
	getAccount,
	validateAccount,
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
	createIdentity,
	getIdentityList,
	getIdentityLabelList,
	createMemberList,
	isAdminiSignedIn,
	createIdentityLabel,
	createIdentityLabelList,
	deleteIdentityLabel,
	updateAdministrator
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
					pattern: '(^1[3|4|5|6|7|8|9][0-9]{9}$)'
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
				},
				unit: {
					type: 'string'
				},
				job: {
					type: 'string'
				}
			},
			additionalProperties: false,
			required: ['name', 'sex', 'phone', 'identification', 'examine', 'party', 'street', 'unit', 'job']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), isAdminiSignedIn, getParty, getStreet, ufwdServiceCreateAccount);

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
			type: 'string',
			pattern: '(^1[3|4|5|6|7|8|9][0-9]{9}$)'
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
}), isAdminiSignedIn, getAccountList);

router.get('/validate/account', $testQuery({
	properties: {
		name: {
			type: 'string'
		},
		phone: {
			type: 'string'
		},
		identification: {
			type: 'string'
		},
	},
	additionalProperties: false
}), isAdminiSignedIn, validateAccount);

router.get('/account/:accountId', isAdminiSignedIn, getAccount);

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
				},
				unit: {
					type: 'string'
				},
				job: {
					type: 'string'
				}
			}
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getParty, getStreet, ufwdUpdateAccount);

router.delete('/account/:accountId', isAdminiSignedIn, getRealAccount, deleteAccount);

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
}), isAdminiSignedIn, updatePassword);

router.post('/administrator', $testBody({
	properties: {
		accountId: {
			type: 'number'
		},
		transmitter: {
			type: 'object'
		}
	},
	additionalProperties: false,
	required: ['accountId']
}), isAdminiSignedIn, createAdministrator);

router.get('/administrator', isAdminiSignedIn, getAdministratorList);

router.get('/account/:accountId/administrator', isAdminiSignedIn, getAdministrator);

router.put('/administrator/:administratorId', $testBody({
	properties: {
		transmitter: {
			type: 'object'
		}
	}
}), isAdminiSignedIn, getAdministrator, updateAdministrator);

router.delete('/administrator/:administratorId', isAdminiSignedIn, getAdministrator, deleteAdministrator);

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
}), isAdminiSignedIn, createGroup);

router.get('/group', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getGroupList);

router.get('/group/:groupId', isAdminiSignedIn, getGroup);

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
}), isAdminiSignedIn, getGroup, updateGroup);

router.delete('/group/:groupId', isAdminiSignedIn, getGroup, deleteGroup);

router.post('/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getRealAccount, createMember);

router.post('/account/:accountId/group', $testBody({
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
}), isAdminiSignedIn, getRealAccount, createMemberList);

router.get('/account/:accountId/group', isAdminiSignedIn, getRealAccount, getMemberGroupList);

router.get('/account/:accountId/group/:groupId', isAdminiSignedIn, getRealAccount, getGroup, getMemberGroup);

router.delete('/account/:accountId/group/:groupId', isAdminiSignedIn, getRealAccount, getGroup, deleteMemberAccount);

router.get('/group/:groupId/account', isAdminiSignedIn, getGroup, getMemberAccountList);

router.get('/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getRealAccount, getMemberAccount);

router.delete('/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getRealAccount, deleteMemberAccount);

router.post('/identity/:identityId/account/:accountId', isAdminiSignedIn, createIdentityLabel);

router.post('/account/:accountId/identity', $testBody({
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
}), isAdminiSignedIn, createIdentityLabelList);

router.get('/account/:accountId/identity', isAdminiSignedIn, getIdentityLabelList);

router.delete('/identity/:identityId/account/:accountId', isAdminiSignedIn, deleteIdentityLabel);

router.post('/notification', $testBody({
	properties: {
		groupList: {
			type: 'array',
			items: {
				type: 'number'
			}
		},
		accountList: {
			type: 'array',
			items: {
				type: 'number'
			}
		},
		content: {
			type: 'string',
			minLength: 1
		},
		title: {
			type: 'string',
			minLength: 1
		}
	},
	required: ['content'],
	additionalProperties: false
}), isAdminiSignedIn, createNotification);

router.get('/notification', $testQuery({
	properties: {
		receiver: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getNotificationList);

router.get('/notification/:notificationId', isAdminiSignedIn, getNotification);
router.get('/advise', $testQuery({
	properties: {
		accountId: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getAdviseList);

router.get('/advise/:adviseId', isAdminiSignedIn, getAdvise);

router.delete('/advise/:adviseId', isAdminiSignedIn, getAdvise, deleteAdvise);

router.post('/party', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name']
}), isAdminiSignedIn, createParty);

router.get('/party', isAdminiSignedIn, getPartyList);

router.post('/street', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name']
}), isAdminiSignedIn, createStreet);

router.get('/street', isAdminiSignedIn, getStreetList);

router.post('/identity', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['name']
}), isAdminiSignedIn, createIdentity);

router.get('/identity', isAdminiSignedIn, getIdentityList);