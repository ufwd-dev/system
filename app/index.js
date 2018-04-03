'use strict';
import app from 'app';
import './global-component.js';

import SignIn from './component/sign/SignIn.vue';
import Signup from './component/sign/SignUp.vue';

// console.log(app.store, app.router.options.routes[1]);

app.router.options.routes[1] = {
	path: '/account/signin',
	component: SignIn,
	meta: {
		requireAccount: false
	},
};
app.router.options.routes[2] = {
	path: '/account/signup',
	component: Signup,
	meta: {
		requireAccount: false
	},
};
// console.log(app.store, app.router.options.routes[1]);

import Home from 'app/component/Home.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';

// import axios from 'axios';
// import accountStore from 'app/store/module/account.js';

// accountStore.action.signIn = function ({ commit }, { name, password }) {
// 	return axios.post('/api/ufwd/service/session/account', {
// 		name, password
// 	}).then(({data}) => {
// 		commit('updateAccount', data.data.accountId);
// 	});
// };

import Account from  './component/account/Account.vue';
import Info from  './component/account/Info.vue';

import Administrator from './component/account/Administrator.vue';
import Writer from './component/account/Writer.vue';

app.menu.addGroup('ufwd.account', [
	{
		label: 'account.account',
		path: '/ufwd/account/all'
	},
	{
		label: 'account.administrator',
		path: '/ufwd/account/administrator'
	},
	{
		label: 'account.writer',
		path: '/ufwd/account/writer'
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
				path: 'all',
				alias: '/',
				component: Account
			},
			{
				path: 'account/:id/info',
				component: Info
			},
			{
				path: 'administrator',
				component: Administrator
			},
			{
				path: 'writer',
				component: Writer
			}
		]
	}
]);

import Channel from  './component/system/channel/Channel.vue';
import AddChannel from  './component/system/channel/New.vue';
import Notification from  './component/system/notification/Notification.vue';
import AddNotification from  './component/system/notification/New.vue';
import Advice from  './component/system/Advice.vue';
import Group from './component/system/group/Group.vue';
import AddGroup from './component/system/group/New.vue';
import GroupDetail from './component/system/group/Detail.vue';

app.menu.addGroup('ufwd.system', [
	{
		label: 'system.channel',
		path: '/ufwd/system/channel'
	},
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
				path: 'channel',
				component: Channel
			},
			{
				path: 'add-channel',
				component: AddChannel
			},
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
				path: 'add-group',
				component: AddGroup
			},
			{
				path: 'group/:id/detail',
				component: GroupDetail
			}
		]
	}
]);

import store from './store/index.js';
app.store = store;
