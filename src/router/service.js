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
	updateAccountExamine,
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
					type: 'string'
				}
			},
			additionalProperties: false,
			required: ['name', 'sex', 'phone', 'identification']
		}
	},
	additionalProperties: false,
	required: ['name', 'password', 'ufwd']
}), createAccount, ufwdServiceCreateAccount);

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
			type: 'string'
		},
		sex: {
			type: 'string',
			pattern: '(^male$|^female$)'
		}
	},
	additionalProperties: false
}), getAccountList);

router.get('/account/:accountId', getAccount);

router.put('/account/:accountId/examine', $testBody({
	properties: {
		examine: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['examine']
}), updateAccountExamine);

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
					type: 'string'
				}
			}
		}
	},
	additionalProperties: false
}), ufwdUpdateAccount);

router.delete('/account/:accountId', getAccount, deleteAccount);

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
	required: ['account']
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

router.post('/group/:groupId/account/:accountId', getGroup, getAccount, createMember);

router.get('/account/:accountId/group', getAccount, getMemberGroupList);

router.get('/account/:accountId/group/:groupId', getAccount, getGroup, getMemberGroup);

router.delete('/account/:accountId/group/:groupId', getAccount, getGroup, deleteMemberAccount);

router.get('/group/:groupId/account', getGroup, getMemberAccountList);

router.get('/group/:groupId/account/:accountId', getGroup, getAccount, getMemberAccount);

router.delete('/group/:groupId/account/:accountId', getGroup, getAccount, deleteMemberAccount);

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