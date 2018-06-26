<template>

	<div>
		<b-breadcrumb :items="[
			{ text: $t('ufwd.home'), href: '#/'},
			{ text: $t('ufwd.system.advice'), active: true },
		]"/>

		<h3>{{$t('ufwd.advice.list')}}</h3><hr>

		<b-table
			striped hover bordered small
			id="advice-data"
			:fields="[
				{ key: 'accountId', label: $t('ufwd.advice.account'), class: 'data-account' },
				{ key: 'title', label: $t('ufwd.advice.title'), class: 'data-title' },
				{ key: 'content', label: $t('ufwd.advice.content') },
				{ key: 'category', label: $t('ufwd.advice.category'), class: 'data-category' },
				{ key: 'created_at', label: $t('ufwd.advice.createAt'), class: 'data-created-at' },
			]"
			:items="adviceList">

			<template slot="created_at" slot-scope="data">
				{{data.item.created_at|isoDateTime}}
			</template>

		</b-table>
		
	</div>
  
</template>

<script>
import axios from 'axios';
import dateFormat from "dateformat";

export default {
	name: 'advice',
	data() {
		return {
			adviceList: [],
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
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

<style lang="less">
table#advice-data {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	td {
		vertical-align: middle;
	}

	.data-account {
		width: 5em;
	}

	.data-title {
		width: 12em;
	}

	.data-category {
		width: 10em;
	}

	.data-created-at {
		width: 12em;
	}
}
</style>

