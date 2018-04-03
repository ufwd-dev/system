<template>
<div class="container" style="margin-top: 7rem">
	<div class="row">
		<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<div class="card">
				<div class="card-header text-center">
					<h4 class="card-title mb-0 py-2">Sign in hhhhhh</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text"
							v-model="options.name"
							class="form-control"
							id="username">
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<div class="float-right">
							<a href="">Forgot password?</a>
						</div>
						<input type="password"
							v-model="options.password"
							class="form-control"
							id="password">
					</div>
					<button class="btn btn-primary btn-block"
						@click="signIn()">Apply</button>
				</div>
			</div>

		</div>

	</div>
</div>

</template>

<script>
export default {
	name: 'signin',
	data() {
		return {
			options: {
				name: '',
				password: ''
			}
		}
	},
	methods: {
		signIn() {
			this.$store.dispatch('account/signIn', this.options).then(() => {
				this.$router.push({ path: '/ufwd/account' });
			});
		}
	}
}
</script>
