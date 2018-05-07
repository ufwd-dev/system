<template>
  
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/account/user-list">{{$t('ufwd.menu.account')}}</router-link>
			</li>
			<li class="breadcrumb-item active">
				{{$t('ufwd.user.username')}}: {{account.name}}
			</li>
		</ol>
	</nav>

	<h3>{{$t('ufwd.user.modifyPassword')}}</h3>
	<hr>

	<el-input v-model="account.password"
		class="input-with-select mb-3">
		<el-button slot="append"
			@click="updatePassword()">确定</el-button>
	</el-input>
	
	<h3>{{$t('ufwd.user.info')}}</h3>
	<hr>

	<el-form
		:model="account"
		ref="accountForm"
		label-width="100px"
		label-position="left">
		<el-form-item :label="$t('ufwd.user.createAt')">
			<el-input v-model="account.created_at" disabled></el-input>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.username')">
			<el-input v-model="account.username"></el-input>
		</el-form-item>
		
		<el-form-item :label="$t('ufwd.user.name')">
			<el-input v-model="account.name"></el-input>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.sex')">
			<el-radio-group v-model="account.sex">
				<el-radio
					label="male"
					class="mb-0">{{$t('ufwd.user.male')}}</el-radio>
				<el-radio
					label="female"
					class="mb-0">{{$t('ufwd.user.female')}}</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.identification')">
			<el-input v-model="account.identification"></el-input>
		</el-form-item>
		
		<el-form-item :label="$t('ufwd.user.phone')">
			<el-input v-model="account.phone"></el-input>
		</el-form-item>

		<!-- <el-form-item label="分组">
			<el-checkbox-group v-model="checkedGroupPool"
				@change="checkedGroup()">
				<el-checkbox
					v-for="(group, index) in groupPool"
					:key="index"
					:label="group.id">{{group.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item> -->

		<!-- <el-form-item :label="$t('ufwd.user.examine')">
			<el-switch v-model="account.examine"></el-switch>
		</el-form-item> -->

		<el-form-item :label="$t('ufwd.user.administrator')">
			<el-switch v-model="account.admin"
				@change="updateAdmin()"></el-switch>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.party')">
			<el-select v-model="account.party"
				:placeholder="$t('ufwd.user.placeholder.party')">
				<el-option
					label="暂无"
					:value="partyNull"></el-option>
				<el-option
					v-for="(party, index) in partyPool"
					:key="index"
					:label="party.name"
					:value="party.id">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.street')">
			<el-select v-model="account.street"
				:placeholder="$t('ufwd.user.placeholder.street')">
				<el-option
					v-for="(street, index) in streetPool"
					:key="index"
					:label="street.name"
					:value="street.id">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button type="primary"
				@click="updateUser()">{{$t('ufwd.user.update')}}</el-button>
			<el-button type="danger"
				@click="deleteUser()">{{$t('ufwd.user.delete')}}</el-button>
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
			partyNull: null,
			partyPool: [],
			streetPool: [],
			// groupPool: [],
			// accountGroupPool: [],
			// checkedGroupPool: []
		}
	},
	methods: {
		getUserInfo() {
			return axios.get(`${ACCOUNT_URL}/${this.accountId}`)
				.then(res => {
					this.account = res.data.data;

					Object.keys(this.account).forEach(() => {
						let createdTime = this.account['created_at'];

						createdTime = dateFormat(createdTime, 'yyyy/mm/dd HH:MM');
						this.account['created_at'] = createdTime;

						this.account['party'] = this.account['party'] === null
							? this.partyNull = null
							: this.account['party'];
					});
				});
		},
		// getGroupPool() {
		// 	return axios.get(`/api/ufwd/service/group`)
		// 		.then(res => {
		// 			this.groupPool = res.data.data;
		// 		});
		// },
		// getAccountGroupPool() {
		// 	return axios.get(`/api/ufwd/service/account/${this.accountId}/group`)
		// 		.then(res => {
		// 			this.accountGroupPool = res.data.data;

		// 			this.checkedGroupPool = this.accountGroupPool;

		// 		});
		// },
		getPartyPool() {
			return axios.get(`/api/ufwd/service/party`)
				.then(res => {
					this.partyPool = res.data.data;
				});
		},
		getStreetPool() {
			return axios.get(`/api/ufwd/service/street`)
				.then(res => {
					this.streetPool = res.data.data;
				});
		},
		updateUser() {
			return axios.put(`${ACCOUNT_URL}/${this.accountId}`, {
				name: this.account.username,
				ufwd: {
					name: this.account.name,
					sex: this.account.sex,
					phone: this.account.phone,
					identification: this.account.identification,
					party: this.account.party,
					street: this.account.street
				}
			}).then(() => {
					this.$notify({
						title: '成功',
						message: '用户信息修改成功！',
						type: 'success'
					});
				})
				.catch(err => {
					console.log(err.message);
					this.$notify.error({
						title: '错误',
						message: '用户信息修改失败。'
					});

					this.getUserInfo();
				});
		},
		updateAdmin() {
			if (this.account.admin) {
				this.createAdmin();
			} else {
				this.deleteAdmin();
			}
		},
		createAdmin() {
			return axios.post(`/api/ufwd/service/administrator`, {
				accountId: this.account.id
			});
		},
		deleteAdmin() {
			return axios.delete(`/api/ufwd/service/administrator/${this.accountId}`);
		},
		// checkedGroup() {
		// 	console.log(this.checkedGroupPool);

		// 	this.checkedGroupPool.forEach(groupId => {
		// 		this.accountGroupPool.forEach(id => {
		// 			if (groupId === id) {
		// 				console.log(groupId);
		// 			}
		// 		})
		// 	})
		// },
		// updateAccountGroupPool() {
			
		// },
		// creareAccountGroupPool() {
		// 	return axios.post(`/api/ufwd/service/group/account/${this.accountId}`, {
		// 		groupPool: this.accountGroupPool
		// 	});
		// },
		// deleteAccountGroup(groupId) {
		// 	return axios.delete(`/api/ufwd/service/account/${this.accountId}/group/${groupId}`);
		// },
		updatePassword() {
			return axios.patch(`${ACCOUNT_URL}/${this.accountId}/password`, {
				password: this.account.password
			}).then(() => {
				this.$notify({
					title: '成功',
					message: '用户信息修改成功！',
					type: 'success'
				});
			});
		},
		deleteUser() {
			return axios.delete(`${ACCOUNT_URL}/${this.accountId}`)
				.then(() => {
					this.$notify({
						title: '成功',
						message: '用户删除成功！',
						type: 'success'
					});
				})
				.then(() => {
					this.$router.push('/ufwd/account/user-list');
				})
				.catch(error => {
					this.$notify.error({
						title: '错误',
						message: '用户删除失败。'
					});
				});
		},
		
	},
	mounted() {
		this.getUserInfo();
		// this.getGroupPool();
		// this.getAccountGroupPool();
		this.getPartyPool();
		this.getStreetPool();
	}
}
</script>

