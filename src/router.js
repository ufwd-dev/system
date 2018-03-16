'use strict';

const {
	isAccountSignedIn,
	isAccountUnsignedIn,
	signOut,
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	isAdminiSignedIn,
	signIn,
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
	createWriter,
	getWriterList,
	getWriter,
	updateWriter,
	deleteWriter,
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
	createAdvise,
	getOwnAdviseList,
	getOwnAdvise,
	getAdviseList,
	getAdvise,
	deleteAdvise,
	getInformation,
	updateInformation,
	updateOwnPassword,
	createOwnSubscribe,
	getOwnSubscribeList,
	getOwnSubscribe,
	deleteOwnSubscribe,
	getOwnNotification,
	getOwnNotificationList,
	deleteOwnNotification,
	getOwnGroup,
	getOwnGroupList
} = require('express-handler-loader')('ufwd');

const router = module.exports = require('express').Router();

router.post('/api/ufwd/app/account', $testBody({
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
}), isAccountUnsignedIn, createAccount);

router.post('/api/ufwd/service/account/session', isAccountUnsignedIn, serviceSignIn);

router.delete('/api/ufwd/service/account/session', signOut);

router.get('/api/ufwd/service/account', $testQuery({
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
		sex: {
			type: 'string',
			pattern: '(^male$|^female$)'
		},
	},
	additionalProperties: false
}), isAdminiSignedIn, getAccountList);

router.get('/api/ufwd/service/account/:accountId', isAdminiSignedIn, getAccount);

router.put('/api/ufwd/service/account/:accountId', $testBody({
	properties: {
		examine: {
			type: 'boolean'
		}
	},
	additionalProperties: false,
	required: ['examine']
}), isAdminiSignedIn, updateAccount);

router.delete('/api/ufwd/service/account/:accountId', isAdminiSignedIn, getAccount, deleteAccount);

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
}), isAdminiSignedIn, getAccount, updatePassword);

router.post('/api/ufwd/service/administrator', isAdminiSignedIn, createAdministrator);

router.get('/api/ufwd/service/administrator', isAdminiSignedIn, getAdministratorList);

router.get('/api/ufwd/service/administrator/:administratorId', isAdminiSignedIn, getAdministrator);

router.delete('/api/ufwd/service/administrator/:administratorId', isAdminiSignedIn, getAdministrator, deleteAdministrator);

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

router.get('/api/ufwd/service/channel', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getChannelList);

router.get('/api/ufwd/service/channel/:channelId', isAdminiSignedIn, getChannel);

router.put('/api/ufwd/service/channel/:channelId', $testBody({
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
}), isAdminiSignedIn, getChannel, updateChannel);

router.delete('/api/ufwd/service/channel/:channelId', isAdminiSignedIn, getChannel, deleteChannel);

router.post('/api/ufwd/service/writer', isAdminiSignedIn, createWriter);

router.get('/api/ufwd/service/writer', $testQuery({
	properties: {
		accountId: {
			type: 'string'
		},
		channelId: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getWriterList);

router.get('/api/ufwd/service/writer/:writerId', isAdminiSignedIn, getWriter);

router.put('/api/ufwd/service/writer/:writerId', $testBody({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getWriter, updateWriter);

router.delete('/api/ufwd/service/writer/:writerId', isAdminiSignedIn, getWriter, deleteWriter);

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
}), isAdminiSignedIn, createGroup);

router.get('/api/ufwd/service/group', $testQuery({
	properties: {
		name: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getGroupList);

router.get('/api/ufwd/service/group/:groupId', isAdminiSignedIn, getGroup);

router.put('/api/ufwd/service/group/:groupId', $testBody({
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

router.delete('/api/ufwd/service/group/:groupId', isAdminiSignedIn, getGroup, deleteGroup);

router.post('/api/ufwd/service/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getAccount, createMember);

router.get('/api/ufwd/service/account/:accountId/group', isAdminiSignedIn, getAccount, getMemberGroupList);

router.get('/api/ufwd/service/account/:accountId/group/:groupId', isAdminiSignedIn, getAccount, getGroup, getMemberGroup);

router.delete('/api/ufwd/service/account/:accountId/group/:groupId', isAdminiSignedIn, getAccount, getGroup, deleteMemberAccount);

router.get('/api/ufwd/service/group/:groupId/account', isAdminiSignedIn, getGroup, getMemberAccountList);

router.get('/api/ufwd/service/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getAccount, getMemberAccount);

router.delete('/api/ufwd/service/group/:groupId/account/:accountId', isAdminiSignedIn, getGroup, getAccount, deleteMemberAccount);

router.post('/api/ufwd/service/notification', $testBody({
	properties: {
		recevier: {
			type: 'number'
		},
		content: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, createNotification);

router.get('/api/ufwd/service/notification', $testQuery({
	properties: {
		recevier: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getNotificationList);

router.get('/api/ufwd/service/notification/:notificationId', isAdminiSignedIn, getNotification);

router.post('/api/ufwd/app/advise', $testBody({
	properties: {
		content: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, createAdvise);

router.get('/api/ufwd/app/advise', isAccountSignedIn, getOwnAdviseList);

router.get('/api/ufwd/app/advise/:adviseId', isAccountSignedIn, getOwnAdvise);

router.get('/api/ufwd/service/advise', $testQuery({
	properties: {
		accountId: {
			type: 'string'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getAdviseList);

router.get('/api/ufwd/service/advise/:adviseId', isAdminiSignedIn, getAdvise);

router.delete('/api/ufwd/service/advise/:adviseId', isAdminiSignedIn, getAdvise, deleteAdvise);

router.get('/api/ufwd/app/account', isAccountSignedIn, getInformation);

router.put('/api/ufwd/app/account', $testBody({
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
				}
			},
		}
	},
	additionalProperties: false,
}), isAccountSignedIn, updateInformation);

router.patch('/api/ufwd/app/account/password', $testBody({
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

router.post('/api/ufwd/app/channel/:channelId', isAccountSignedIn, createOwnSubscribe);

router.get('/api/ufwd/app/channel', isAccountSignedIn, getOwnSubscribeList);

router.get('/api/ufwd/app/channel/:channelId', isAccountSignedIn, getOwnSubscribe);

router.delete('/api/ufwd/app/channel/:channelId', isAccountSignedIn, getOwnSubscribe, deleteOwnSubscribe);

router.get('/api/ufwd/app/notification', isAccountSignedIn, getOwnNotificationList);

router.get('/api/ufwd/app/notification/:notificationId', isAccountSignedIn, getOwnNotification);

router.delete('/api/ufwd/app/notification/:notificationId', isAccountSignedIn, getOwnNotification, deleteOwnNotification);

router.get('/api/ufwd/app/group', isAccountSignedIn, getOwnGroupList);

router.get('/api/ufwd/app/group/:groupId', isAccountSignedIn, getOwnGroup);

router.post('/api/ufwd/app/account/session', $testBody({
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
		phone: {
			type: 'string',
			pattern: '(^1[3|4|5|8][0-9]{5,9}$)'
		}
	},
	additionalProperties: false,
	required: ['password']
}), isAccountUnsignedIn, signIn);

router.delete('/api/ufwd/app/account/session', isAccountSignedIn, signOut);



