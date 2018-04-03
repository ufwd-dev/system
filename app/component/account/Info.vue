<template>
  
<div>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/account/all">Account</router-link>
			</li>
			<li class="breadcrumb-item active">{{account.name}}</li>
		</ol>
	</nav>
	
	<h3>Account info</h3>
	<hr>
	<div class="row">
		<form class="col-9">
			<div class="form-group row">
				<label for="account-create-time"
					class="col-sm-2 col-form-label">Created time</label>
				<div class="col-sm-10">
					<input readonly
						type="text"
						id="account-create-time"
						class="form-control"
						:value="account.created_at|time">
				</div>
			</div>
			<div class="form-group row">
				<label for="account-username"
					class="col-sm-2 col-form-label">Username</label>
				<div class="col-sm-10">
					<input type="text"
						id="account-username"
						class="form-control"
						:value="account.name">
				</div>
			</div>
			
			<div class="form-group row">
				<label for="account-password"
					class="col-sm-2 col-form-label">Password</label>
				<div class="col-sm-10">
					<input type="password"
						id="account-password"
						class="form-control"
						:value="account.password">
				</div>
			</div>

			<div class="form-group row">
				<label for="account-email"
					class="col-sm-2 col-form-label">E-mail</label>
				<div class="col-sm-10">
					<input type="text"
						id="account-email"
						class="form-control"
						:value="account.email">
				</div>
			</div>
			<div class="form-group row">
				<label for="account-name"
					class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
					<input type="text"
						id="account-name"
						class="form-control"
						:value="account.ufwdAccount.name">
				</div>
			</div>
			<div class="form-group row">
				<label for="account-sex"
					class="col-sm-2 col-form-label">Sex</label>
				<div class="col-sm-10">
					<input type="text"
						id="account-sex"
						class="form-control"
						:value="account.ufwdAccount.sex|sex">
				</div>
			</div>
			<div class="form-group row">
				<label for="account-phone"
					class="col-sm-2 col-form-label">Phone</label>
				<div class="col-sm-10">
					<input type="text"
						id="account-phone"
						class="form-control"
						:value="account.ufwdAccount.phone">
				</div>
			</div>

			<div class="form-group row">
				<label for="account-group"
					class="col-sm-2 col-form-label">Group</label>
				<div class="col-sm-10">
					<select class="form-control" id="account-group">
						<option value="1">one</option>
						<option value="2">two</option>
						<option value="3">three</option>
					</select>
				</div>
			</div>

			<div class="form-group row">
				<label for="account-examine"
					class="col-sm-2 col-form-label">Examine status</label>
				<div class="col-sm-10">
					<div class="input-group">
						<input
							type="text"
							id="account-examine"
							class="form-control"
							:value="account.ufwdAccount.examine">
						<div class="input-group-append">
							<button class="btn btn-success"
								type="button"
								@click="examineAccount()">Pass</button>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group row mt-5">
				<div class="col-sm-10">
					<button type="button"
						class="btn btn-primary mr-3"
						@click="saveAccount()">Save modification</button>
					<button type="button" class="btn btn-danger">Remove account</button>
				</div>
			</div>
		</form>

	</div>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const ACCOUNT_URL = '/api/ufwd/service/account';

export default {
	name: 'account-info',
	computed: {
		accountId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			account: {}
		}
	},
	methods: {
		getAccountInfo() {
			return axios.get(`${ACCOUNT_URL}/${this.accountId}`)
				.then(res => {
					this.account = res.data.data;
				})
		},
		examineAccount() {
			return axios.put(`${ACCOUNT_URL}/${this.accountId}`, {
				examine: true
			}).then(this.getAccountInfo());
		},
		saveAccount() {
			this.$router.go(-1);
		}
	},
	mounted() {
		this.getAccountInfo();
	},
	filters: {
		time(value) {
			return dateFormat(value, 'yyyy/mm/dd HH:MM');
		},
		sex(value) {
			return value === 1 ? 'Male' : 'Female';
		},
	}
}
</script>

