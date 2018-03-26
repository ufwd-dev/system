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
					to="/ufwd/account">Account</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a"
					to="/ufwd/account/manage">Category manage</router-link>
			</li>
			<li class="breadcrumb-item active">{{categoryId}}</li>
		</ol>
	</nav>

	<h3>Details</h3>
	<hr>

	<div class="row">
		<form class="col-8">
			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Category name</label>
				<div class="col-sm-8">
					<input type="text" class="form-control" value="One">
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Personnel</label>
				<div class="col-sm-8">
					<div class="list-group">
						<div class="list-group-item">Zhang San<span
								class="badge badge-secondary badge-pill float-right">X</span>
						</div>
						<div class="list-group-item">XXX<span
								class="badge badge-secondary badge-pill float-right">X</span>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group row">
				<div class="col-sm-10">
					<button type="button"
						class="btn btn-primary"
						@click="$router.go(-1)">Save</button>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script>
export default {
	name: 'category',
	computed: {
		categoryId() {
			return this.$route.params.id;
		}
	}
}
</script>
