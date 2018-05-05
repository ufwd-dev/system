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
			<el-input v-model="userForm.name"></el-input>
		</el-form-item>
		<el-form-item
			:label="$t('user.password')"
			prop="password">
			<el-input v-model="userForm.password"></el-input>
		</el-form-item>
		<el-form-item
			:label="$t('user.name')"
			prop="name">
			<el-input v-model="userForm.ufwd.name"></el-input>
		</el-form-item>
		<el-form-item
			:label="$t('user.sex')"
			prop="sex"
			required>
			<el-radio-group v-model="userForm.ufwd.sex">
				<el-radio label="male" class="mb-0">{{$t('user.male')}}</el-radio>
				<el-radio label="female" class="mb-0">{{$t('user.female')}}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item
			:label="$t('user.identification')"
			prop="identification">
			<el-input v-model="userForm.ufwd.identification"></el-input>
		</el-form-item>
		<el-form-item
			:label="$t('user.phone')"
			prop="phone">
			<el-input v-model="userForm.ufwd.phone"></el-input>
		</el-form-item>
		<el-form-item :label="$t('user.administrator')">
			<el-switch v-model="admin"></el-switch>
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				native.type="submit"
				@click="createUser()">{{$t('user.create')}}</el-button>
		</el-form-item>
	</el-form>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-user',
	data() {
		return {
			userForm: {
				name: '',
				password: '',
				ufwd: {
					name: '',
					sex: '',
					phone: '',
					identification: ''
				}
			},
			userRule: {
				username: [
					{
						required: true,
						message: 'Please input activity username.',
						trigger: 'blur'
					},
					{
						min: 4,
						max: 128,
						message: 'Length should be 4 to 128.',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: 'Please input activity password.',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 32,
						message: 'Length should be 6 to 32.',
						trigger: 'blur'
					}
				],
				name: [
					{
						required: true,
						message: 'Please input activity name.',
						trigger: 'blur'
					}
				],
				identification: [
					{
						required: true,
						message: 'Please input activity identification.',
						trigger: 'blur'
					}
				],
				phone: [
					{
						required: true,
						message: 'Please input activity phone.',
						trigger: 'blur'
					}
				]
			},
			admin: false
		}
	},
	methods: {
		createUser() {
			console.log(this.userForm);
			return axios.post(`/api/ufwd/service/account`, this.userForm).then(() => {
				this.$refs['userForm'].resetFields();
			})
		}
	}
}
</script>

<style>

</style>
