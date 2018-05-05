<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Account</li>
		</ol>
	</nav>

	<h3>All Users</h3>
	<hr>

	<data-tables
		:data="accountList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:checkbox-filter-def="checkboxFilterDef">
		<el-table-column
			v-for="column in accountColumns"
			:key="column.label"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width">
		</el-table-column>
		<el-table-column
			label="Examine status"
			prop="status"
			width="140"
			align="center"
			:filters="[
				{text: 'Adopt', value: 'Adopt'},
				{text: 'Fail', value: 'Fail'}]"
			:filter-method="examineFilterTag"
			filter-placement="bottom-end">
			<template slot-scope="scope">
				<el-tag
					:type="scope.row.examine === 'Adopt' ? 'success' : 'danger'"
					close-transion>{{scope.row.examine}}</el-tag>
			</template>
		</el-table-column>
		<!-- <el-table-column
			label="Administrator"
			prop="admin"
			width="140"
			align="center"
			:filters="[
				{text: 'True', value: 'True'},
				{text: 'False', value: 'False'}]"
			:filter-method="adminFilterTag"
			filter-placement="bottom-end">
			<template slot-scope="scope">
				<el-tag 
					:type="scope.row.admin === 'True' ? 'success' : 'danger'"
					close-transion>{{scope.row.admin}}</el-tag>
			</template>
		</el-table-column> -->
		<el-table-column
			label="Action"
			width="80"
			align="center">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getAccountById(scope.row.ufwdAccount.accountId)">Edit</el-button>
			</template>
		</el-table-column>
	</data-tables>

			

</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'user',
	props: ['name'],
	methods: {
		getAccountById(id) {
			this.$router.push(`user/${id}/info`);
		},
		getAccount() {
			return axios.get(ACCOUNT_URL).then(res => {
			
				let accountData = res.data.data;
				
				accountData.forEach(user => {
					if (!user.ufwdAccount) {
						user.ufwdAccount = {
							name: '-',
							phone: '-',
							identification: '-'
						};
					}

					user.admin = 'False';
					user.ufwd_name = user.ufwdAccount.name;
					user.ufwd_phone = user.ufwdAccount.phone;
					user.ufwd_identification = user.ufwdAccount.identification;
					user.examine = user.ufwdAccount.examine ? 'Adopt' : 'Fail';
					user.created_at = dateFormat(user.created_at, 'yyyy/mm/dd HH:MM');

					axios.get('/api/ufwd/service/administrator')
						.then(res => {
							const administratorList = res.data.data;

							administratorList.forEach(admin => {
								if (admin.accountId === user.id) {
									user.admin = 'True';
								}
							});
						});
				});
				
				this.accountList = accountData;
			})
		},
		getUnauditedAccount() {
			this.getAccount(`${ACCOUNT_URL}?examine=false`);
		},
		examineFilterTag(value, row) {
			return row.examine === value;
		},
		adminFilterTag(value, row) {
			return row.admin === value;
		}
	},
	data() {
		return {
			accountList: [],
			accountColumns: [
				{
					label: 'Username',
					prop: 'name'
				},
				{
					label: 'Name',
					prop: 'ufwd_name'
				},
				{
					label: 'Phone',
					prop: 'ufwd_phone'
				},
				{
					label: 'Identification',
					prop: 'ufwd_identification'
				},
				{
					label: 'Created time',
					prop: 'created_at'
				},
				{
					label: 'Administrator',
					prop: 'admin'
				}
			],
			searchDef: {
				props: ['name', 'ufwd_name', 'ufwd_phone', 'ufwd_identification']
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			checkboxFilterDef: {
				colProps: {
					span: 4
				},
				def: [
					{
						'code': 'True',
						'name': 'adminstrator'
					}
				],
				filterFunction(el, filter) {
					return el['admin'] === filter.vals[0];
				}
			}
		}
	},
	mounted() {
		this.getAccount();
	}
}
</script>
