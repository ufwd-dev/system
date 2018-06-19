<template>
  
	<b-modal id="create-account"
		centered
		no-close-on-backdrop
		@shown="initForm"
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
				@click="createAccount()">创建</b-btn>
		</div>
	</b-modal>
</template>

<script>
import FormView from './form/View.vue';
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

      delete body.ufwd.examine;

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
        ]))
        .catch((err) => {
          console.error(err);
        });
		}
  },
  mounted() {
    this.initForm();
  }
}
</script>
