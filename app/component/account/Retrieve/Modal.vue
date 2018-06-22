<template>
  <b-modal id="retrieve-account"
    ref="modal"
    :lazy="true"
    centered
    @shown="getAccountById"
    no-close-on-backdrop
    size="lg">
    <template slot="modal-title" v-if="account">
      查看账户：{{account.name}} [#{{account.id||'N/A'}}]
    </template>

    <form-view ref="formData" :origin-form="origin"
      :form="accountForm" />

    <div slot="modal-footer">
      <b-btn
        :disabled="!accountForm.valid"
        variant="success"
        @click="createAccount()">保存修改</b-btn>
    </div>
  </b-modal>
</template>

<script>
import FormView from './View.vue';
import axios from 'axios';
import _ from 'lodash';

function FormFactory() {
	return {
    passowrd: '',
		account: {
			name: '',
			ufwd: {
        id: null,
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
      origin: null,
      accountForm: FormFactory(),
    };
  },
  components: {
    FormView
  },
  methods: {
    open() {
      this.$refs.modal.show();
    },
    getAccountById() {
      const { id } = this.account;
      
      Promise.all([
        axios.get(`/api/ufwd/service/account/${id}`),
        axios.get(`/api/ufwd/service/account/${id}/group`),
        axios.get(`/api/ufwd/service/account/${id}/identity`),
      ]).then(([accountRes, groupRes, identityRes]) => {
        const account = accountRes.data.data;
        const accountForm = FormFactory();

        Object.assign(accountForm.account, account);

        accountForm.identity = identityRes.data.data;
        accountForm.group = groupRes.data.data;

        this.origin = _.cloneDeep(this.accountForm = accountForm);
      });
    }
  },
  mounted() {
  }
}
</script>
