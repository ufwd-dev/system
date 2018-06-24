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
				<b-form-group
					label="关键字过滤"
					style="width: 12em">
					<b-form-input
						size="sm"
						v-model.trim="filterSetting.keyword"
						placeholder="姓名 / 身份证 / 手机号" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group
					label="政治面貌"
					style="width: 10em">
					<b-form-select
						size="sm"
						v-model="filterSetting.party"
						:options="partyOptions">
						<template slot="first">
							<option :value="null">全部</option>
						</template>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group label="所属街道" style="width: 10em">
					<b-form-select
						size="sm"
						v-model="filterSetting.street"
						:options="streetOptions">
						<template slot="first">
							<option :value="null">全部</option>
						</template>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="身份类别">
					<b-form-checkbox-group
						size="sm"
						button-variant="outline-primary"
						buttons
						v-model="filterSetting.identity"
						:options="identityOptions" />
				</b-form-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col md="auto">
				<b-form-group label="通过审核?">
					<b-form-radio-group
						size="sm"
						button-variant="outline-success"
						buttons
						v-model="filterSetting.examine"
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
						size="sm"
						button-variant="outline-primary"
						buttons
						v-model="filterSetting.admin"
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
					<b-btn variant="secondary"
						size="sm"
						@click="resetFilter()">重置过滤器</b-btn>
				</b-form-group>
			</b-col>
		</b-row>
	</b-card><hr>

	<b-row>
		<b-col cols="auto">
			<b-input-group size="sm"
				prepend="每页"
				append="行"
				style="width: 135px;">
				<b-form-input
					value="20"
					:readonly="autoPerPage"
					type="number"
					v-model.number="computedPerPage"
					class="text-center" />
			</b-input-group>
		</b-col>
		<b-col cols="auto">
			<b-form-radio-group
				size="sm"
				buttons
				button-variant="outline-secondary"
				v-model="autoPerPage"
				:options="[
					{ text: '自动', value: true },
					{ text: '手动', value: false }
				]" />
		</b-col>
		<b-col>
			<b-btn v-b-modal="'create-account'"
				size="sm"
				variant="primary"><i class="fa fa-plus mr-2" />创建</b-btn>
		</b-col>
		<b-col cols="auto">
			<b-pagination
				size="sm"
				:limit="7"
				align="right"
				v-model="currentPage"
				:total-rows="totalRows"
				:per-page="computedPerPage" />
		</b-col>
	</b-row>

	<div ref="dataTableContainer" class="overflow-auto w-100">
		<b-table id="account-list"
			:items="accountList"
			striped hover bordered small
			:per-page="computedPerPage"
			:current-page="currentPage"
			:filter="filter"
			:fields="[
				{ key: 'examine', label: $t('ufwd.user.examine'), class: 'data-examine' },
				{ key: 'name', label: $t('ufwd.user.username'), sortable: true },
				{ key: 'ufwdname', label: $t('ufwd.user.name'), class: 'data-name'},
				{ key: 'phone', label: $t('ufwd.user.phone')},
				{
					key: 'identification',
					label: $t('ufwd.user.identification'),
					class: 'data-identification'},
				{ key: 'admin', label: $t('ufwd.user.admin'), class: 'data-admin'},
				{ key: 'party', label: $t('ufwd.user.party'), class: 'data-party'},
				{ key: 'street', label: $t('ufwd.user.street'), class: 'data-street'},
				{ 
					key: 'ufwd.created_at',
					label: $t('ufwd.user.createAt'),
					class: 'data-created-at'},
			]"
			@filtered="updateTotalRows"
			@row-dblclicked="openRetrieveAccount">

			<template slot="examine" slot-scope="data">
				<b-form-radio-group
					buttons
					button-variant="outline-success"
					size="sm"
					@change.native="updateAccount(data.item)"
					v-model.lazy="data.item.ufwd.examine"
					:options="[
						{ text: '是', value: true },
						{ text: '否', value: false }
					]" />
			</template>

			<template slot="name" slot-scope="data">
				<b-btn variant="link"
					@click="openRetrieveAccount(data.item)">{{data.item.name||'N/A'}}
				</b-btn>
			</template>

			<template slot="ufwdname" slot-scope="data">
				{{data.item.ufwd.name||'N/A'}}
			</template>

			<template slot="phone" slot-scope="data">
				{{data.item.ufwd.phone||'N/A'}}
			</template>

			<template slot="identification" slot-scope="data">
				{{data.item.ufwd.identification||'N/A'}}
			</template>

			<template slot="party" slot-scope="data">
				{{partyMapping[data.item.ufwd.party]||'N/A'}}
			</template>

			<template slot="street" slot-scope="data">
				{{streetMapping[data.item.ufwd.street]||'N/A'}}
			</template>

			<template slot="admin" slot-scope="data">
				<b-form-radio-group
					buttons
					button-variant="outline-primary"
					size="sm"
					v-model="data.item.admin"
					@change="updateAdmin(data.item)"
					:options="[
						{ text: '是', value: true },
						{ text: '否', value: false }
					]" />
			</template>

			<template slot="ufwd.created_at" slot-scope="data">
				{{data.item.ufwd.created_at|isoDateTime}}
			</template>
		</b-table>
	</div>
	
	<create-account 
		@account-create-success="getAccountList()" />
	<retrieve-account :account="account"
		@account-update-success="getAccountList()"
		ref="retrieveAccount" />
</div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

import CreateAccount from "./Create";
import RetrieveAccount from "./Retrieve";

function DefaultFilterSettingFactory() {
	return {
		party: null,
		street: null,
		keyword: '',
		identity: [],
		examine: null,
		admin: null
	};
}

export default {
	name: "user",
	
  data() {
    return {
			account: null,
			filterSetting: DefaultFilterSettingFactory(),
			autoPerPage: true,
			currentPage: 1,
			computedPerPage: 10,
			accountList: [],
			totalRows: 0,
    };
	},
	computed: {
		identityOptions() {
			const all = this.$store.state.system.available.identity;
			const restrict = this.$store.state.system.restrict.identity;

			return this.$store.state.system.available.identity.map(identity => {
				return {
					text: identity.name,
					value: identity.id,
					checked: true,
					disabled: restrict ? !restrict.find(id => id === identity.id) : false
				};
			});
		},
		partyOptions() {
			return this.$store.getters['system/availableParty'].map(party => {
				return { text: party.name, value: party.id };
			});
		},
		streetOptions() {
			return this.$store.getters['system/availableStreet'].map(street => {
				return { text: street.name, value: street.id };
			});
		},
		partyMapping() {
			const mapping = {};
			
			this.$store.getters['system/availableParty'].forEach(party => {
				mapping[party.id] = party.name;
			});

			return mapping;
		},
		streetMapping() {
			const mapping = {};
			
			this.$store.getters['system/availableStreet'].forEach(street => {
				mapping[street.id] = street.name;
			});

			return mapping;
		}
	},
	components: {
		CreateAccount, RetrieveAccount
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
  methods: {
		updateAdmin({ id, admin }) {
			if (!admin) {
				axios.post(`/api/ufwd/service/administrator`, {
					accountId: id,
					transmitter: {}
				});
			} else {
				axios.delete(`/api/ufwd/service/administrator/${id}`);
			}
		},
		updateTotalRows(filteredItems) {
			this.totalRows = filteredItems.length;
		},
    getAccountList() {
      axios.get('/api/ufwd/service/account').then(res => {
        this.accountList = res.data.data;
      });
    },
    openRetrieveAccount(account) {
			this.account = account;

			this.$refs.retrieveAccount.open();
    },
    updateAccount({ id, ufwd }) {
      return axios.put(`/api/ufwd/service/account/${id}`, {
        ufwd: { examine: !ufwd.examine }
      });
		},
		isRestrict(name) {
			return this.$store.getters['system/isFieldRestricted'](name);
		},
		filter(item) {
			const {
				party, street, keyword, examine, admin,
				identity
			} = this.filterSetting;
			let flag = true;

			if (examine !== null) {
				flag = flag && item.ufwd.examine === examine;
			}

			if (admin !== null) {
				flag = flag && item.admin === admin;
			}

			if (party !== null) {
				flag = flag && item.ufwd.party === party;
			} else if (this.isRestrict('party')) {
				flag = flag &&
					Boolean(this.$store.getters['system/availableParty'].find(party => {
						return party.id === item.ufwd.party;
					}));
			}

			if (street !== null) {
				flag = flag && item.ufwd.street === street;
			} else if (this.isRestrict('street')) {
				flag = flag &&
					Boolean(this.$store.getters['system/availableStreet'].find(street => {
						return street.id === item.ufwd.street;
					}));
			}

			if (item.identity) {
				flag = flag && item.identity.find(id => {
					return identity.includes(id);
				});
			}

			if (keyword.length) {
				const reg = new RegExp(keyword);

				flag = flag && (
					reg.test(item.name) ||
					reg.test(item.ufwd.name) ||
					reg.test(item.ufwd.phone) ||
					reg.test(item.ufwd.identification)
				);
			}

			return flag;
		},
		resetFilter() {
			this.filterSetting = DefaultFilterSettingFactory();
			this.filterSetting.identity =
				this.$store.state.system.restrict.identity ||
				this.identityOptions.map(({ value }) => value);
		}
  },
  mounted() {
		this.getAccountList();
		this.resetFilter();

		this.updateComputedPerPage = () => {
			if (!this.autoPerPage) {
				return;
			}
			
			const { top } = this.$refs.dataTableContainer.getBoundingClientRect();
			this.computedPerPage = Math.floor((window.innerHeight - top) / 36) - 1;
		}

		window.addEventListener('resize', this.updateComputedPerPage);
		this.updateComputedPerPage();
	},
	destroyed() {
		window.removeEventListener('resize', this.updateComputedPerPage);
	},
	watch: {
		identityOptions() {
			this.resetFilter();
		}
	}
};
</script>

<style lang="less">
table#account-list {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	td {
		vertical-align: middle;
	}

	.data-examine {
		width: 5em;
	}

	.data-party {
		width: 8em;
	}

	.data-street {
		width: 9em;
	}

	.data-name {
		width: 5em;
	}

	.data-admin {
		width: 5em;
	}

	.data-created-at {
		width: 12em;
	}
}
</style>

