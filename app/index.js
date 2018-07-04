'use strict';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import app from 'app';
import Home from 'app/component/Home.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';

import Welcome from  './component/Welcome.vue';
import User from  './component/account/List.vue';
import Group from './component/group/List.vue';

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
				path: 'group',
				component: Group
			},
			{
				name: 'welcome',
				path: 'welcome',
				component: Welcome
			}
		]
	}
]);

import Notification from  './component/system/Notification.vue';
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
				path: 'advice',
				component: Advice
			},
		]
	}
]);

app.router.beforeEach((to, from, next) => {
	if (to.fullPath === '/') {
		return next('/ufwd/account/welcome');
	}

	next();
});

app.menu.addGroup('ufwdActivity.menu.activity', [
	{
		label: 'ufwdActivity.activity.activities',
		path: '/ufwd/activity/list'
	},
]);

import Activity from './component/activity/List.vue';
import Detail from './component/activity/Detail.vue';

app.router.addRoutes([
	{
		path: '/ufwd/activity',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'list',
				component: Activity
			},
			{
				path: ':id',
				component: Detail
			}
		]
	}
]);

import systemStore from './store/module/system';
import axios from 'axios';

app.store.registerModule('system', systemStore);

app.store.subscribe(({type, payload}) => {
	if (type === 'account/updateAccount' && payload !== undefined) {
		app.store.dispatch('system/initAvailable');

		axios.get(`/api/ufwd/service/account/${payload}/administrator`).then(res => {
			const { transmitter } = res.data.data;

			if (transmitter) {
				app.store.commit('system/setRestrict', transmitter);

				app.store.commit('menu/setGroupVisibility', {
					name: 'ufwd.menu.system',
					show: false
				});
			}
		});
	}
});

