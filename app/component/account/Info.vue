<template>
  
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/account/user-list">{{$t('ufwd.account')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('user.username')}}: {{account.name}}</li>
		</ol>
	</nav>

	<h3>{{$t('user.modifyPassword')}}</h3>
	<hr>

	<el-input v-model="account.password"
		class="input-with-select mb-3">
		<el-button slot="append"
			@click="updatePassword()">{{$t('user.update')}}</el-button>
	</el-input>
	
	<h3>{{$t('user.info')}}</h3>
	<hr>

	<el-form
		:model="account"
		label-width="100px"
		label-position="left">
		<el-form-item :label="$t('user.createAt')">
			<el-input v-model="ufwdAccount.created_at" disabled></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.username')">
			<el-input v-model="account.name"></el-input>
		</el-form-item>
		
		<el-form-item :label="$t('user.name')">
			<el-input v-model="ufwdAccount.name"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.sex')">
			<el-radio-group v-model="ufwdAccount.sex">
				<el-radio label="male" class="mb-0">{{$t('user.male')}}</el-radio>
				<el-radio label="female" class="mb-0">{{$t('user.female')}}</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item :label="$t('user.phone')">
			<el-input v-model="ufwdAccount.phone"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.identification')">
			<el-input v-model="ufwdAccount.identification"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.group')">
			<el-checkbox-group v-model="list"
				@change="testCheckbox()">
				<el-checkbox
					v-for="group in groupList"
					:key="group.id"
					:label="group"
					>{{group.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>

		<el-form-item :label="$t('user.examine')">
			<el-switch v-model="ufwdAccount.examine"></el-switch>
		</el-form-item>

		<el-form-item>
			<el-button type="primary"
				@click="updateUser()">{{$t('user.update')}}</el-button>
			<el-button type="danger"
				@click="deleteUser()">{{$t('user.delete')}}</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'account-info',
	computed: {
		accountId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			account: {},
			ufwdAccount: {
			},
			groupList: [],
			list: []
		}
	},
	methods: {
		getUserInfo() {
			return axios.get(`${ACCOUNT_URL}/${this.accountId}`)
				.then(res => {
					if (!res.data.data.ufwdAccount) {
						this.ufwdAccount = {};
					}

					this.account = res.data.data;
					this.account.password = '';

					let ufwdAccountData = res.data.data.ufwdAccount;

					Object.keys(ufwdAccountData).forEach(key => {
						let createdTime = ufwdAccountData['created_at'];

						createdTime = dateFormat(createdTime, 'yyyy/mm/dd HH:MM');
						ufwdAccountData['created_at'] = createdTime;
					});

					this.ufwdAccount = ufwdAccountData;
				})
		},
		getGroupList() {
			return axios.get(`/api/ufwd/service/group`)
				.then(res => {
					this.groupList = res.data.data;
				})
		},
		updateUser() {
			return axios.put(`${ACCOUNT_URL}/${this.accountId}`, {
				name: this.account.name,
				ufwd: this.ufwdAccount
			}).then(() => {
				this.$notify({
					title: 'Success',
					message: 'Amend the success!',
					type: 'success'
				})
			})
		},
		deleteUser() {
			return axios.delete(`${ACCOUNT_URL}/${this.accountId}`)
				.then(() => {
					this.$notify({
						title: 'Success',
						message: 'Remove success!',
						type: 'success'
					})
				})
				.catch(error => {
					this.$notify.error({
						title: 'Fail',
						message: error.message
					})
				});
		},
		updatePassword() {
			this.updateUser();
		},
		testCheckbox() {
			console.log(this.list);
		}
	},
	mounted() {
		this.getUserInfo();
		this.getGroupList();
		// return axios.get(`/api/ufwd/service/account/${this.accountId}/group`)
		// 	.then(res => {
		// 		console.log(res.data.data)
		// 	})
	},
}
</script>

