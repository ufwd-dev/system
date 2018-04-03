<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Group</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="a"
				to="add-group"
				class="btn btn-primary">+ New</router-link>
		</div>
		<div class="col-7">
            <div class="input-group">
				<input type="text"
					class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
            </div>
        </div>
	</div>

	<h3 class="mt-4">All groups</h3>
	<hr>

	<data-tables
		:data="groupList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column
			v-for="(column, index) in groupColumns"
			:key="index"
			:label="column.label"
			:prop="column.field"
			sortable="custom">
		</el-table-column>
		<el-table-column label="Action" width="80">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getGroupById(scope.row.id)">Edit</el-button>
			</template>
		</el-table-column>
	</data-tables>
	
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'group',
	methods: {
		getGroupById(id) {
			this.$router.push(`group/${id}/detail`);
		}
	},
	data() {
		return {
			groupList: [],
			groupColumns: [
				{
					label: 'Name',
					field: 'name'
				},
				{
					label: 'Description',
					field: 'description'
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
			},
		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/group`)
			.then(res => {
				this.groupList = res.data.data;
			})
	}
}
</script>
