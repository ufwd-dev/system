<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Channel</li>
		</ol>
	</nav>

	<div class="row mb-3">
		<div class="col-1">
			<router-link tag="a"
				to="channel/new"
				class="btn btn-primary">+ New</router-link>
		</div>
		<div class="col-6">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>

	<h3 class="mt-4">All channels</h3>
	<hr>

	<div class="row">
		<div class="col-8">

			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Name</th>
						<th>Writer</th>
						<th>Comment</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>xx Channel</td>
						<td>2</td>
						<td>2</td>
						<td>2018/03/12</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="col-4">
			<div class="card">
				<div class="card-header">
					xx Channel
				</div>
				<div class="card-body">
					<h5 class="card-title">Writer : 2</h5>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Name</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Zhang San</td>
								<td>2018/03/12</td>
							</tr>
						</tbody>
					</table>
					<h5 class="card-title">Comment : </h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
			</div>
		</div>
	</div>
	
	
</div>
</template>

<script>
export default {
	name: 'channel',
	data() {
		return {
			isAddPanelShow: false,
			isWriterShow: false,
		}
	}
}
</script>
