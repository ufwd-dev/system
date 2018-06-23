<template>
	<div>
		<b-breadcrumb :items="[
			{ text: $t('ufwd.home'), href: '#/'},
			{ text: $t('ufwd.account.group'), active: true },
		]"/>
		
		<h3>{{$t('ufwd.group.groups')}}</h3><hr>
		<b-btn variant="primary"
			@click="openCreateGroup()">创建分组</b-btn>

		<hr><b-table id="group-list"
			striped hover bordered small
			:fields="[
				{ key: 'name', label: $t('ufwd.group.name'), class: 'group-name' },
				{ key: 'description', label: $t('ufwd.group.description') },
				{ key: 'created_at', label: $t('ufwd.group.create'), class: 'group-created-at' },
				{ key: 'remove', label: '删除', class: 'group-remove' }
			]"
			:items="groupList">

			<template slot="name" slot-scope="data">
				<b-btn variant="link"
					size="sm"
					@click="viewGroup(data.item)">{{data.item.name}}</b-btn>
			</template>

			<template slot="remove" slot-scope="data">
				<b-btn variant="danger"
					size="sm"
					@click="removeGroup(data.item.id)">删除</b-btn>
			</template>

			<template slot="created_at" slot-scope="data">
				{{data.item.created_at|isoDateTime}}
			</template>

		</b-table>

		<create ref="createGroup"
			@group-create-success="getGroupList()" />

		<retrieve ref="retrieveGroup"
			@group-update-success="getGroupList()" />
	</div>
</template>

<script>
import axios from 'axios';
import dateFormat from "dateformat";
import Create from './Create.vue';
import Retrieve from './Retrieve.vue';

export default {
	components: {
		Create, Retrieve
	},
	data() {
		return {
			groupList: []
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	methods: {
		getGroupList() {
			return axios.get(`/api/ufwd/service/group`)
				.then(res => {
					let groupData = res.data.data;

					this.groupList = groupData;
				})
		},
		removeGroup(id) {
			axios.delete(`/api/ufwd/service/group/${id}`).then(() => {
				this.getGroupList();
			});
		},
		viewGroup({ id }) {
			this.$refs.retrieveGroup.open(id);
		},
		openCreateGroup() {
			this.$refs.createGroup.open();
		}
	},
	mounted() {
		this.getGroupList();
	},
}
</script>

<style lang="less">
table#group-list {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	td {
		vertical-align: middle;
	}

	.group-name {
		width: 15em;
	}

	.group-remove {
		width: 5em;
	}

	.group-created-at {
		width: 12em;
	}
}
</style>

