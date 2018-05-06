<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('ufwd.system.notification')}}</li>
		</ol>
	</nav>

	<h3>{{$t('ufwd.notification.notification')}}</h3>
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
					label: this.$t('ufwd.notification.recevier'),
					prop: 'recevier',
					width: '180'
				},
				{
					label: this.$t('ufwd.notification.content'),
					prop: 'content',
					minWidth: '200'
				},
				{
					label: this.$t('ufwd.notification.createAt'),
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
					placeholder: this.$t('ufwd.notification.content')
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
						name: this.$t('ufwd.notification.new'),
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