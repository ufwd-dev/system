'use strict';
import app from 'app';
import Home from 'app/component/Home.vue';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';

import Account from  './component/account/Account.vue';
import Info from  './component/account/Info.vue';
import Manage from  './component/account/Manage.vue';
import Category from  './component/account/Category.vue';

app.menu.addGroup('ufwd.account', [
	{
		label: 'account.account',
		path: '/ufwd/account/all'
	},
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
				path: 'manage',
				component: Manage
			},
			{
				path: 'manage/:id/category',
				component: Category
			},
		]
	}
]);

import Channel from  './component/channel/Channel.vue';
import New from  './component/channel/New.vue';

app.menu.addGroup('ufwd.channel', [
	{
		label: 'channel.channel',
		path: '/ufwd/channel'
	},
	{
		label: 'channel.new',
		path: '/ufwd/channel/new'
	}
]);

app.router.addRoutes([
	{
		path: '/ufwd/channel',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: '/',
				component: Channel
			},
			{
				path: 'new',
				component: New
			}
		]
	}
]);

app.menu.addGroup('ufwd.administrator', [
	{
		label: 'item.administrator',
		path: '/ufwd/administrator'
	}
]);
app.menu.addGroup('ufwd.writer', [
	{
		label: 'item.writer',
		path: '/ufwd/writer'
	}
]);
app.menu.addGroup('ufwd.notification', [
	{
		label: 'item.notification',
		path: '/ufwd/notification'
	}
]);
app.menu.addGroup('ufwd.subscribe', [
	{
		label: 'item.subscribe',
		path: '/ufwd/subscribe'
	}
]);
app.menu.addGroup('ufwd.advice', [
	{
		label: 'item.advice',
		path: '/ufwd/advice'
	}
]);
app.menu.addGroup('ufwd.group', [
	{
		label: 'item.group',
		path: '/ufwd/group'
	}
]);