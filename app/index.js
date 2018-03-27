'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.menu.addGroup('ufwd.system', [
	{
		label: 'menu.account',
		path: '/ufwd/account'
	},
	{
		label: 'menu.channel',
		path: '/ufwd/channel'
	},
	{
		label: 'menu.activity',
		path: '/ufwd/activity'
	},
	{
		label: 'menu.article',
		path: '/ufwd/article'
	},
	{
		label: 'menu.vote',
		path: '/ufwd/vote'
	},
]);

import Home from 'app/component/Home.vue';

import Account from  './component/account/Account.vue';
import Info from  './component/account/Info.vue';
import Manage from  './component/account/Manage.vue';
import Category from  './component/account/Category.vue';

import Channel from  './component/channel/Channel.vue';
import New from  './component/channel/New.vue';

import Activity from  './component/activity/Activity.vue';
import ActivityDetail from  './component/activity/Detail.vue';

import Article from  './component/article/Article.vue';

import Vote from  './component/vote/Index.vue';
import VoteDetail from  './component/vote/Vote.vue';

app.router.addRoutes([
	{
		path: '/ufwd',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'account',
				component: Account
			},
			{
				path: 'account/:id/info',
				component: Info
			},
			{
				path: 'account/manage',
				component: Manage
			},
			{
				path: 'account/manage/:id/category',
				component: Category
			},

			{
				path: 'channel',
				component: Channel
			},
			{
				path: 'channel/new',
				component: New
			},

			{
				path: 'activity',
				component: Activity
			},
			{
				path: 'activity/:id/detail',
				component: ActivityDetail
			},

			{
				path: 'article',
				component: Article
			},

			{
				path: 'vote',
				component: Vote
			},
			{
				path: 'vote/:id/detail',
				component: VoteDetail
			},
		]
	}
]);

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';