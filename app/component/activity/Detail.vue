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
					to="/ufwd/activity">Activity</router-link>
			</li>
			<li class="breadcrumb-item active">{{activityId}}</li>
		</ol>
	</nav>

	<h3 class="mt-4">Activity detail</h3>
	<hr>
	<div class="row">
		<form class="col-8">
			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="xxx">
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Time</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="2018/03/25">
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Label</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="hah">
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Participants</label>
				<div class="col-sm-6">
					<div class="list-group">
						<div class="list-group-item">Zhang San</div>
						<div class="list-group-item">XXX</div>
					</div>
				</div>
			</div>

			<div class="form-group row mt-5">
				<div class="col-sm-10">
					<button type="button"
						class="btn btn-primary mr-3"
						@click="$router.go(-1)">Save</button>
					<button type="button" class="btn btn-danger">Remove</button>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script>
export default {
	name: 'activity-detail',
	computed: {
		activityId() {
			return this.$route.params.id;
		}
	}
}
</script>
