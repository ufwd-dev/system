<template>
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('user.addUser')}}</li>
		</ol>
	</nav>

	<h3>{{$t('user.addUser')}}</h3>
	<hr>

	<el-form :model="userForm"
		:rules="userRule"
		ref="userForm"
		label-width="100px"
		label-position="left">
		<el-form-item
			:label="$t('user.username')"
			prop="username">
			<el-input v-model="userForm.username"></el-input>
		</el-form-item>

		<el-form-item
			:label="$t('user.password')"
			prop="password">
			<el-input v-model="userForm.password"></el-input>
		</el-form-item>

		<el-form-item
			:label="$t('user.name')"
			prop="name">
			<el-input v-model="userForm.name"></el-input>
		</el-form-item>

		<el-form-item
			:label="$t('user.sex')"
			prop="sex"
			required>
			<el-radio-group v-model="userForm.sex">
				<el-radio label="male" class="mb-0">{{$t('user.male')}}</el-radio>
				<el-radio label="female" class="mb-0">{{$t('user.female')}}</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item
			:label="$t('user.identification')"
			prop="identification">
			<el-input v-model="userForm.identification"></el-input>
		</el-form-item>

		<el-form-item
			:label="$t('user.phone')"
			prop="phone">
			<el-input v-model="userForm.phone"></el-input>
		</el-form-item>

		<!-- <el-form-item :label="$t('user.group')" v-if="isShow">
			<el-checkbox-group v-model="userForm.groupPool">
				<el-checkbox
					v-for="(group, index) in groupList"
					:key="index"
					:label="group.id"
					name="type">
					{{group.name}}
				</el-checkbox>
			</el-checkbox-group>
		</el-form-item> -->

		<el-form-item :label="$t('user.administrator')">
			<el-switch v-model="admin"></el-switch>
		</el-form-item>

		<el-form-item
			:label="$t('user.party')"
			prop="party">
			<el-select v-model="userForm.party"
				:placeholder="$t('user.placeholder.party')">
				<el-option
					v-for="(party, index) in partyPool"
					:key="index"
					:label="party.label"
					:value="party.value">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item
			:label="$t('user.street')"
			prop="street">
			<el-select v-model="userForm.street"
				:placeholder="$t('user.placeholder.street')">
				<el-option
					v-for="(street, index) in streetPool"
					:key="index"
					:label="street.label"
					:value="street.value">
				</el-option>
			</el-select>
		</el-form-item>

		<el-form-item>
			<el-button
				type="primary"
				native.type="submit"
				@click="createUser('userForm')">{{$t('user.create')}}</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import axios from 'axios';
import mixin from './mixins';

export default {
	name: 'add-user',
	mixins: [mixin],
	data() {
		return {
			userForm: {
				username: '',
				password: '',
				name: '',
				sex: '',
				phone: '',
				identification: '',
				party: '',
				street: '',
				groupPool: []
			},
			groupList: [],
			isShow: false,
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
				party: [
					{
						required: true,
						message: '请选择党派',
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
					}).catch(err => {
						this.$refs[formName].resetFields();
						
						this.$notify.error({
							title: '错误',
							message: '用户创建成功，但您可以继续完善信息。'
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
		}
	}
}
</script>

<style>

</style>
