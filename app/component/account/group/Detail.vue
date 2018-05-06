<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">{{$t('home')}}</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/account/group">{{$t('account.group')}}</router-link>
			</li>
			<li class="breadcrumb-item active">{{group.name}}</li>
		</ol>
	</nav>

	<h3>{{$t('group.modify')}}</h3>
	<hr>

	<div class="row">
		<div class="col-sm-6">
			<el-form :model="group">
				<el-form-item :label="$t('group.name')">
					<el-input v-model="group.name"></el-input>
				</el-form-item>

				<el-form-item :label="$t('group.description')">
					<el-input
						type="textarea"
						rows="3"
						v-model="group.description"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary"
						@click="fixGroup()">{{$t('group.update')}}</el-button>
				</el-form-item>
			</el-form>

		</div>
	</div>

</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'group-detail',
	computed: {
		groupId() {
			return this.$route.params.id;
		}
	},
	data() {
		return {
			group: {},
			accountList: []
		}
	},
	methods: {
		getGroup() {
			return axios.get(`/api/ufwd/service/group/${this.groupId}`)
				.then(res => {
					this.group = res.data.data;
				});
		},
		fixGroup() {
			return axios.put(`/api/ufwd/service/group/${this.groupId}`, {
				name: this.group.name,
				description: this.group.description
			}).then(() => {
				this.$router.go(-1);
			})
		},
		// getUserWithGroup() {
		// 	return axios.get(`/api/ufwd/service/group/${this.groupId}/account`)
		// 		.then(res => {
		// 			let accountData = res.data.data;

		// 			accountData.forEach(account => {
						
		// 			});
		// 		})
		// }
	},
	mounted() {
		this.getGroup();
		// this.getUserWithGroup();
	}
}
</script>
