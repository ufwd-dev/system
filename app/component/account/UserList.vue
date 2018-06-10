<template>
<div>
	<data-tables
		:data="accountList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:checkbox-filter-def="checkboxFilterDef">
		<el-table-column
			:label="$t('ufwd.user.examine')"
			prop="examine"
			width="100"
			align="center"
			:filters="[
				{text: $t('ufwd.user.adopt'), value: true},
				{text: $t('ufwd.user.fail'), value: false}]"
			:filter-method="examineFilterTag"
			filter-placement="bottom-end">
			<template slot-scope="scope">
				<el-switch v-model="scope.row.examine"
					@change="updateAccount(scope.row.examine, scope.row.id)"></el-switch>
			</template>
		</el-table-column>
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
			:label="$t('ufwd.user.party')"
			prop="party"
			width="160"
			align="center"
			:filters="partyPool"
			:filter-method="partyFilterTag"
			filter-placement="bottom-end">
		</el-table-column>
		<el-table-column
			:label="$t('ufwd.user.street')"
			prop="street"
			width="100"
			align="center"
			:filters="streetPool"
			:filter-method="streetFilterTag"
			filter-placement="bottom-end">
		</el-table-column>
		<el-table-column
			:label="$t('ufwd.user.action')"
			width="80"
			align="center">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getAccountById(scope.row.id)">{{$t('ufwd.user.edit')}}</el-button>
			</template>
		</el-table-column>
	</data-tables>

</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'user-list',
	props: ['accountList'],
	data() {
		return {
			accountColumns: [
				{
					label: this.$t('ufwd.user.username'),
					prop: 'username',
					minWidth: '120'
				},
				{
					label: this.$t('ufwd.user.name'),
					prop: 'name',
					width: '120'
				},
				{
					label: this.$t('ufwd.user.phone'),
					prop: 'phone',
					width: '120'
				},
				{
					label: this.$t('ufwd.user.identification'),
					prop: 'identification',
					width: '180'
				},
				{
					label: this.$t('ufwd.user.createAt'),
					prop: 'created_at',
					width: '150',
					sortable: 'custom'
				},
				{
					label: this.$t('ufwd.user.admin'),
					prop: 'admin',
					width: '80'
				}
			],
			searchDef: {
				colProps: {
					span: 8
				},
				props: ['name', 'identification']
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
						'code': this.$t('ufwd.user.true'),
						'name': this.$t('ufwd.user.administrator')
					}
				],
				filterFunction(el, filter) {
					return el['admin'] === filter.vals[0];
				}
			},
			partyPool: [{
				text: '暂无',
				value: '暂无'
			}],
			streetPool: []
		}
	},
	methods: {
		getAccountById(id) {
			this.$router.push(`user-list/${id}/info`);
		},
		examineFilterTag(value, row) {
			return row.examine === value;
		},
		partyFilterTag(value, row) {
			return row.party === value;
		},
		streetFilterTag(value, row) {
			return row.street === value;
		},
		getPartyPool() {
			return axios.get(`/api/ufwd/service/party`)
				.then(res => {
					const pool = res.data.data;
					
					pool.forEach(element => {
						const party = {};

						party.text = element.name;
						party.value = element.name;

						this.partyPool.push(party);
					});
				
				});

		},
		getStreetPool() {
			return axios.get(`/api/ufwd/service/street`)
				.then(res => {
					const pool = res.data.data;
					
					pool.forEach(element => {
						const group = {};

						group.text = element.name;
						group.value = element.name;

						this.streetPool.push(group);
					});
				});
		},
		updateAccount(value, accountId) {
			return axios.put(`/api/ufwd/service/account/${accountId}`, {
				ufwd: {
					examine: value
				}
			});
		}
	},
	mounted() {
		this.getPartyPool();
		this.getStreetPool();
	}
}
</script>