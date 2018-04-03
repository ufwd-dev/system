<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Administrator</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-8">
			<div class="input-group mb-3">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>

	<h3>All administrators</h3>
	<hr>

	<data-tables
		:data="administratorList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column
			v-for="(column, index) in administratorColumns"
			:key="index"
			:label="column.label"
			:prop="column.field"
			sortable="custom">
		</el-table-column>
		<el-table-column label="Action" width="80">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getAdministratorById(scope.row.accountId)">Edit</el-button>
			</template>
		</el-table-column>
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'administrator',
	methods: {
		getAdministratorById(id) {
			this.$router.push(`account/${id}/info`);
		}
	},
	data() {
		return {
			administratorList: [],
			administratorColumns: [
				{
					label: 'Account ID',
					field: 'accountId'
				},
				{
					label: 'Created time',
					field: 'created_at'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			}
		}
	},
	mounted() {
		return axios.get('/api/ufwd/service/administrator')
			.then(res => {
				this.administratorList = res.data.data;
			})
	}
}
</script>

