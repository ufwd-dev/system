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

	<!-- <div class="row">
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
	</div> -->

	<h3>All notifications</h3>
	<hr>

	<data-tables
		:data="notificationList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:actions-def="actionDef">
		<el-table-column
			v-for="(column, index) in notificationColumns"
			:key="index"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width"
			:min-width="column.minWidth">
		</el-table-column>
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'notification',
	data() {
		return {
			notificationList: [],
			notificationColumns: [
				{
					label: 'Recevier',
					prop: 'recevier',
					width: '180'
				},
				{
					label: 'Content',
					prop: 'content',
					minWidth: '200'
				},
				{
					label: 'Created time',
					prop: 'created_at',
					width: '180',
					sortable: 'custom'
				}
			],
			searchDef: {
				colProps: {
					span: 8
				},
				inputProps: {
					placeholder: 'content'
				},
				props: ['content']
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			actionDef: {
				colProps: {
					span: 3
				},
				def: [
					{
						name: 'New',
						type: 'primary',
						handler: () => {
							this.$router.push('add-notification');
						}
					}
				]
			}
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