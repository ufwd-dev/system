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
					<input type="text" class="form-control" readonly value="Admin">
				</div>
			</div>

			<fieldset class="form-group">
				<div class="row">
					<legend class="col-form-label col-sm-2 pt-0">Radios</legend>
					<div class="col-sm-10">
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" id="inlineCheckbox1" value="option1" name="radio">
							<label class="form-check-label" for="inlineCheckbox1">1</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" id="inlineCheckbox2" value="option2" name="radio">
							<label class="form-check-label" for="inlineCheckbox2">2</label>
						</div>
						<div class="form-check form-check-inline">
							<input class="form-check-input" type="radio" id="inlineCheckbox3" value="option3" disabled name="radio">
							<label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
						</div>

					</div>
				</div>
			</fieldset>
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
	}
}
</script>

