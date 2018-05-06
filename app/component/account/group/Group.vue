<template>

<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('account.group')}}</li>
		</ol>
	</nav>

	<h3>{{$t('group.groups')}}</h3>
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
					:width="column.width"
					:min-width="column.minWidth">
				</el-table-column>
				<el-table-column :label="$t('group.action')" width="140" align="center">
					<template slot-scope="scope">
						<el-button type="text"
							@click="getGroupById(scope.row.id)">{{$t('group.edit')}}</el-button>
					</template>
				</el-table-column>
			</data-tables>

		</div>

		<div class="col-sm-3">
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>{{$t('group.addGroup')}}</span>
				</div>
				<el-form :model="groupForm" :rules="groupRule">
					<el-form-item :label="$t('group.name')" prop="name">
						<el-input
							v-model="groupForm.name"></el-input>
					</el-form-item>
					<el-form-item :label="$t('group.description')">
						<el-input
							type="textarea"
							rows="3"
							v-model="groupForm.description"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="createGroup()">{{$t('group.create')}}</el-button>
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
					label: this.$t('group.name'),
					prop: 'name',
					width: '180'
				},
				{
					label: this.$t('group.description'),
					prop: 'description',
					minWidth: '200'
				},
				{
					label: this.$t('group.createAt'),
					prop: 'created_at',
					width: '180',
					sortable: 'custom'
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
						name: this.$t('group.delete'),
						type: 'danger',
						handler: () => {
							this.multipleGroup.forEach(row => {
								return axios.delete(`/api/ufwd/service/group/${row.id}`)
									.then(res => {
										this.getGroupList();
									})
									.catch(error => {
										this.$notify.error({
											title: '错误',
											message: '分组删除失败。'
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
						message: '请输入分组名称',
						trigger: 'blur',
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
			return axios.post('/api/ufwd/service/group', this.groupForm)
				.then(() => {
					this.getGroupList();
				})
				.catch(error => {
					this.$notify.error({
						title: '错误',
						message: '分组创建失败。'
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
