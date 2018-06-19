<script>
export default {
	methods: {
		createUser(formName) {
			console.log(this.group.checkedGroupPool, this.identity.checkedIdentity);
			
			this.$refs[formName].validate((valid) => {
				if (valid) {

					return axios.post(`/api/ufwd/service/account`, {
						name: this.userForm.username,
						password: this.userForm.password,
						ufwd: {
							name: this.userForm.name,
							sex: this.userForm.sex,
							phone: this.userForm.phone,
							identification: this.userForm.identification,
							party: this.userForm.party,
							street: this.userForm.street,
							unit: this.userForm.unit,
							job: this.userForm.job
						}
					}).then(res => {
						if (res.data.message) {
							throw new Error(res.data.message);
						}

						this.accountId = res.data.data.id;

						return res.data.data;
					}).then(() => {
						return this.createAdmin();
					}).then(() => {
						if (this.identity.checkedIdentity.length !== 0) {

							return this.createAccountIdentityLabelPool(this.identity.checkedIdentity);
						}
					}).then(() => {
						if (this.group.checkedGroupPool.length !== 0) {
							
							return this.createAccountGroupPool(this.group.checkedGroupPool);
						}
					}).then(() => {
						this.$refs[formName].resetFields();

						this.$notify({
							title: '成功',
							message: '用户创建成功！',
							type: 'success'
						});
					}).then(() => {
						this.getAccount();
					}).catch(err => {
						this.$refs[formName].resetFields();
						this.getAccount();

						this.$notify.error({
							title: '错误',
							message: err.message
						});

						console.log(err);
					});
				} else {
					this.$notify.error({
						title: '错误',
						message: '请把表单填写完整。'
					});
				}
			});
		},
		createAdmin() {
			if (this.admin) {
				return axios.post('/api/ufwd/service/administrator', {
					accountId: this.accountId
				});
			}
		},
		createAccountGroupPool(list) {
			return axios.post(`/api/ufwd/service/group/account/${this.accountId}`, {
				groupPool: list
			});
		},
		createAccountIdentityLabelPool(list) {
			return axios.post(`/api/ufwd/service/identity/account/${this.accountId}`, {
				identityPool: list
			});
		}
	}
}
</script>
