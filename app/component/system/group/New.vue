<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/system/group">Group</router-link>
			</li>
			<li class="breadcrumb-item active">New group</li>
		</ol>
	</nav>


	<div class="row">
		<div class="col-6">
			<h3>New group</h3>
			<hr>
			<form>
				<div class="form-group">
					<label for="group-new-name">Name</label>
					<input type="text"
						id="group-new-name"
						class="form-control"
						placeholder="xx group ..."
						v-model="groupName">
				</div>
				<div class="form-group">
					<label for="group-new-description">Description</label>
					<textarea type="text"
						id="group-new-description"
						class="form-control"
						v-model="groupDescription"></textarea>
				</div>

				<button class="btn btn-primary"
					type="button"
					@click="createGroup()">Create</button>
			</form>

		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'add-group',
	data() {
		return {
			groupName: '',
			groupDescription: ''
		}
	},
	methods: {
		createGroup() {
			return axios.post('/api/ufwd/service/group', {
				name: this.groupName,
				description: this.groupDescription
			}).then(() => {
				this.$router.go(-1);
			});

		}
	}
}
</script>
