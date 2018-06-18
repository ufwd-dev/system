<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: $t('ufwd.menu.account'), active: true },
	]"/>

	<h3>{{$t('ufwd.user.users')}}</h3><hr>

	<b-card title="查询选项">
		<b-row>
			<b-col cols="auto">
				<b-form-group label="关键字过滤" style="width: 16em">
					<b-input-group>
						<b-form-input v-model="filter"
							placeholder="姓名 / 身份证 / 手机号" />
						<b-input-group-append>
							<b-btn :disabled="!filter"
								variant="primary"
								@click="filter = ''">重置</b-btn>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group label="政治面貌" style="width: 10em">
					<b-form-select />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group label="所属街道" style="width: 10em">
					<b-form-select />
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="通过审核?">
					<b-form-radio-group
						button-variant="primary"
						buttons
						:checked="null"
						:options="[
							{ text: '全部', value: null },
							{ text: '是', value: true },
							{ text: '否', value: false },
						]" />
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="管理员?">
					<b-form-radio-group
						button-variant="primary"
						buttons
						:checked="null"
						:options="[
							{ text: '全部', value: null },
							{ text: '是', value: true },
							{ text: '否', value: false },
						]" />
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="设置">
					<b-btn>重置过滤器</b-btn>
				</b-form-group>
			</b-col>
		</b-row>
	</b-card><hr>

	<b-row>
		<b-col cols="auto">
			<b-input-group prepend="每页" style="width: 250px;">
				<b-form-input
					value="20"
					type="number"
					class="text-center" />
				<b-input-group-append>
					<div class="input-group-text">行</div>
					<b-btn>手动</b-btn>
					<b-btn>自动</b-btn>
				</b-input-group-append>
			</b-input-group>
		</b-col>
		<b-col>
			<b-btn v-b-modal="'create-account'"
				variant="primary"><i class="fa fa-plus mr-2" />创建</b-btn>
		</b-col>
		<b-col cols="auto">
			<b-pagination
				:limit="7"
				align="right"
				:total-rows="100"
				:per-page="10" />
		</b-col>
	</b-row>

	<b-table :items="accountList"
		striped hover bordered small
		:filter="filter"
		:fields="[
			{ key: 'examine', label: $t('ufwd.user.examine'), class: 'data-examine' },
			{ key: 'username', label: $t('ufwd.user.username') },
			{ key: 'name', label: $t('ufwd.user.name')},
			{ key: 'phone', label: $t('ufwd.user.phone')},
			{
				key: 'identification',
				label: $t('ufwd.user.identification'),
				class: 'data-identification'},
			{ key: 'admin', label: $t('ufwd.user.admin'), class: 'data-admin'},
			{ key: 'party', label: $t('ufwd.user.party')},
			{ key: 'street', label: $t('ufwd.user.street')},
		]"
		@row-dblclicked="getAccountById">

		<template slot="examine" slot-scope="data">
			<b-form-checkbox v-model="data.item.examine"
				@change.native="updateAccount(data.item)" />
		</template>

		<template slot="name" slot-scope="data">
			{{data.item.name||'N/A'}}
		</template>

		<template slot="phone" slot-scope="data">
			{{data.item.phone||'N/A'}}
		</template>

		<template slot="identification" slot-scope="data">
			{{data.item.identification||'N/A'}}
		</template>

		<template slot="party" slot-scope="data">
			{{data.item.party||'N/A'}}
		</template>

		<template slot="street" slot-scope="data">
			{{data.item.street||'N/A'}}
		</template>

		<template slot="admin" slot-scope="data" class="text-center">
			<i class="fa fa-check" />
		</template>
	</b-table>
	
	<create-account />
</div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

import CreateAccount from "./Create.vue";

export default {
  name: "user",
  data() {
    return {
			filter: null,
      accountList: []
    };
  },
	components: {
		CreateAccount
	},
  methods: {
    getAccount() {
      axios.get("/api/ufwd/service/account").then(res => {
        this.accountList = res.data.data;
      });
    },
    getAccountById({ id }) {
      this.$router.push(`user-list/${id}/info`);
    },
    updateAccount({ id, examine }) {
      return axios.put(`/api/ufwd/service/account/${id}`, {
        ufwd: { examine: !examine }
      });
    }
  },
  mounted() {
    this.getAccount();
  }
};
</script>

<style>
.data-examine {
	width: 1em;
}

.data-admin {
	width: 4em;
}
</style>

