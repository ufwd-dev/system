<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('ufwd.account')}}</li>
		</ol>
	</nav>

	<h3>{{$t('user.users')}}</h3>
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
			:width="column.width"
			:min-width="column.minWidth">
		</el-table-column>
		<el-table-column
			:label="$t('user.examine')"
			prop="status"
			width="140"
			align="center"
			:filters="[
				{text: $t('user.adopt'), value: $t('user.adopt')},
				{text: $t('user.fail'), value: $t('user.fail')}]"
			:filter-method="examineFilterTag"
			filter-placement="bottom-end">
			<template slot-scope="scope">
				<el-tag
					:type="scope.row.examine === $t('user.adopt') ? 'success' : 'danger'"
					close-transion>{{scope.row.examine}}</el-tag>
			</template>
		</el-table-column>
		<el-table-column
			:label="$t('user.action')"
			width="80"
			align="center">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getAccountById(scope.row.id)">{{$t('user.edit')}}</el-button>
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
			this.$router.push(`user-list/${id}/info`);
		},
		getAccount() {
			return axios.get(ACCOUNT_URL).then(res => {
			
				let accountData = res.data.data;
				
				accountData.forEach(user => {

					user.admin = user.admin ? this.$t('user.true') : this.$t('user.false');
					user.examine = user.examine ? this.$t('user.adopt') : this.$t('user.fail');
					user.created_at = dateFormat(user.created_at, 'yyyy/mm/dd HH:MM');
				});
				
				this.accountList = accountData;
			})
		},
		examineFilterTag(value, row) {
			return row.examine === value;
		},
	},
	data() {
		return {
			accountList: [],
			accountColumns: [
				{
					label: this.$t('user.username'),
					prop: 'username',
					minWidth: '150'
				},
				{
					label: this.$t('user.name'),
					prop: 'name',
					width: '120'
				},
				{
					label: this.$t('user.phone'),
					prop: 'phone',
					width: '160'
				},
				{
					label: this.$t('user.identification'),
					prop: 'identification',
					width: '180'
				},
				{
					label: this.$t('user.createAt'),
					prop: 'created_at',
					width: '160',
					sortable: 'custom'
				},
				{
					label: this.$t('user.admin'),
					prop: 'admin',
					width: '120'
				}
			],
			searchDef: {
				colProps: {
					span: 8
				},
				props: ['username', 'name', 'phone', 'identification']
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
						'code': this.$t('user.true'),
						'name': this.$t('user.administrator')
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
