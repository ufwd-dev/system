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
			<li class="breadcrumb-item active">{{accountId}}</li>
		</ol>
	</nav>
	
	<h3>Account info</h3>
	<hr>
	<div class="row">
		<form class="col-8">
			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="Admin">
				</div>
			</div>

			<fieldset class="form-group">
				<div class="row">
					<legend class="col-form-label col-sm-2 pt-0">Identity</legend>
					<div class="col-sm-10">
						<div class="form-check form-check-inline">
							<input class="form-check-input"
								type="radio"
								id="identityCommon"
								value="common"
								name="identity">
							<label class="form-check-label"
								for="identityCommon">Common</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input"
								type="radio"
								id="identityWriter"
								value="writer"
								name="identity">
							<label class="form-check-label"
								for="identityWriter">Writer</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input"
								type="radio"
								id="identityAdmin"
								value="adminnistraor"
								name="identity"
								checked>
							<label class="form-check-label"
								for="identityAdmin">Administrator</label>
						</div>

					</div>
				</div>
			</fieldset>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Category</label>
				<div class="col-sm-10">
					<select class="form-control" id="">
						<option value="1">one</option>
						<option value="2">two</option>
						<option value="3">three</option>
					</select>
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Audit status</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="Pass" readonly>
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Activities</label>
				<div class="col-sm-10">
					<table class="table table-bordered">
						<thead>
							<th>Name</th>
							<th>Time</th>
						</thead>
						<tbody>
							<tr>
								<td>xxx xx</td>
								<td>2018/03/12</td>
							</tr>
							<tr>
								<td>xxx xx</td>
								<td>2018/03/12</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Street</label>
				<div class="col-sm-10">
					<input type="text" class="form-control" value="xxx street" readonly>
				</div>
			</div>

			<div class="form-group row">
				<label for="" class="col-sm-2 col-form-label">Password</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" value="123">
				</div>
			</div>

			<div class="form-group row mt-5">
				<div class="col-sm-10">
					<button type="button"
						class="btn btn-primary mr-3"
						@click="saveAccount()">Save modification</button>
					<button type="button" class="btn btn-danger">Remove account</button>
				</div>
			</div>
		</form>

	</div>
</div>
</template>

<script>
export default {
	name: 'account-info',
	computed: {
		accountId() {
			return this.$route.params.id;
		}
	},
	methods: {
		saveAccount() {
			this.$router.go(-1);
		}
	}
}
</script>

