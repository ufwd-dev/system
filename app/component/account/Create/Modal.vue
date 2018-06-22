<template>
  
	<b-modal id="create-account"
		centered
		no-close-on-backdrop
		@shown="initForm"
		ref="modal"
		size="lg"
		title="创建新账户">

    <form-view ref="formData"
      :form="newForm" />

		<div slot="modal-footer">
			<b-btn variant="danger"
				@click="initForm()">清空</b-btn>
			<b-btn
				:disabled="!newForm.valid"
				variant="success"
				@click="createAccount()"><i
					class="fa fa-fw mr-1 "
					:class="{
						'fa-spin': request,
						'fa-refresh': request,
						'fa-plus': !request
					}" />创建</b-btn>
		</div>
	</b-modal>
</template>

<script>
import FormView from './View.vue';
import axios from 'axios';

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
    valid: false
	};
}

export default {
  data() {
    return {
			request: false,
      newForm: FormFactory()
    };
  },
  components: {
    FormView
  },
  methods: {
		initForm() {
			this.newForm = FormFactory();
		},
		createAccount() {
      const body = this.newForm.account;
			this.request = true;

      axios.post('/api/ufwd/service/account', body)
        .then(res => res.data.data)
        .then(account => Promise.all([
          axios.post('/api/ufwd/service/administrator', {
            accountId: account.id
          }),
          axios.post(`/api/ufwd/service/group/account/${account.id}`, {
            groupPool: this.newForm.group.map(group => group.id)
          }),
          axios.post(`/api/ufwd/service/identity/account/${account.id}`, {
            identityPool: this.newForm.identity
          })
        ])).then(() => {
					this.$refs.modal.hide();
				}, err => {
          console.error(err);
        }).then(() => this.request = false);
		}
  },
  mounted() {
    this.initForm();
  }
}
</script>
