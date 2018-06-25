<template>
	<b-modal id="retrieve-account"
		ref="modal"
		:lazy="true"
		centered
		@shown="getAccountById"
		no-close-on-backdrop
		size="lg">
		<template slot="modal-title">
			查看账户：{{from.account.name}} [#{{from.account.id||'N/A'}}]
		</template>

		<form-view ref="formData"
			:accountId="id"
			:origin-form="origin"
			:form="from" />

		<div slot="modal-footer">
			<b-btn
				:disabled="!from.valid"
				variant="success"
				@click="updateAccount()"><i
					class="fa fa-fw mr-1 "
					:class="{
						'fa-spin': request,
						'fa-refresh': request,
						'fa-plus': !request
					}" />保存修改</b-btn>
		</div>
	</b-modal>
</template>

<script>
import FormView from './View.vue';
import axios from 'axios';
import _ from 'lodash';

function FormFactory() {
	return {
		id: null,
		passowrd: '',
		account: {
			name: '',
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
		valid: false
	};
}

export default {
	props: ['account'],
	data() {
		return {
			id: null,
			request: false,
			origin: null,
			from: FormFactory(),
		};
	},
	components: {
		FormView
	},
	methods: {
		open(id) {
			this.id = id;
			this.$refs.modal.show();
		},
		getAccountById() {
			const { id } = this;

			axios.get(`/api/ufwd/service/account/${id}/administrator`).then(
				() => true,
				() => false
			).then(admin => {
				return Promise.all([
					axios.get(`/api/ufwd/service/account/${id}`),
					axios.get(`/api/ufwd/service/account/${id}/group`),
					axios.get(`/api/ufwd/service/account/${id}/identity`),
				]).then(([accountRes, groupRes, identityRes]) => {
					const account = accountRes.data.data;
					const from = FormFactory();
	
					Object.assign(from.account, account);
	
					from.identity = identityRes.data.data;
					from.group = groupRes.data.data;
					from.admin = admin;
					this.id = from.account.id;
					delete from.account.id;
	
					this.origin = _.cloneDeep(this.from = from);
				});
			});
		},
		updateAccount() {
			const { id } = this;

			const { account } = this.from;
			this.request = true;

			axios.put(`/api/ufwd/service/account/${id}`, account).then(() => {
				const { admin } = this.from;

				if (admin !== this.origin.admin) {
					if (admin) {
						return axios.post(`/api/ufwd/service/administrator`, {
							accountId: id,
							transmitter: {}
						});
					} else {
						return axios.delete(`/api/ufwd/service/administrator/${id}`);
					}
				}
			}).then(() => {
				const newList = this.from.identity;
				const oldList = this.origin.identity;

				const appending = newList.filter(identity => {
					return !oldList.includes(identity);
				});

				const removing = oldList.filter(identity => {
					return !newList.includes(identity);
				});

				return Promise.all([
					appending.length?axios.post(`/api/ufwd/service/account/${id}/identity`, {
						identityPool: appending
					}):null,
					removing.map(identityId => {
						return axios.delete(`/api/ufwd/service/identity/${identityId}/account/${id}`)
					})
				]);
			}).then(() => {
				const newList = this.from.group.map(group => group.id);
				const oldList = this.origin.group.map(group => group.id);

				const appending = newList.filter(groupId => {
					return !oldList.includes(groupId);
				});

				const removing = oldList.filter(groupId => {
					return !newList.includes(groupId);
				});

				return Promise.all([
					appending.length?axios.post(`/api/ufwd/service/account/${id}/group`, {
						groupPool: appending
					}):null,
					removing.map(groupId => {
						return axios.delete(`/api/ufwd/service/account/${id}/group/${groupId}`)
					})
				]);
			}).then(() => {
				this.$refs.modal.hide();
				this.$emit('account-update-success');
			}, err => {
				console.error(err);
			}).then(() => this.request = false);
		}
	},
	mounted() {
	}
}
</script>
