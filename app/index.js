'use strict';
import app from 'app';
import './global-component.js';

import Home from 'app/component/Home.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';

import User from  './component/account/User.vue';
import Info from  './component/account/Info.vue';
import Group from './component/account/group/Group.vue';
import GroupDetail from './component/account/group/Detail.vue';

app.menu.addGroup('ufwd.menu.account', [
	{
		label: 'ufwd.account.user',
		path: '/ufwd/account/user-list'
	},
	{
		label: 'ufwd.account.group',
		path: '/ufwd/account/group'
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
				path: 'user-list',
				component: User
			},
			{
				path: 'user-list/:id/info',
				component: Info
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

import Notification from  './component/system/notification/Notification.vue';
import AddNotification from  './component/system/notification/New.vue';
import Advice from  './component/system/Advice.vue';

app.menu.addGroup('ufwd.menu.system', [
	{
		label: 'ufwd.system.notification',
		path: '/ufwd/system/notification'
	},
	{
		label: 'ufwd.system.advice',
		path: '/ufwd/system/advice'
	},
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
		]
	}
]);
