<template>
	<div>
		<b-breadcrumb :items="[
			{ text: $t('ufwd.home'), href: '#/'},
			{ text: $t('ufwd.system.notification'), active: true },
		]"/>

		<h3>{{$t('ufwd.notification.notification')}}</h3><hr>

		<b-row>
			<b-col cols="4">
        <b-card
					header-tag="h4"
					header="编辑通知">
					<b-form>
						<b-form-group
							class="form-group-required"
							label="通知标题">
							<b-form-input
								v-model="form.title"
								autocomplete="off" />
						</b-form-group>
						<b-form-group
							class="form-group-required"
							label="消息内容">
							<b-form-textarea
								v-model="form.message"
								rows="7"
								no-resize
								autocomplete="off"
								size="sm" />
						</b-form-group>

						<b-btn
							@click="sendNotification()"
							variant="primary">发送</b-btn>
					</b-form>
        </b-card>
			</b-col>
			<b-col cols="8">
        <b-card
					header-tag="h4"
					header="选择接收人">
					<b-row>
						<b-col>
							<h5>按账户选择</h5><hr>
							<div class="position-relative">
								<b-form-group
									label="搜索用户">
									<b-input-group>
										<b-form-input
											@keyup.native.enter="appendAccount()"
											placeholder="账户名 / 姓名 / 手机号"
											v-model.trim="filter.keyword" />
										<b-input-group-append>
											<b-btn
												@click="appendAccount()"
												variant="primary">添加</b-btn>
										</b-input-group-append>
									</b-input-group>
								</b-form-group>
								<b-card no-body
									:footer="`共${filteredAccount.length}个结果`"
									v-if="filter.keyword&&!isFilteredAccountUniqueByName"
									id="account-search-box">
									<b-list-group flush>
										<b-list-group-item
											class="search-list"
											:key="index"
											@click="selectAccount(account)"
											v-for="(account, index) in filteredAccountWithSlice">
											<b-media>
												<h5>[#{{account.id}}]&nbsp;{{account.name}}</h5>
												<p class="my-0 float-right">电话：{{account.ufwd.phone}}</p>
												<p class="my-0">姓名：{{account.ufwd.name}}</p>
											</b-media>
										</b-list-group-item>
									</b-list-group>
								</b-card>
							</div>

							<b-form-group label="已选择">
								<b-card no-body>
									<b-list-group flush>
										<b-list-group-item
											v-if="!receiver.accountList.length">N/A</b-list-group-item>
										<b-list-group-item
											:key="index"
											v-for="(account, index) in receiver.accountList">
											<b-btn variant="outline-danger"
												size="sm"
												@click="removeAccount(index)"
												class="float-right"><i
													class="fa fa-minus" /></b-btn>
											<b-media>
												<h5>[#{{account.id}}]&nbsp;{{account.name}}</h5>
												<p class="my-0 float-right">电话：{{account.ufwd.phone}}</p>
												<p class="my-0">姓名：{{account.ufwd.name}}</p>
											</b-media>
										</b-list-group-item>
									</b-list-group>
								</b-card>

							</b-form-group>
						</b-col>
						<b-col>
							<h5>按组选择</h5><hr>
							<b-form-group label="所有分组">
								<b-input-group>
									<b-form-select
										v-model="selectedGroup"
										:options="groupOptions">
										<template slot="first">
											<option :value="null" disabled>选择并添加</option>
										</template>
									</b-form-select>
									<b-input-group-append>
										<b-btn
											:disabled="!selectedGroup"
											@click="appendGroup(selectedGroup)"
											variant="primary">添加</b-btn>
									</b-input-group-append>
								</b-input-group>
							</b-form-group>

							<b-form-group label="已选择">
								<b-card no-body>
									<b-list-group flush>
										<b-list-group-item
											v-if="!receiver.groupList.length">N/A</b-list-group-item>
										<b-list-group-item
											:key="index"
											v-for="(group, index) in receiver.groupList">
											<b-btn variant="outline-danger"
												size="sm"
												@click="removeGroup(index)"
												class="float-right"><i
													class="fa fa-minus" /></b-btn>
											<b-media>
													<p class="my-0">[#{{group.id}}]&nbsp;{{group.name}}</p>
											</b-media>
										</b-list-group-item>
									</b-list-group>
								</b-card>
								
							</b-form-group>
						</b-col>
					</b-row>
        </b-card>

			</b-col>
		</b-row>

	</div>
</template>

<script>
import axios from "axios";
import dateFormat from "dateformat";

export default {
	data() {
		return {
			filter: {
				keyword: ''
			},
			selectedAccount: null,
			selectedGroup: null,
			form: {
				title: '',
				message: ''
			},
			receiver: {
				groupList: [],
				accountList: []
			},
			accountList: [],
			groupList: []
		}
	},
	computed: {
		groupOptions() {
			return this.groupList.map(group => {
				return {
					text: group.name,
					value: group
				}
			});
		},
		filteredAccount() {
			const kw = new RegExp(this.filter.keyword);

			return this.accountList.filter(account => {
				if (kw.test(account.name)) {
					return true;
				}

				if (kw.test(account.ufwd.name)) {
					return true;
				}

				if (kw.test(account.ufwd.phone)) {
					return true;
				}

				return false;
			});
		},
		filteredAccountWithSlice() {
			return this.filteredAccount.slice(0, 5);
		},
		isFilteredAccountUniqueByName() {
			return this.accountList.filter(account => {
				if (this.filter.keyword === account.name) {
					this.selectedAccount = account;
					return true;
				}

				return false;
			}).length === 1;
		}
	},
	mounted() {
		if (this.$route.query.accountList) {
			const accountList = JSON.parse(this.$route.query.accountList);

			this.receiver.accountList = accountList;
		}

		this.getGroupList();
		this.getAccountList();
	},
	methods: {
    getAccountList() {
      axios.get('/api/ufwd/service/account').then(res => {
        this.accountList = res.data.data;
      });
    },
		getGroupList() {
			return axios.get(`/api/ufwd/service/group`).then(res => {
				this.groupList = res.data.data;
			});
		},
		appendGroup(group) {
			if (!group) {
				return;
			}

			this.receiver.groupList.push(group);
			this.selectedGroup = null;
		},
		removeGroup(index) {
			this.receiver.groupList.splice(index, 1);
		},
		selectAccount(account) {
			this.filter.keyword = account.name;
			this.selectedAccount = account;
		},
		appendAccount() {
			if (!this.isFilteredAccountUniqueByName) {
				return;
			}

			this.receiver.accountList.push(this.selectedAccount);
			this.selectedAccount = null;
			this.filter.keyword = '';
		},
		removeAccount(index) {
			this.receiver.accountList.splice(index, 1);
		},
		sendNotification() {
			axios.post('/api/ufwd/service/notification', {
				content: this.form.message,
				accountList: this.receiver.accountList.map(account => account.id),
				groupList: this.receiver.groupList.map(group => group.id)
			}).then(() => {
				this.form.title = '';
				this.form.message = '';
			});
		}
	}
}
</script>

<style lang="less">
#account-search-box {
	position: absolute;
	top: 100%;
	width: 100%;
	z-index: 100;
	.search-list:hover {
		background: #f0f0f0;
		cursor: pointer;
	}
}
</style>
