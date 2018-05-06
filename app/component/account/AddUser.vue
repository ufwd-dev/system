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
			<el-checkbox-group v-model="userForm.group">
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

		<el-form-item :label="$t('user.party')">
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

		<el-form-item :label="$t('user.street')">
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
				group: []
			},
			groupList: [],
			isShow: false,
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
							title: 'Success',
							message: 'The create of account is successful.',
							type: 'success'
						});
					}).catch(err => {
						this.$refs[formName].resetFields();
						
						this.$notify.error({
							title: 'Error',
							message: 'The create of account is break off, please to update it.'
						});
					});
				} else {
					this.$notify.error({
						title: 'Error',
						message: 'Please fill the form.'
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
							title: 'Error',
							message: 'This Account can not be set as administrator.'
						});
					});
			}
		}
	}
}
</script>

<style>

</style>
