<template>
	<b-modal id="create-account"
		centered
		no-close-on-backdrop
		@shown="initForm"
		size="lg"
		title="创建新账户">
		<b-form>
			<h5><i class="fa fa-user-o fa-fw mr-2" />基本属性</h5><hr>
			<b-row>
				<b-col>
					<b-form-group
						id="username"
						label="用户名"
						label-for="account-username">
						<b-form-input
							size="sm"
							v-model="form.account.name"
							id="account-username" required />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group id="password"
						label="密码"
						label-for="account-password">
						<b-form-input
							id="account-password"
							size="sm"
							v-model="form.account.password"
							required>
						</b-form-input>
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group label="管理员?">
						<b-form-radio-group id="admin"
							buttons
							size="sm"
							button-variant="outline-primary"
							checked="false"
							v-model="form.admin"
							:options="[
								{ text: '是', value: true },
								{ text: '否', value: false }
							]" />
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group label="审核?">
						<b-form-radio-group id="examine"
							buttons
							size="sm"
							button-variant="outline-primary"
							checked="true"
							v-model="form.account.ufwd.examine"
							:options="[
								{ text: '是', value: true },
								{ text: '否', value: false }
							]" />
					</b-form-group>
				</b-col>
			</b-row>

			<h5><i class="fa fa-id-card-o fa-fw mr-2" />身份信息</h5><hr>
			<b-row>
				<b-col cols="auto">
					<b-form-group id="profile-name" style="width: 5em;"
						label="姓名"
						label-for="account-profile-name">
						<b-form-input id="account-profile-name"
							size="sm"
							v-model="form.account.ufwd.name"
							required />
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group label="性别?">
						<b-form-radio-group id="btnradios2"
							size="sm"
							buttons
							button-variant="outline-primary"
							v-model="form.account.ufwd.sex"
							:options="[
								{ text: '男', value: 'male' },
								{ text: '女', value: 'female' }
							]"
							name="radiosBtnDefault" />
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group id="profile-id"
						style="width: 11em;"
						label="身份证号"
						label-for="account-profile-id">
						<b-form-input id="account-profile-id"
							v-model="form.account.ufwd.identification"
							size="sm" required />
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group id="profile-phone"
						style="width: 10em;"
						label="手机号"
						label-for="account-profile-phone">
						<b-form-input id="account-profile-phone"
							v-model="form.account.ufwd.phone"
							size="sm" required />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group id="profile-job"
						label="职务"
						label-for="account-profile-job">
						<b-form-input
							v-model="form.account.ufwd.job"
							size="sm" id="account-profile-job" required />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group id="profile-band"
						label="单位"
						label-for="account-profile-band">
						<b-form-input
							v-model="form.account.ufwd.unit"
							size="sm" id="account-profile-band" required />
					</b-form-group>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="auto">
					<b-form-group id="profile-party"
						style="width: 8em"
						label="政治面貌"
						label-for="account-profile-party">
						<b-form-select
							v-model="form.account.ufwd.party"
							size="sm" id="account-profile-party" required />
					</b-form-group>
				</b-col>
				<b-col cols="auto">
					<b-form-group id="profile-street"
						style="width: 8em"
						label="街道"
						label-for="account-profile-street">
						<b-form-select
							v-model="form.account.ufwd.street"
							size="sm" id="account-profile-street" required />
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group label="身份类别(多选)">
						<b-form-checkbox-group
							buttons
							size="sm"
							button-variant="outline-primary"
							name="butons1"
							:options="[
								'新阶层', '非公经济', '少数民族', '民主党派', '无党派',
								'宗教界人士', '台侨界'
							]">
						</b-form-checkbox-group>
					</b-form-group>
				</b-col>
			</b-row>

			<h5><i class="fa fa-group fa-fw mr-2" />分组设置</h5><hr>
			<b-row>
				<b-col cols="3">
					<b-form-select class="mb-3" size="sm" />
				</b-col>
				<b-col>
					<b-btn v-for="index in 15"
						variant="outline-info"
						size="sm"
						class="mr-2 mb-2"
						:key="index">{{index}}占位<i class="ml-2 fa fa-close" /></b-btn>
					</b-col>
			</b-row>

		</b-form>

		<div slot="modal-footer">
			<b-btn variant="default"
				@click="initForm()">清空</b-btn>
			<b-btn
				variant="success"
				@click="show=false">创建</b-btn>
		</div>
	</b-modal>
</template>

<script>
function FormFactory() {
	return {
		account: {
			name: '',
			password: '000000',
			ufwd: {
				name: '',
				sex: null,
				phone: '',
				identification: '',
				party: null,
				street: null,
				unit: '',
				job: '',
				examine: true
			}
		},
		admin: false,
		group: [],
		identity: [],
	};
}

export default {
	data() {
		const available = {
			gourp: [],
			party: [],
			identity: [],
			street: []
		};

		return {
			form: FormFactory(),
			available
		};
	},
	methods: {
		initForm() {
			this.form = FormFactory();
		},
		createAccount() {

		}
	}
}
</script>

