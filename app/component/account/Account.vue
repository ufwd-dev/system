<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Account</li>
		</ol>
	</nav>

	<div class="row">
        <div class="col-8">
            <div class="input-group mb-3">
				<input type="text"
					class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
            </div>

			<h3>All accounts
				<button
					class="btn btn-warning float-right"
					@click="getUnauditedAccount()">Unaudited</button>
			</h3>
			<hr>

			<data-tables
				:data="accountList"
				:search-def="searchDef"
				:pagination-def="paginationDef">
				<el-table-column
					v-for="(column, index) in accountColumns"
					:key="index"
					:label="column.label"
					:prop="column.field"
					sortable="custom">
				</el-table-column>
				<el-table-column label="Action" width="80">
					<template slot-scope="scope">
						<el-button type="text"
							@click="getAccountById(scope.row.accountId)">Edit</el-button>
					</template>
				</el-table-column>
			</data-tables>

			<button @click="signOut()">sign out</button>

        </div>


		<div class="col-4">
			<div class="list-group">
				<div class="list-group-item disabled">Group
					<router-link tag="a"
						to="/ufwd/system/group"
						class="float-right">Manage</router-link>
				</div>
				<a href="#"
					class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">All<span
						class="badge badge-primary">14</span>
				</a>
				<a href="#"
					class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">xx<span
						class="badge badge-primary">8</span>
				</a>
			</div>
		</div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'account',
	methods: {
		getAccountById(id) {
			this.$router.push(`account/${id}/info`);
		},
		getAccount(url) {
			return axios.get(url).then(res => {
			let accountData = res.data.data;

			accountData.forEach(user => {
				user.sex = user.sex === 1 ? 'Male' : 'Female';
				user.examine = user.examine ? 'true' : 'false';
				user.created_at = dateFormat(user.created_at, 'yyyy/mm/dd HH:MM');
			});
			
			this.accountList = accountData;
		})
		},
		getUnauditedAccount() {
			this.getAccount(`${ACCOUNT_URL}?examine=false`);
		},
		signOut() {
			return axios.delete('/api/account/session');
		}
	},
	data() {
		return {
			accountList: [],
			accountColumns: [
				{
					label: 'Username',
					field: 'account.name'
				},
				{
					label: 'Sex',
					field: 'sex'
				},
				{
					label: 'Examine status',
					field: 'examine'
				},
				{
					label: 'Created time',
					field: 'created_at'
				},
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			}
		}
	},
	mounted() {
		this.getAccount(ACCOUNT_URL);
	}
}
</script>
