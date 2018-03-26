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

	<div class="row">
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

	<div class="row mt-4">
		<div class="col">
			<div class="card"
				@click="$router.push(`account/manage/1/category`)">
				<div class="card-body">
					<h5 class="card-title">xx Channel</h5>
					<p class="card-text">Writer: 2</p>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">xx Channel</h5>
					<p class="card-text">Writer: 1</p>
				</div>
			</div>
		</div>
		<div class="col">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">xx Channel</h5>
					<p class="card-text">Writer: 5</p>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
