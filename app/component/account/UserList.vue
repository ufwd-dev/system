<template>
<div>
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
			:label="$t('ufwd.user.examine')"
			prop="status"
			width="100"
			align="center"
			:filters="[
				{text: $t('ufwd.user.adopt'), value: $t('ufwd.user.adopt')},
				{text: $t('ufwd.user.fail'), value: $t('ufwd.user.fail')}]"
			:filter-method="examineFilterTag"
			filter-placement="bottom-end">
			<template slot-scope="scope">
				<el-tag
					:type="scope.row.examine === $t('ufwd.user.adopt') ? 'success' : 'danger'"
					close-transion>{{scope.row.examine}}</el-tag>
			</template>
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
					label: '党派',
					prop: 'party',
					width: '160',
				},
				{
					label: '街道',
					prop: 'street',
					width: '100'
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
			}
		}
	},
	methods: {
		getAccountById(id) {
			this.$router.push(`user-list/${id}/info`);
		},
		examineFilterTag(value, row) {
			return row.examine === value;
		}
	}
}
</script>