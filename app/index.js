'use strict';
import app from 'app';
import './global-component.js';

import Home from 'app/component/Home.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';

import User from  './component/account/User.vue';
import Info from  './component/account/Info.vue';
import AddUser from './component/account/AddUser.vue';

app.menu.addGroup('ufwd.account', [
	{
		label: 'account.user',
		path: '/ufwd/account/user'
	},
	{
		label: 'account.create',
		path: '/ufwd/account/create'
	}
]);

app.router.addRoutes([
	{
		path: '/ufwd/account',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'user',
				component: User
			},
			{
				path: 'user/:id/info',
				component: Info
			},
			{
				path: 'create',
				component: AddUser
			}
		]
	}
]);

import Notification from  './component/system/notification/Notification.vue';
import AddNotification from  './component/system/notification/New.vue';
import Advice from  './component/system/Advice.vue';
import Group from './component/system/group/Group.vue';
import GroupDetail from './component/system/group/Detail.vue';

app.menu.addGroup('ufwd.system', [
	{
		label: 'system.notification',
		path: '/ufwd/system/notification'
	},
	{
		label: 'system.advice',
		path: '/ufwd/system/advice'
	},
	{
		label: 'system.group',
		path: '/ufwd/system/group'
	}
]);

app.router.addRoutes([
	{
		path: '/ufwd/system',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'notification',
				component: Notification
			},
			{
				path: 'add-notification',
				component: AddNotification
			},
			{
				path: 'advice',
				component: Advice
			},
			{
				path: 'group',
				component: Group
			},
			{
				path: 'group/:id/detail',
				component: GroupDetail
			}
		]
	}
]);
