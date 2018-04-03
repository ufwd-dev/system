<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Notification</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="a"
				to="add-notification"
				class="btn btn-primary">+ New</router-link>
		</div>
		<div class="col-7">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>

	<h3 class="mt-4">All notifications</h3>
	<hr>

	<data-tables
		:data="notificationList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column type="expand">
			<template slot-scope="props">
				<p>{{props.row.name}}</p>
			</template>
		</el-table-column>
		<el-table-column
			v-for="(column, index) in notificationColumns"
			:key="index"
			:label="column.label"
			:prop="column.field"
			sortable="custom">
		</el-table-column>
		<!-- <el-table-column label="Action" width="80">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getNotificationById(scope.row.id)">Edit</el-button>
			</template>
		</el-table-column> -->
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'notification',
	methods: {
		// getNotificationById(id) {
		// 	this.$router.push(`group/${id}/detail`);
		// }
	},
	data() {
		return {
			notificationList: [],
			notificationColumns: [
				{
					label: 'Recevier',
					field: 'recevier'
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
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/notification`)
			.then(res => {
				this.notificationList = res.data.data;
			})
	}
}
</script>