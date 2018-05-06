<template>
<div>

	<el-card class="box-card" shadow="never">
		<div slot="header">
			<span>创建用户</span>
		</div>
	
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

			<el-form-item :label="$t('ufwd.user.administrator')">
				<el-switch v-model="admin"></el-switch>
			</el-form-item>

			<el-form-item
				:label="$t('ufwd.user.party')"
				prop="party">
				<el-select v-model="userForm.party"
					:placeholder="$t('ufwd.user.placeholder.party')">
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

			<el-form-item>
				<el-button
					type="primary"
					native.type="submit"
					@click="createUser('userForm')">{{$t('ufwd.user.create')}}</el-button>
			</el-form-item>
		</el-form>

	</el-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-user',
	props: ['getAccount'],
	data() {
		return {
			userForm: {
				username: '',
				password: '',
				name: '',
				sex: '',
				phone: '',
				identification: '',
				party: null,
				street: null,
				groupPool: []
			},
			value: null,
			partyPool: [],
			streetPool: [],
			admin: false,
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
					}
				],
				phone: [
					{
						required: true,
						message: '请输入手机号码',
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
	mounted() {
		this.getPartyList();
		this.getStreetList();
	},
	methods: {
		createUser(formName) {
			
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
							street: this.userForm.street
						}
					}).then(res => {
						this.createAdmin(res.data.data.id);
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
						
						this.$notify.error({
							title: '错误',
							message: '用户创建失败或者创建过程中断。'
						});
					});
				} else {
					this.$notify.error({
						title: '错误',
						message: '请把表单填写完整。'
					});
				}
			});
		},
		createAdmin(accountId) {
			if (this.admin) {
				return axios.post('/api/ufwd/service/administrator', {
					accountId
				}).then(() => {})
					.catch(err => {
						this.$notify.error({
							title: '错误',
							message: '不能设置该用户为管理员。'
						});
					});
			}
		},
		getPartyPool() {
			return axios.get(`/api/ufwd/service/party`)
				.then(res => {
					this.partyPool = res.data.data;
				})
		},
		getStreetPool() {
			return axios.get(`/api/ufwd/service/street`)
				.then(res => {
					this.streetPool = res.data.data;
				})
		}
	},
	mounted() {
		this.getPartyPool();
		this.getStreetPool();
	}
}
</script>
