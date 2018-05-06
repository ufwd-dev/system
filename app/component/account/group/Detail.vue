<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/account/group">{{$t('ufwd.account.group')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{group.name}}</li>
		</ol>
	</nav>

	<h3>{{$t('ufwd.group.modify')}}</h3>
	<hr>

	<el-form :model="group">
		<el-form-item :label="$t('ufwd.group.name')">
			<el-input v-model="group.name"></el-input>
		</el-form-item>

		<el-form-item :label="$t('ufwd.group.description')">
			<el-input
				type="textarea"
				rows="3"
				v-model="group.description"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary"
				@click="fixGroup()">{{$t('ufwd.group.update')}}</el-button>
		</el-form-item>
	</el-form>

	<h3>分组用户列表</h3>
	<hr>

	<data-tables
		:data="accountList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:actions-def="actionDef"
		ref="accountList"
		@selection-change="handleSelectionChange">
		<el-table-column
			type="selection"
			width="50"
			align="center">
		</el-table-column>
		<el-table-column
			v-for="(column, index) in accountColumns"
			:key="index"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width"
			:minWidth="column.minWidth">
		</el-table-column>
	</data-tables>

</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'group-detail',
	computed: {
		groupId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			group: {},
			accountList: [],
			accountColumns: [
				{
					label: '用户名',
					prop: 'username',
					minWidth: '180'
				},
				{
					label: '姓名',
					prop: 'name',
					width: '180'
				},
				{
					label: '手机号码',
					prop: 'phone',
					width: '200'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
			},
			actionDef: {
				def: [
					{
						name: '删除',
						type: 'danger',
						handler: () => {
							this.multipleAccount.forEach(row => {
								return axios.delete(`/api/ufwd/service/group/${this.groupId}/account/${row.accountId}`)
									.then(res => {
										this.getAccountList();
									})
									.catch(err => {
										this.$notify.error({
											title: '错误',
											message: '用户删除失败。'
										});
									});
							});
						}
					}
				]
			},
			multipleAccount: []
		}
	},
	methods: {
		getGroup() {
			return axios.get(`/api/ufwd/service/group/${this.groupId}`)
				.then(res => {
					this.group = res.data.data;
				});
		},
		fixGroup() {
			return axios.put(`/api/ufwd/service/group/${this.groupId}`, {
				name: this.group.name,
				description: this.group.description
			}).then(() => {
				this.$router.go(-1);
			})
		},
		handleSelectionChange(val) {
			this.multipleAccount = val;
		},
		getAccountList() {
			return axios.get(`/api/ufwd/service/group/${this.groupId}/account`)
				.then(res => {
					this.accountList = res.data.data;
				})
		}
	},
	mounted() {
		this.getGroup();
		this.getAccountList();
	}
}
</script>
