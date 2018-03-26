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
			<li class="breadcrumb-item active">Category manage</li>
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

			<h3>All category</h3>
			<hr>
			
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Number of people</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getCategoryById(1)">
						<td>one</td>
						<td>2</td>
					</tr>
					<tr>
						<td>two</td>
						<td>3</td>
					</tr>
				</tbody>
			</table>
        </div>
	</div>
</div>
</template>

<script>
export default {
	name: 'category-manage',
	methods: {
		getCategoryById(id) {
			this.$router.push(`manage/${id}/category`);
		}
	}
}
</script>
