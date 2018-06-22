<template>
	<b-form>
		<h5><i class="fa fa-user-o fa-fw mr-2" />基本属性</h5><hr>
		<b-row>
			<b-col>
				<b-form-group
					class="form-group-required"
					id="username"
					label="用户名"
					:state="!$v.form.account.name.$invalid"
					:invalid-feedback="accountNameInvalid"
					label-for="account-username">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input
						autocomplete="off"
						:state="!$v.form.account.name.$invalid"
						size="sm"
						v-model.trim.lazy="form.account.name"
						id="account-username" />
				</b-form-group>
			</b-col>

			<b-col>
				<b-form-group id="password"
					class="form-group-required"
					label="密码"
					:invalid-feedback="accountPasswordInvalid"
					:state="!$v.form.account.password.$invalid"
					label-for="account-password">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input
						autocomplete="off"
						:state="!$v.form.account.password.$invalid"
						id="account-password"
						size="sm"
						v-model="form.account.password" />
					</b-form-input>
				</b-form-group>
			</b-col>

			<b-col cols="auto">
				<b-form-group label="管理员?"
					class="form-group-required">
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
				<b-form-group label="审核?"
					class="form-group-required">
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
				<b-form-group id="profile-name"
					class="form-group-required"
					style="width: 6em;"
					label="姓名"
					:invalid-feedback="ufwdNameInvalid"
					:state="!$v.form.account.ufwd.name.$invalid"
					label-for="account-profile-name">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input id="account-profile-name"
						autocomplete="off"
						:state="!$v.form.account.ufwd.name.$invalid"
						size="sm"
						v-model.trim="form.account.ufwd.name"/>
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group label="性别?"
					:invalid-feedback="ufwdSexInvalid"
					:state="!$v.form.account.ufwd.sex.$invalid"
					class="form-group-required">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-radio-group id="btnradios2"
						size="sm"
						buttons
						:state="!$v.form.account.ufwd.sex.$invalid"
						button-variant="outline-primary"
						v-model="form.account.ufwd.sex"
						:options="[
							{ text: '男', value: 'male' },
							{ text: '女', value: 'female' }
						]" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group id="profile-id"
					class="form-group-required"
					style="width: 11em;"
					label="身份证号"
					:invalid-feedback="ufwdIdentificationInvalid"
					:state="!$v.form.account.ufwd.identification.$invalid"
					label-for="account-profile-id">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input id="account-profile-id"
						autocomplete="off"
						:state="!$v.form.account.ufwd.identification.$invalid"
						v-model.trim="form.account.ufwd.identification"
						size="sm" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group id="profile-phone"
					class="form-group-required"
					style="width: 10em;"
					:invalid-feedback="ufwdPhoneInvalid"
					:state="!$v.form.account.ufwd.phone.$invalid"
					label="手机号"
					label-for="account-profile-phone">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input id="account-profile-phone"
						autocomplete="off"
						:state="!$v.form.account.ufwd.phone.$invalid"
						v-model.trim="form.account.ufwd.phone"
						size="sm" />
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group id="profile-job"
					class="form-group-required"
					:invalid-feedback="ufwdJobInvalid"
					:state="!$v.form.account.ufwd.job.$invalid"
					label="职务"
					label-for="account-profile-job">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input
						v-model.trim="form.account.ufwd.job"
						:state="!$v.form.account.ufwd.job.$invalid"
						size="sm" id="account-profile-job" />
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group id="profile-band"
					class="form-group-required"
					:invalid-feedback="ufwdUnitInvalid"
					:state="!$v.form.account.ufwd.unit.$invalid"
					label="单位"
					label-for="account-profile-band">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-input
						:state="!$v.form.account.ufwd.unit.$invalid"
						v-model.trim="form.account.ufwd.unit"
						size="sm" id="account-profile-band" />
				</b-form-group>
			</b-col>
		</b-row>

		<b-row>
			<b-col cols="auto">
				<b-form-group id="profile-party"
					class="form-group-required"
					style="width: 9em"
					label="政治面貌"
					:invalid-feedback="ufwdPartyInvalid"
					:state="!$v.form.account.ufwd.party.$invalid"
					label-for="account-profile-party">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-select
						:options="partyOptions"
						:state="!$v.form.account.ufwd.party.$invalid"
						v-model="form.account.ufwd.party"
						size="sm" id="account-profile-party">
						<template slot="first">
							<option :value="null" disabled>请选择政治面貌</option>
						</template>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group id="profile-street"
					class="form-group-required"
					style="width: 7em"
					label="街道"
					:invalid-feedback="ufwdStreetInvalid"
					:state="!$v.form.account.ufwd.street.$invalid"
					label-for="account-profile-street">
					<template slot="valid-feedback"><valid-feedback /></template>
					<b-form-select
						:options="streetOptions"
						v-model="form.account.ufwd.street"
						:state="!$v.form.account.ufwd.street.$invalid"
						size="sm" id="account-profile-street">
						<template slot="first">
							<option :value="null" disabled>请选择街道</option>
						</template>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col>
				<b-form-group label="身份类别(多选)">
					<b-form-checkbox-group
						buttons
						size="sm"
						button-variant="outline-primary"
						name="butons1"
						v-model="form.identity"
						:options="identityOptions">
					</b-form-checkbox-group>
				</b-form-group>
			</b-col>
		</b-row>

		<h5><i class="fa fa-group fa-fw mr-2" />分组设置</h5><hr>
		<b-row>
			<b-col cols="4">
				<b-input-group size="sm">
					<b-form-select
						:options="groupOptions"
						v-model="selectedGroup">
						<template slot="first">
							<option :value="null" disabled>选择分组并添加</option>
						</template>
					</b-form-select>
					<b-input-group-append>
						<b-btn
							:disabled="!selectedGroup"
							variant="success"
							@click="appendToFormGroup()">添加</b-btn>
					</b-input-group-append>
				</b-input-group>
			</b-col>
			<b-col>
				<b-btn v-for="(group, index) in form.group"
					variant="outline-info"
					size="sm"
					@click="uncheckGroup(index)"
					class="mr-2 mb-2"
					:key="index">{{group.name}}<i class="ml-2 fa fa-close" /></b-btn>
				</b-col>
		</b-row>

	</b-form>
</template>

<script>
import ValidFeedback from '../utils/ValidFeedback.vue';
import axios from 'axios';
import validate from './validate';

export default {
	components: {
		ValidFeedback
	},
	props: ['form', 'valid'],
	mixins: [validate],
	data() {
		return {
			selectedGroup: null,
		};
	},
	computed: {
		partyOptions() {
			return this.$store.getters['system/availableParty'].map(party => {
				return {
					text: party.name,
					value: party.id
				};
			});
		},
		streetOptions() {
			return this.$store.getters['system/availableStreet'].map(street => {
				return {
					text: street.name,
					value: street.id
				};
			});
		},
		identityOptions() {
			return this.$store.getters['system/availableIdentity'].map(identity => {
				return {
					text: identity.name,
					value: identity.id
				}
			});
		},
		groupOptions() {
			return this.$store.getters['system/availableGroup'].filter(group => {
				return !this.form.group.find(selected => {
					return selected.id === group.id
				});
			}).map(group => {
				return {
					text: group.name,
					value: group
				}
			});
		},
	},
	methods: {
		appendToFormGroup() {
			this.form.group.push(this.selectedGroup);
			this.selectedGroup = null;
		},
		uncheckGroup(index) {
			this.form.group.splice(index, 1);
		}
	},
	watch: {
		form: {
			handler() {
				this.form.valid = !this.$v.$invalid;
			},
			deep: true
		}
	}
}
</script>

<style lang="less">
.form-group-required {
	> label, legend {
		&::before {
			content: "*";
			color: red;
			margin-right: .25em
		}
	}
}
.custom-select-sm {
	padding: .25em .5em;
}
</style>

