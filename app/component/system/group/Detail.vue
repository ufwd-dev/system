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
					to="/ufwd/system/group">Group</router-link>
			</li>
			<li class="breadcrumb-item active">{{groupId}}</li>
		</ol>
	</nav>

	<h3>Details</h3>
	<hr>

	<div class="row">
		<form class="col-8">
			<div class="form-group row">
				<label for="group-info-name"
					class="col-sm-2 col-form-label">Group name</label>
				<div class="col-sm-8">
					<input type="text"
						class="form-control"
						id="group-info-name"
						v-model="group.name">
				</div>
			</div>
			<div class="form-group row">
				<label for="group-info-description"
					class="col-sm-2 col-form-label">Description</label>
				<div class="col-sm-8">
					<textarea type="text"
						id="group-info-description"
						class="form-control"
						v-model="group.description"></textarea>
				</div>
			</div>

			<div class="form-group row">
				<label class="col-sm-2 col-form-label">Personnel</label>
				<div class="col-sm-8">
					<input v-if="!hasMember"
						readonly
						type="text"
						class="form-control"
						value="No data">
					<div class="list-group">
						<div class="list-group-item"
							v-for="(member, index) in memberList"
							:key="index">{{member.accountId}}<span
								class="badge badge-secondary badge-pill float-right"
								@click="removeMember(member.accountId)">X</span>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-10">
					<button type="button"
						class="btn btn-primary"
						@click="$router.go(-1)">Save</button>
					<button type="button"
						class="btn btn-danger"
						@click="removeGroup()">Delete</button>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script>
import axios from 'axios';

const GROUP_URL = '/api/ufwd/service/group';

export default {
	name: 'group-detail',
	data() {
		return {
			group: [],
			memberList: [],
			hasMember: false
		}
	},
	computed: {
		groupId() {
			return this.$route.params.id;
		}
	},
	mounted() {
		this.getGroup();
		this.getMember();
	},
	methods: {
		getGroup() {
			return axios.get(`${GROUP_URL}/${this.groupId}`)
				.then(res => {
					this.group = res.data.data;
				});
		},
		getMember() {
			return axios.get(`${GROUP_URL}/${this.groupId}/account`)
				.then(res => {
					this.memberList = res.data.data;
				}).catch(err => {
					this.hasMember = false;
				})
		},
		removeMember(id) {
			return axios.delete(`${GROUP_URL}/${this.groupId}/account/${id}`)
				.then(this.getMember());
		},
		removeGroup() {
			return axios.delete(`${GROUP_URL}/${this.groupId}`)
				.then(this.$router.go(-1));
		}
	}
}
</script>
