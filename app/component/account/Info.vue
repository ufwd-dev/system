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
			<el-input v-model="account.created_at" disabled></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.username')">
			<el-input v-model="account.username"></el-input>
		</el-form-item>
		
		<el-form-item :label="$t('user.name')">
			<el-input v-model="account.name"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.sex')">
			<el-radio-group v-model="account.sex">
				<el-radio label="male" class="mb-0">{{$t('user.male')}}</el-radio>
				<el-radio label="female" class="mb-0">{{$t('user.female')}}</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item :label="$t('user.phone')">
			<el-input v-model="account.phone"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.identification')">
			<el-input v-model="account.identification"></el-input>
		</el-form-item>

		<el-form-item :label="$t('user.group')">
			<el-select v-model="groupList"
				multiple
				:placeholder="$t('user.placeholder.group')">
				<el-option
					v-for="(group, index) in groupList"
					:key="index"
					:label="group.name"
					:value="group.id">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item :label="$t('user.examine')">
			<el-switch v-model="account.examine"></el-switch>
		</el-form-item>

		<el-form-item :label="$t('user.administrator')">
			<el-switch v-model="account.admin"></el-switch>
		</el-form-item>

		<el-form-item :label="$t('user.party')">
			<el-select v-model="account.party"
				:placeholder="$t('user.placeholder.party')">
				<el-option
					label="暂无"
					:value="value">
				</el-option>
				<el-option
					v-for="(party, index) in partyPool"
					:key="index"
					:label="party.name"
					:value="party.id">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item :label="$t('user.street')">
			<el-select v-model="account.street"
				:placeholder="$t('user.placeholder.street')">
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
				@click="updateUser()">{{$t('user.update')}}</el-button>
			<el-button type="danger"
				@click="deleteUser()">{{$t('user.delete')}}</el-button>
		</el-form-item>
	</el-form>

	<button @click="groupTest()">group</button>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';
import mixin from './mixins';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'account-info',
	mixins: [mixin],
	computed: {
		accountId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			account: {},
			value: null,
			partyPool: [],
			streetPool: [],
			groupList: [],
			list: [],
		}
	},
	methods: {
		getUserInfo() {
			return axios.get(`${ACCOUNT_URL}/${this.accountId}`)
				.then(res => {
					this.account = res.data.data;
					this.account.password = '';

					Object.keys(this.account).forEach(() => {
						let createdTime = this.account['created_at'];

						createdTime = dateFormat(createdTime, 'yyyy/mm/dd HH:MM');
						this.account['created_at'] = createdTime;
					});
				});
		},
		getGroupList() {
			return axios.get(`/api/ufwd/service/group`)
				.then(res => {
					this.groupList = res.data.data;
				});
		},
		getPartyList() {
			return axios.get('/api/ufwd/service/party').then(res => {
				this.partyPool = res.data.data;
			})
		},
		getStreetList() {
			return axios.get('/api/ufwd/service/street').then(res => {
				this.streetPool = res.data.data;
			})
		},
		updateUser() {
			return axios.put(`${ACCOUNT_URL}/${this.accountId}`, {
				name: this.account.name,
				ufwd: {
					name: this.account.name,
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
				.catch(error => {
					this.$notify.error({
						title: '错误',
						message: '用户删除失败。'
					});
				});
		},
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
		createAdmin(id) {
			if (this.admin) {
				return axios.post(`/api/ufwd/service/administrator`, {id})
					.then(() => {})
					.catch(err => {
						this.$notify.error({
							title: '错误',
							message: '不能设置该账户为管理员。'
						});
					});
			}
		},
		getAdmin(id) {
			return axios.get(`/api/ufwd/service/administrator/${id}`)
				.then(() => {
					this.admin = true;
				});
		},
		divideIntoGroup(groupPool, id) {
			if (groupPool.length === 0) {
				return false;
			}

			for (let i = 0; i < groupPool.length; i++) {
				axios.post(`/api/ufwd/service/group/${groupPool[i]}/account/${id}`)
					.then(() => {})
					.catch(err => {
						this.$notify.error({
							title: '错误',
							message: '用户分组失败。'
						});
					});
			}
		},
		groupTest() {
			return axios.post('/api/ufwd/service/group/1/account/1');
		}
	},
	mounted() {
		this.getUserInfo();
		this.getGroupList();
		this.getPartyList();
		this.getStreetList();
	}
}
</script>

