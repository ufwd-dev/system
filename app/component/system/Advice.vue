<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('ufwd.home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('ufwd.system.advice')}}</li>
		</ol>
	</nav>

	<h3>{{$t('ufwd.advice.advice')}}</h3>
	<hr>

	<data-tables
		:data="adviceList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column
			v-for="(column, index) in adviceColumns"
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
	name: 'advice',
	data() {
		return {
			adviceList: [],
			adviceColumns: [
				{
					label: this.$t('ufwd.advice.account'),
					prop: 'accountId',
					width: '150'
				},
				{
					label: this.$t('ufwd.advice.content'),
					prop: 'content',
					minWidth: '200'
				},
				{
					label: this.$t('ufwd.advice.createAt'),
					prop: 'created_at',
					width: '200',
					sortable: 'custom'
				}
			],
			searchDef: {
				colProps: {
					span: 8
				},
				inputProps: {
					placeholder: this.$t('ufwd.advice.content')
				},
				props: ['content']
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