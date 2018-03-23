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

			<h4>All accounts</h4>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<tr @click="getAccountById(1)">
						<td>Admin</td>
						<td>2018/03/23</td>
					</tr>
					<tr>
						<td>ZhangSan</td>
						<td>2018/03/23</td>
					</tr>
				</tbody>
			</table>
        </div>

		<div class="col-4">
			<div class="list-group">
				<div class="list-group-item disabled">Category
					<a href="" class="float-right">Manage</a>
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
export default {
	name: 'account',
	methods: {
		getAccountById(id) {
			this.$router.push(`account/${id}/info`);
		}
	}
}
</script>
