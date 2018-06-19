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
					<b-form-input
						v-model.trim="filterSetting.keyword"
						placeholder="姓名 / 身份证 / 手机号" />
				</b-form-group>
			</b-col>
			<b-col cols="auto">
				<b-form-group label="政治面貌" style="width: 10em">
					<b-form-select
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
						v-model="filterSetting.street"
						:options="streetOptions">
						<template slot="first">
							<option :value="null">全部</option>
						</template>
					</b-form-select>
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="通过审核?">
					<b-form-radio-group
						button-variant="outline-primary"
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
					<b-btn variant="success"
						@click="resetFilter()">重置过滤器</b-btn>
				</b-form-group>
			</b-col>
		</b-row>
	</b-card><hr>

	<b-row>
		<b-col cols="auto">
			<b-input-group prepend="每页" style="width: 250px;">
				<b-form-input
					value="20"
					:readonly="autoPerPage"
					type="number"
					v-model.number="computedPerPage"
					class="text-center" />
				<b-input-group-append>
					<div class="input-group-text">行</div>
					<b-form-radio-group id="btnradios1"
						buttons
						button-variant="outline-secondary"
						v-model="autoPerPage"
						:options="[
							{ text: '自动', value: true },
							{ text: '手动', value: false }
						]" />
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
				{ key: 'username', label: $t('ufwd.user.username') },
				{ key: 'name', label: $t('ufwd.user.name')},
				{ key: 'phone', label: $t('ufwd.user.phone')},
				{
					key: 'identification',
					label: $t('ufwd.user.identification'),
					class: 'data-identification'},
				{ key: 'admin', label: $t('ufwd.user.admin'), class: 'data-admin'},
				{ key: 'party', label: $t('ufwd.user.party'), class: 'data-party'},
				{ key: 'street', label: $t('ufwd.user.street')},
				{ key: 'created_at', label: $t('ufwd.user.createAt'), class: 'data-created-at'},
			]"
			@filtered="updateTotalRows"
			@row-dblclicked="getAccountById">

			<template slot="examine" slot-scope="data">
				<b-form-radio-group
					buttons
					button-variant="outline-success"
					size="sm"
					@change.native="updateAccount(data.item)"
					v-model.lazy="data.item.examine"
					:options="[
						{ text: '是', value: true },
						{ text: '否', value: false }
					]" />
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

			<template slot="admin" slot-scope="data">
				<b-form-radio-group
					buttons
					button-variant="outline-primary"
					size="sm"
					v-model="data.item.admin"
					:options="[
						{ text: '是', value: true },
						{ text: '否', value: false }
					]" />
			</template>

			<template slot="created_at" slot-scope="data">
				{{data.item.created_at|isoDateTime}}
			</template>
		</b-table>
	</div>
	
	<create-account />
</div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

import CreateAccount from "./Create.vue";

function DefaultFilterSettingFactory() {
	return {
		party: null,
		street: null,
		keyword: '',
		examine: null,
		admin: null
	};
}

export default {
	name: "user",
	
  data() {
    return {
			filterSetting: DefaultFilterSettingFactory(),
			autoPerPage: true,
			currentPage: 1,
			computedPerPage: 10,
			accountList: [],
			totalRows: 0,
    };
	},
	computed: {
		partyOptions() {
			return this.$store.getters['system/availableParty'].map(party => {
				return party.name;
			});
		},
		streetOptions() {
			return this.$store.getters['system/availableStreet'].map(street => {
				return street.name;
			});
		},
	},
	components: {
		CreateAccount
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'isoDate') + ' ' + dateFormat(date, 'isoTime');
		}
	},
  methods: {
		updateTotalRows(filteredItems) {
			this.totalRows = filteredItems.length;
		},
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
		},
		filter(item) {
			const {
				party, street, keyword, examine, admin
			} = this.filterSetting;
			let flag = true;

			if (examine !== null) {
				flag = flag && item.examine === examine;
			}

			if (admin !== null) {
				flag = flag && item.admin === admin;
			}

			if (party !== null) {
				flag = flag && item.party === party;
			}

			if (street !== null) {
				flag = flag && item.street === street;
			}

			if (keyword.length) {
				const reg = new RegExp(keyword);

				flag = flag && (
					reg.test(item.username) ||
					reg.test(item.name) ||
					reg.test(item.phone) ||
					reg.test(item.identification)
				);
			}

			return flag;
		},
		resetFilter() {
			this.filterSetting = DefaultFilterSettingFactory();
		}
  },
  mounted() {
		this.getAccount();

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

	.data-admin {
		width: 5em;
	}

	.data-created-at {
		width: 12em;
	}
}
</style>

