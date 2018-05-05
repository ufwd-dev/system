<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Advice</li>
		</ol>
	</nav>

	<h3>All advices</h3>
	<hr>

	<data-tables
		:data="adviceList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<!-- <el-table-column type="expand">
			<template slot-scope="props">
				<p>{{props.row.name}}</p>
			</template>
		</el-table-column> -->
		<el-table-column
			v-for="(column, index) in adviceColumns"
			:key="index"
			:label="column.label"
			:prop="column.field"
			sortable="custom">
		</el-table-column>
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'advice',
	data() {
		return {
			adviceList: [],
			adviceColumns: [
				{
					label: 'Account',
					field: 'accountId'
				},
				{
					label: 'Content',
					field: 'content'
				},
				{
					label: 'Created time',
					field: 'created_at'
				}
			],
			searchDef: {
				// show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/advise`)
			.then(res => {
				this.adviceList = res.data.data;
			})
	}
}
</script>