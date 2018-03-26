<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Activity</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-8">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>

			<h3 class="mt-4">All activities</h3>
			<hr>
			
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getActivityById(1)">
						<td>xxx</td>
						<td>2018/03/25</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'activity',
	methods: {
		getActivityById(id) {
			this.$router.push(`activity/${id}/detail`);
		}
	}
}
</script>
