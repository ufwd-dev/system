'use strict';

const {
	serviceSignout,
	serviceSignIn
} = require('express-handler-loader')('ufwd');
const appRouter = require('./app');
const serviceRouter = require('./service');

const router = module.exports = require('express').Router();

router.use('/ufwd/app', appRouter);

router.use('/ufwd/service', serviceRouter);

router.post('/account/session', serviceSignIn);

router.delete('/account/session', serviceSignout);

const {
	isAccountSignedIn,
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	isAdminiSignedIn,
	createActivity,
	getActivityList,
	getActivity,
	isPublished,
	updateActivity,
	deleteAttendance,
	// deleteActivity,
	// createActivityTag,
	// deleteActivityTag,
	// getAccountAttendanceList,
	getActivityAttendanceList,
	getPublishedActivityList,
	createAttendance,
	updateAttendance,
	changeStatus,
	redirect,
	getOwnAttendance,
	getAttendancedList
} = require('express-handler-loader')('ufwd');

router.post('/ufwd/service/activity', $testBody({
	properties: {
		title: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		},
		location: {
			type: 'string',
			minLength: 4
		},
		abstract: {
			type: 'string'
		},
		start: {
			type: 'string',
			format: 'date-time'
		},
		end: {
			type: 'string',
			format: 'date-time'
		},
		published: {
			type: 'boolean'
		}
	},
	required: ['title', 'description', 'location', 'abstract', 'start', 'end', 'published'],
	additionalProperties: false
}), isAdminiSignedIn, createActivity);

router.get('/ufwd/service/activity', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		tag: {
			type: 'string'
		},
		published: {
			type: 'string',
			pattern: '(^true$|^false$)'
		},
		start: {
			type: 'string',
			format: 'date-time'
		},
		end: {
			type: 'string',
			format: 'date-time'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getActivityList);

router.get('/ufwd/service/activity/:activityId', isAdminiSignedIn, getActivity);

router.put('/ufwd/service/activity/:activityId', $testBody({
	properties: {
		title: {
			type: 'string',
			minLength: 4
		},
		description: {
			type: 'string'
		},
		location: {
			type: 'string',
			minLength: 4
		},
		abstract: {
			type: 'string'
		},
		start: {
			type: 'string',
			format: 'date-time'
		},
		end: {
			type: 'string',
			format: 'date-time'
		},
		published: {
			type: 'boolean'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, isPublished, updateActivity);

// router.delete('/ufwd/service/activity/:activityId', isAdminiSignedIn, isPublished, deleteActivity);

// router.post('/ufwd/service/activity/:activityId/tag', $testBody({
// 	properties: {
// 		tag: {
// 			type: 'string'
// 		}
// 	},
// 	additionalProperties: false,
// 	required: ['tag']
// }), isAdminiSignedIn, isPublished, createActivityTag);

// router.delete('/ufwd/service/activity/tag/:tagId', isAdminiSignedIn, deleteActivityTag);

router.get('/ufwd/service/activity/:activityId/attendance', isAdminiSignedIn, getActivityAttendanceList);

// router.get('/ufwd/service/account/:accountId/activity', isAdminiSignedIn, getAccountAttendanceList);

router.post('/ufwd/service/attendance', $testBody({
	properties: {
		groupId: {
			type: 'number'
		},
		accountId: {
			type: 'number'
		},
		activityId: {
			type: 'number'
		}
	},
	additionalProperties: false,
	required: ['activityId']
}), isAdminiSignedIn, createAttendance);

router.put('/ufwd/service/activity/:activityId/account/:accountId/attendance', isAdminiSignedIn, changeStatus);

router.delete('/ufwd/service/activity/:activityId/account/:accountId', isAdminiSignedIn, deleteAttendance);

router.get('/ufwd/app/activity', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		tag: {
			type: 'string'
		},
		start: {
			type: 'string',
			format: 'date-time'
		},
		end: {
			type: 'string',
			format: 'date-time'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getPublishedActivityList);

router.put('/ufwd/app/activity/:token/account', isAccountSignedIn, updateAttendance);

router.get('/ufwd/app/activity/:token/account', redirect);

router.get('/ufwd/app/activity/:activityId', isAccountSignedIn, getOwnAttendance);

router.get('/ufwd/app/attendance/activity', isAccountSignedIn, getAttendancedList);
