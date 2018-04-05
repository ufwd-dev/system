<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/system/notification">Notification</router-link>
			</li>
			<li class="breadcrumb-item active">New notification</li>
		</ol>
	</nav>

	<h3>New notification</h3>
	<hr>

	<div class="row">
		<div class="col-6">
			<form>
				<div class="form-group">
					<label for="notification-recevier">Recevier</label>
					<input type="text"
						id="notification-recevier"
						class="form-control"
						v-model="notificationRecevierList">
				</div>
				<div class="form-group">
					<label for="notification-content">Description</label>
					<textarea type="text"
						id="notification-content"
						class="form-control"
						v-model="notificationContent"></textarea>
				</div>

				<button class="btn btn-primary"
					type="button"
					@click="createNotification()">Create</button>
			</form>
		</div>

		<div class="col-6">
			<label class="mb-0">Account list</label>
			<data-tables
				ref="multipleTable"
				@selection-change="handleSelection"
				:data="accountList"
				:search-def="searchDef"
				:pagination-def="paginationDef">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					v-for="(column, index) in accountColumns"
					:key="index"
					:label="column.label"
					:prop="column.field"
					sortable="custom">
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
			notificationRecevierList: [],
			notificationContent: '',
			accountList: [],
			accountColumns: [
				{
					label: 'Username',
					field: 'account.name'
				},
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			multipleMember: []
		}
	},
	methods: {
		handleSelection(val) {
			this.multipleMember = val;
			this.notificationRecevierList = [];

			this.multipleMember.forEach(account => {
				this.notificationRecevierList.push(account.accountId);
			});

			console.log(this.multipleMember)
		},
		createNotification() {
			return axios.post('/api/ufwd/service/notification', {
				recevierList: this.notificationRecevierList,
				content: this.notificationContent
			}).then(() => {
				this.$router.go(-1);
			});

		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/account`)
			.then(res => {
				this.accountList = res.data.data;
			})
	}
}
</script>
