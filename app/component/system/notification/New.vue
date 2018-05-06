<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/system/notification">{{$t('system.notification')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{$t('notification.addNotification')}}</li>
		</ol>
	</nav>

	<h3>{{$t('notification.addNotification')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">
			<el-form :model="notifyForm">
				<el-form-item :label="$t('notification.content')">
					<el-input
						type="textarea"
						rows="3"
						v-model="notifyForm.content"></el-input>
				</el-form-item>

				<div class="el-form-item__content">
					<label class="el-form-item__label">{{$t('notification.recevier')}}</label>
				</div>
				<ul class="list-group el-form-item">
					<li class="list-group-item disabled">请在右边列表中选择用户</li>
					<li class="list-group-item"
						v-for="(user, index) in notifyForm.recevierPool"
						:key="index">{{user}}</li>
				</ul>
				<el-form-item>
					<el-button type="primary"
						@click="createNotify()">{{$t('notification.create')}}</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="col-6">
			<data-tables
				ref="accountList"
				@selection-change="handleSelection"
				:data="accountList"
				:search-def="searchDef"
				:pagination-def="paginationDef">
				<el-table-column
					type="selection"
					width="55"
					align="center">
				</el-table-column>
				<el-table-column
					v-for="(column, index) in accountColumn"
					:key="index"
					align="center"
					:min-width="column.minWidth"
					:width="column.width"
					:label="column.label"
					:prop="column.prop">
				</el-table-column>
			</data-tables>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-notification',
	data() {
		return {
			notifyForm: {
				recevierPool: [],
				content: ''
			},
			accountList: [],
			accountColumn: [
				{
					label: this.$t('user.username'),
					prop: 'username',
					width: '150'
				},
				{
					label: this.$t('user.group'),
					prop: 'groupPool',
					minWidth: '180'
				}
			],
			searchDef: {
				props: ['group'],
				inputProps: {
					placeholder: this.$t('user.group')
				},
				colProps: {
					span: 16
				}
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			multipleUser: []
		}
	},
	methods: {
		handleSelection(val) {
			this.multipleUser = val;
			this.notifyForm.recevierPool = [];

			this.multipleUser.forEach(account => {
				this.notifyForm.recevierPool.push(account.username);
			});
		},
		createNotify() {
			return axios.post('/api/ufwd/service/notification', this.notifyForm)
				.then(() => {
					this.$notify({
						title: '成功',
						message: '通知创建成功！',
						type: 'success'
					})
				})
				.catch(err => {
					this.$notify.error({
						title: '失败',
						message: '通知创建失败。'
					})
				});
		},
		getUserList() {
			return axios.get(`/api/ufwd/service/account`)
				.then(res => {
					this.accountList = res.data.data;
				})
		}
	},
	mounted() {
		this.getUserList();
	}
}
</script>
