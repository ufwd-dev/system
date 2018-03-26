<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Article</li>
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

			<h3 class="mt-4">All articles</h3>
			<hr>
			
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>xxx</td>
						<td>2018/03/25</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			<div class="list-group">
				<div class="list-group-item disabled">Category
					<router-link tag="a"
						to="/ufwd/account/manage"
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
