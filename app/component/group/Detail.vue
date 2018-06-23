<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: $t('ufwd.account.group'), href: '#/ufwd/account/group' },
		{ text: group.name, active: true },
	]"/>

	<h3>{{$t('ufwd.group.modify')}}</h3><hr>

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
	data() {
		return {
			group: {},
			accountList: []
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
