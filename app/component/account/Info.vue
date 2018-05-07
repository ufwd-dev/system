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


		<!-- <el-form-item :label="$t('ufwd.user.group')">
			<el-checkbox v-model="group.checked"
				v-for="(group, index) in groupList"
				:key="index"
				:label="group.id"
				>{{group.name}}</el-checkbox>
		</el-form-item> -->
		<!-- <div class="el-form-item">
			<label class="el-form-item__label"
				style="width: 100px;">{{$t('ufwd.user.group')}}</label>
			<template class="el-form-item__content"
				style="margin-left: 100px;">

			</template>
		</div> -->
				<!-- <el-select v-model="ufwdAccount.groupPool"
					multiple
					:placeholder="$t('ufwd.user.placeholder.group')">
					<el-option
						v-for="group in groupList"
						:key="group.id"
						:label="group.name"
						:value="group.id">
					</el-option>
				</el-select> -->
		<!-- <el-form-item :label="$t('ufwd.user.group')">
		</el-form-item> -->

		<el-form-item :label="$t('ufwd.user.examine')">
			<el-switch v-model="account.examine"></el-switch>
		</el-form-item>

		<el-form-item :label="$t('ufwd.user.administrator')">
			<el-switch v-model="account.admin" @change="updateAdmin(account.id)"></el-switch>
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

	<!-- <button @click="groupTest()">group</button> -->
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
			// admin: false,
			partyPool: [],
			streetPool: [],
			// groupPool: [],
			// list: [],
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
		updateAdmin(id) {
            // console.log();
                this.createAdmin(id);
            // if (this.account.admin) {
            // } else {
            //  this.deleteAdmin();
            // }
        },
        createAdmin(id) {
            console.log(this.account.id);
            return axios.post(`/api/ufwd/service/administrator`, {
                accountId: id
            });
        },
		// getGroupPool() {
		// 	return axios.get(`/api/ufwd/service/group`)
		// 		.then(res => {
		// 			this.groupList = res.data.data;
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
				return this.createAdmin(this.account.id);
			}).then(() => {
					this.$notify({
						title: '成功',
						message: '用户信息修改成功！',
						type: 'success'
					});
				})
				.catch(err => {
					this.$notify.error({
						title: '错误',
						message: '用户信息修改失败。'
					});

					this.getUserInfo();
				});
		},
		createAdmin(id) {
			if (this.account.admin) {
				return axios.post(`/api/ufwd/service/administrator`,
					{
						accountId: id
					});
			}
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
		
		
		divideIntoGroup(groupPool, id) {
			if (groupPool.length === 0) {
				return false;
			}

		// 	for (let i = 0; i < groupPool.length; i++) {
		// 		axios.post(`/api/ufwd/service/group/${groupPool[i]}/account/${id}`)
		// 			.then(() => {})
		// 			.catch(err => {
		// 				this.$notify.error({
		// 					title: '错误',
		// 					message: '用户分组失败。'
		// 				});
		// 			});
		// 	}
		},
		// groupTest() {
		// 	return axios.post('/api/ufwd/service/group/1/account/1');
		// },
		
	},
	mounted() {
		this.getUserInfo();
		// this.getGroupPool();
		this.getPartyPool();
		this.getStreetPool();
	}
}
</script>

