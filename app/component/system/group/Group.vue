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

	<h3>All groups</h3>
	<hr>

	<div class="row">
		<div class="col-sm-9">
			<data-tables
				:data="groupList"
				:search-def="searchDef"
				:pagination-def="paginationDef"
				:actions-def="actionDef"
				ref="groupList"
				@selection-change="handleSelectionChange">
				<el-table-column
					type="selection"
					width="50"
					align="center">
				</el-table-column>
				<el-table-column
					v-for="(column, index) in groupColumns"
					:key="index"
					align="center"
					:label="column.label"
					:prop="column.prop"
					:sortable="column.sortable"
					:width="column.width">
				</el-table-column>
				<el-table-column label="Action" width="140" align="center">
					<template slot-scope="scope">
						<el-button type="text"
							@click="getGroupById(scope.row.id)">Edit</el-button>
					</template>
				</el-table-column>
			</data-tables>

		</div>

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>New group</span>
				</div>
				<el-form :model="groupForm" :rules="groupRule">
					<el-form-item label="Name" prop="name">
						<el-input
							v-model="groupForm.name"></el-input>
					</el-form-item>
					<el-form-item label="Destription">
						<el-input
							type="textarea"
							rows="3"
							v-model="groupForm.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="createGroup()">Create</el-button>
					</el-form-item>
				</el-form>

			</el-card>
		</div>
	</div>

</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'group',
	data() {
		return {
			groupList: [],
			groupColumns: [
				{
					label: 'Name',
					prop: 'name',
					width: '240'
				},
				{
					label: 'Description',
					prop: 'description'
				},
				{
					label: 'Created time',
					prop: 'created_at',
					width: '180'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			actionDef: {
				def: [
					{
						name: 'Delete',
						type: 'danger',
						handler: () => {
							this.multipleGroup.forEach(row => {
								return axios.delete(`/api/ufwd/service/group/${row.id}`)
									.then(res => {
										this.getGroupList();
									})
									.catch(error => {
										this.$notify.error({
											title: 'Error',
											message: 'Fail to delete group'
										});
									});
							});
						}
					}
				]
			},
			multipleGroup: [],
			groupForm: {
				name: '',
				description: ''
			},
			groupRule: {
				name: [
					{
						required: true,
						trigger: 'blur',
						message: 'Please input group name'
					}
				]
			}
		}
	},
	mounted() {
		this.getGroupList();
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleGroup = val;
		},
		createGroup() {
			return axios.post('/api/ufwd/service/group', {
				name: this.groupForm.name,
				description: this.groupForm.description
			}).then(() => {
				this.getGroupList();
			}).catch(error => {
				this.$notify.error({
					title: 'Error',
					message: 'Fail to create group.'
				})
			});

		},
		getGroupList() {
			return axios.get(`/api/ufwd/service/group`)
				.then(res => {
					let groupData = res.data.data;

					groupData.forEach(group => {
						group.created_at = dateFormat(group.created_at, 'yyyy/mm/dd HH:MM');
					});

					this.groupList = groupData;
				})
		},
		getGroupById(id) {
			return this.$router.push(`group/${id}/detail`)
		}
	}
}
</script>
