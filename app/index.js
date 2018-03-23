'use strict';
import app from 'app';

app.menu.addGroup('ufwd.system', [
	{
		label: 'account',
		path: '/ufwd/account'
	}
]);

import Home from 'app/component/Home.vue';
import Account from  './component/account/Account.vue';
import Info from  './component/account/Info.vue';

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
			}
		]
	}
]);