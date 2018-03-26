'use strict';
import app from 'app';

app.menu.addGroup('ufwd.system', [
	{
		label: 'Account',
		path: '/ufwd/account'
	},
	{
		label: 'Channel',
		path: '/ufwd/channel'
	},
	{
		label: 'Activity',
		path: '/ufwd/activity'
	},
	{
		label: 'Article',
		path: '/ufwd/article'
	},
	{
		label: 'Vote',
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
import Vote from  './component/vote/Vote.vue';

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
		]
	}
]);