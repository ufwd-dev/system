<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/channel">Channel</router-link>
			</li>
			<li class="breadcrumb-item active">New channel</li>
		</ol>
	</nav>


	<div class="row">
		<div class="col-6">
			<h3>New channel</h3>
			<hr>
			<form>
				<div class="form-group">
					<label for="">Name</label>
					<input type="text"
						class="form-control"
						placeholder="xx channel ...">
				</div>

				<button class="btn btn-primary" type="button">Create</button>
			</form>

		</div>
	</div>
</div>
</template>
