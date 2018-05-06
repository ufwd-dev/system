<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link
					tag="a"
					to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">
				{{$t('ufwd.menu.account')}}
			</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-sm-8">

			<h3>{{$t('ufwd.user.users')}}</h3>
			<hr>

			<user-list :account-list="accountList"></user-list>

		</div>
		<div class="col-sm-4">

			<add-user :get-account="getAccount"></add-user>

		</div>
	</div>

</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

import UserList from './UserList.vue';
import AddUser from './AddUser.vue';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'user',
	components: {
		UserList,
		AddUser
	},
	data() {
		return {
			accountList: [],
		}
	},
	methods: {
		getAccount() {
			return axios.get(ACCOUNT_URL).then(res => {
			
				let accountData = res.data.data;
				
				accountData.forEach(user => {

					user.admin = user.admin
						? this.$t('ufwd.user.true')
						: this.$t('ufwd.user.false');
					user.examine = user.examine
						? this.$t('ufwd.user.adopt')
						: this.$t('ufwd.user.fail');
					user.created_at = dateFormat(
						user.created_at,
						'yyyy/mm/dd HH:MM'
					);
					user.party = user.party === null
						? '暂无'
						: user.party;

				});
				
				this.accountList = accountData;
			})
		}
	},
	mounted() {
		this.getAccount();
	}
}
</script>
