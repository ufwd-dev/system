<template>
<div>
	<el-collapse v-model="activeNames">
		<el-card class="box-card" shadow="never">
			<el-collapse-item name="create">
					<template slot="title">
						<div slot="header">
							<h3>创建用户</h3>
						</div>
					</template>
					<el-form :model="userForm"
					:rules="userRule"
					ref="userForm"
					label-width="100px"
					label-position="left">
					<el-form-item
						:label="$t('ufwd.user.username')"
						prop="username">
						<el-input v-model="userForm.username"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.password')"
						prop="password">
						<el-input v-model="userForm.password"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.name')"
						prop="name">
						<el-input v-model="userForm.name"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.sex')"
						prop="sex"
						required>
						<el-radio-group v-model="userForm.sex">
							<el-radio label="male" class="mb-0">{{$t('ufwd.user.male')}}</el-radio>
							<el-radio label="female" class="mb-0">{{$t('ufwd.user.female')}}</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.identification')"
						prop="identification">
						<el-input v-model="userForm.identification"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.phone')"
						prop="phone">
						<el-input v-model="userForm.phone"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.unit')"
						prop="unit">
						<el-input v-model="userForm.unit"></el-input>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.job')"
						prop="job">
						<el-input v-model="userForm.job"></el-input>
					</el-form-item>

					<el-form-item :label="$t('ufwd.user.administrator')">
						<el-switch v-model="admin"></el-switch>
					</el-form-item>

					<el-form-item :label="$t('ufwd.user.identity')">
						<el-checkbox-group v-model="identity.checkedIdentity">
							<el-checkbox
								v-for="(identity, index) in identity.identityPool"
								:key="index"
								:label="identity.id">{{identity.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.party')"
						prop="party">
						<el-select v-model="userForm.party"
							:placeholder="$t('ufwd.user.placeholder.party')">
							<el-option
								label="暂无"
								:value="partyNull">
							</el-option>
							<el-option
								v-for="(party, index) in partyPool"
								:key="index"
								:label="party.name"
								:value="party.id">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item
						:label="$t('ufwd.user.street')"
						prop="street">
						<el-select v-model="userForm.street"
							:placeholder="$t('ufwd.user.placeholder.street')">
							<el-option
								v-for="(street, index) in streetPool"
								:key="index"
								:label="street.name"
								:value="street.id">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item :label="$t('ufwd.user.group')">
						<el-checkbox-group v-model="group.checkedGroupPool">
							<el-checkbox
								v-for="(group, index) in group.groupPool"
								:key="index"
								:label="group.id">{{group.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							native.type="submit"
							@click="createUser('userForm')">{{$t('ufwd.user.create')}}</el-button>
					</el-form-item>
				</el-form>
			</el-collapse-item>
		</el-card>
	</el-collapse>
</div>
</template>

<script>
import axios from 'axios';
import { error } from 'util';

export default {
	name: 'add-user',
	props: ['getAccount'],
	data() {
		return {
			activeNames: '',
			accountId: '',
			userForm: {
				username: '',
				password: '',
				name: '',
				sex: '',
				phone: '',
				identification: '',
				party: null,
				street: null,
				unit: '',
				job: ''
			},
			partyNull: null,
			admin: false,
			partyPool: [],
			streetPool: [],
			identity: {
				identityPool: [],
				checkedIdentity: []
			},
			group: {
				groupPool: [],
				checkedGroupPool: [],
			},
			userRule: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},
					{
						min: 4,
						max: 128,
						message: '用户名长度应在4到128位之间',
						trigger: 'blur'
					},{
						validator: function (rule, value, callback) {
							return axios.get(`/api/ufwd/service/validate/account?name=${value}`)
								.then(res => {
									if (res.data.data.existed) {
										callback(new Error('用户名已被注册！'))
									} else {
										callback();
									}
								}).catch(err => {
									callback(new Error('网络异常！'))
								});
                    	}, trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 32,
						message: '密码长度应在6到32位之间',
						trigger: 'blur'
					}
				],
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}
				],
				identification: [
					{
						required: true,
						message: '请输入身份证号码',
						trigger: 'blur'
					},
					{ 
						pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
						message: '身份证号有误'
					},{
						validator: function (rule, value, callback) {
							return axios.get(`/api/ufwd/service/validate/account?identification=${value}`)
								.then(res => {
									if (res.data.data.existed) {
										callback(new Error('身份证号已被注册！'))
									} else {
										callback();
									}
								}).catch(err => {
									callback(new Error('网络异常！'))
								});
                    	}, trigger: 'blur'
					}
				],
				phone: [
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					},
					{
						pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
						message: '手机号码输入有误'
					},{
						validator: function (rule, value, callback) {
							return axios.get(`/api/ufwd/service/validate/account?phone=${value}`)
								.then(res => {
									if (res.data.data.existed) {
										callback(new Error('手机号已被注册！'))
									} else {
										callback();
									}
								}).catch(err => {
									callback(new Error('网络异常！'))
								});
                    	}, trigger: 'blur'
					}
				],
				unit: [
					{
						required: true,
						message: '请输入工作单位',
						trigger: 'blur'
					}
				],
				job: [
					{
						required: true,
						message: '请输入职务',
						trigger: 'blur'
					}
				],
				street: [
					{
						required: true,
						message: '请选择街道',
						trigger: 'blur'
					}
				]
			},
		}
	},
	methods: {
		getGroupPool() {
			return axios.get(`/api/ufwd/service/group`)
				.then(res => {
					this.group.groupPool = res.data.data;
				});
		},
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
		getIdentityPool() {
			return axios.get(`/api/ufwd/service/identity`)
				.then(res => {
					this.identity.identityPool = res.data.data;
				});
		},
		createUser(formName) {
			console.log(this.group.checkedGroupPool, this.identity.checkedIdentity);
			
			this.$refs[formName].validate((valid) => {
				if (valid) {

					return axios.post(`/api/ufwd/service/account`, {
						name: this.userForm.username,
						password: this.userForm.password,
						ufwd: {
							name: this.userForm.name,
							sex: this.userForm.sex,
							phone: this.userForm.phone,
							identification: this.userForm.identification,
							party: this.userForm.party,
							street: this.userForm.street,
							unit: this.userForm.unit,
							job: this.userForm.job
						}
					}).then(res => {
						if (res.data.message) {
							throw new Error(res.data.message);
						}

						this.accountId = res.data.data.id;

						return res.data.data;
					}).then(() => {
						return this.createAdmin();
					}).then(() => {
						if (this.identity.checkedIdentity.length !== 0) {

							return this.createAccountIdentityLabelPool(this.identity.checkedIdentity);
						}
					}).then(() => {
						if (this.group.checkedGroupPool.length !== 0) {
							
							return this.createAccountGroupPool(this.group.checkedGroupPool);
						}
					}).then(() => {
						this.$refs[formName].resetFields();

						this.$notify({
							title: '成功',
							message: '用户创建成功！',
							type: 'success'
						});
					}).then(() => {
						this.getAccount();
					}).catch(err => {
						this.$refs[formName].resetFields();
						this.getAccount();

						this.$notify.error({
							title: '错误',
							message: err.message
						});

						console.log(err);
					});
				} else {
					this.$notify.error({
						title: '错误',
						message: '请把表单填写完整。'
					});
				}
			});
		},
		createAdmin() {
			if (this.admin) {
				return axios.post('/api/ufwd/service/administrator', {
					accountId: this.accountId
				});
			}
		},
		createAccountGroupPool(list) {
			return axios.post(`/api/ufwd/service/group/account/${this.accountId}`, {
				groupPool: list
			});
		},
		createAccountIdentityLabelPool(list) {
			return axios.post(`/api/ufwd/service/identity/account/${this.accountId}`, {
				identityPool: list
			});
		}
	},
	mounted() {
		this.getPartyPool();
		this.getStreetPool();
		this.getIdentityPool();
		this.getGroupPool();
	}
}
</script>
