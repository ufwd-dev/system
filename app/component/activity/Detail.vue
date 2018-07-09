<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '活动', href: '#/ufwd/activity/list'},
		{ text: form.title || 'N/A', active: true },
	]"/>

	<h3>查看活动</h3><hr>

	<b-row>
		<b-col cols="5">
			<b-card title="属性">
				<b-form>
					<b-row>
						<b-col cols="5">
							<b-form-group
								class="form-group-required"
								:invalid-feedback="validateTitle"
								:state="!$v.form.title.$invalid"
								label="名称">
								<b-form-input
									:state="!$v.form.title.$invalid"
									autocomplete="off"
									size="sm"
									v-model="form.title"/>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group
							:invalid-feedback="validateLocation"
							:state="!$v.form.location.$invalid"
								class="form-group-required"
								label="地点">
								<b-form-input
									:state="!$v.form.location.$invalid"
									autocomplete="off"
									size="sm"
									v-model="form.location"/>
							</b-form-group>
						</b-col>
					</b-row>

					<b-row>
						<b-col cols="auto">
							<b-form-group label="发布?">
								<b-form-radio-group
									size="sm"
									button-variant="outline-primary"
									buttons
									v-model="form.published"
									:options="[
										{ text: '是', value: true },
										{ text: '否', value: false },
									]" />
							</b-form-group>
						</b-col>
						<b-col>
							<datetime label="开始时间" v-model="form.start"/>
						</b-col>
						<b-col>
							<datetime label="结束时间" v-model="form.end"/>
						</b-col>
					</b-row>

					<b-form-group
						:invalid-feedback="validateAbstract"
						:state="!$v.form.abstract.$invalid"
						class="form-group-required"
						description="少于200字，将显示在APP的活动列表中"
						label="摘要">
						<b-form-textarea
							:state="!$v.form.abstract.$invalid"
							rows="3"
							no-resize
							autocomplete="off"
							size="sm"
							v-model="form.abstract"/>
					</b-form-group>
					<b-form-group
						:invalid-feedback="validateDescription"
						:state="!$v.form.description.$invalid"
						class="form-group-required"
						label="描述">
						<b-form-textarea
							:state="!$v.form.description.$invalid"
							rows="8"
							no-resize
							autocomplete="off"
							size="sm"
							v-model="form.description"/>
					</b-form-group>
				</b-form>

				<b-row>
					<b-col md="auto">
						<b-btn variant="success"
							size="sm"
							@click="updateActivity()">保存修改</b-btn>
						<b-btn
							v-b-modal.modal1
							size="sm">签到二维码</b-btn>
					</b-col> 
					<b-modal id="modal1" centered title="签到二维码" :ok-only="true" ok-title="关闭二维码">
						<p class="my-4 text-center">
							<qrcode-vue :value="code.value" :size="code.size" level="H"></qrcode-vue>
						</p>
					</b-modal>
				</b-row>
			</b-card>
		</b-col>

		<b-col>
			
			<b-card title="出席&签到">
				<b-row>
					<b-col>
						<b-form-group
							class="form-group-required"
							label="按账户添加">
							<!-- <b-form-input
								autocomplete="off"
								size="sm"/> -->
								
							<b-input-group>
										<b-form-input
											size="sm"
											placeholder="账户名 / 姓名 / 手机号"
											v-model.trim="filter.keyword" />
										<b-input-group-append>
											<b-btn
												size="sm"
												@click="appendAccount()"
												variant="primary">添加</b-btn>
										</b-input-group-append>
									</b-input-group>
						</b-form-group>

						<b-card no-body
								:footer="`共${filteredAccount.length}个结果`"
								v-if="filter.keyword !== attendance.accountName && filter.keyword !== ''"
								id="attendance-account-search-box">
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
					</b-col>
					<b-col>
						<b-form-group
							class="form-group-required"
							label="按组添加">
							<!-- <b-form-input
								autocomplete="off"
								size="sm"/> -->

							<b-input-group>
								<b-form-select
									size="sm"
									v-model="attendance.group"
									:options="groupOptions">
									<template slot="first">
										<option :value="null" disabled>选择并添加</option>
									</template>
								</b-form-select>
								<b-input-group-append>
									<b-btn
										size="sm"
										:disabled="!attendance.group"
										@click="appendGroup()"
										variant="primary">添加</b-btn>
								</b-input-group-append>
							</b-input-group>

						</b-form-group>
					</b-col>
					<b-col md="auto">
						<b-form-group
							class="form-group-required"
							label="活动通知">
							<b-btn variant="primary"
								size="sm"
								@click="sendMessage()">编辑并发送</b-btn>
						</b-form-group>
					</b-col>
				</b-row>
				<b-card title="查询选项">
					<b-row>
						<b-col cols="auto">
							<b-form-group
								label="关键字过滤"
								style="width: 12em">
								<b-form-input
									size="sm"
									v-model="filterSettings.keyword"
									placeholder="姓名 / 电话 / 身份证号" />
							</b-form-group>
						</b-col>
						<b-col md="auto">
							<b-form-group label="已签到?">
								<b-form-radio-group
									size="sm"
									button-variant="outline-primary"
									buttons
									v-model="filterSettings.signIn"
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

				</b-card>
				<hr>


				<b-row align-h="end">
					<b-col cols="auto" >
						<b-pagination
							size="sm"
							:limit="7"
							v-model="currentPage"
							:total-rows="totalRows"
							:per-page="computedPerPage" />
					</b-col>
				</b-row>

				<b-table
					hover bordered small
					caption-top
					:current-page="currentPage"
					:per-page="computedPerPage"
					:items="attendanceList"
					:filter="filterTable"
					:fields="[
						{ key: 'id', label: '#', class: 'data-id' },
						{ key: 'name', label: '姓名', class: 'data-name' },
						{ key: 'identification', label: '身份证', class: 'data-idcard' },
						{ key: 'phone', label: '电话', class: 'data-phone' },
						{ key: 'signing', label: '签到', class: 'data-signing' },
						{ key: 'remove', label: '删除', class: 'data-remove' }
					]"
					@filtered="updateTotalRows"
				>
					<template slot="id" slot-scope="data">
						{{data.item.accountId||'N/A'}}
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

					<template slot="signing" slot-scope="data">
						<b-btn
							@click="showModal(data.item.accountId, data.item.sign)"
							:variant="data.item.sign ? 'success' : 'secondary'"
							size="sm">
							<i class="fa" :class="{'fa-check': data.item.sign, 'fa-times': !data.item.sign}"></i>
							</b-btn>
					</template>

					<template slot="remove" slot-scope="data">
						<b-btn variant="danger"
							size="sm"
							@click="removeAttendance(data.item.accountId)">删除</b-btn>
					</template>
				</b-table>
				<!-- <b-row>
					<b-col cols="auto">
						<b-pagination
							size="sm"
							:limit="7"
							align="right"
							v-model="currentPage"
							:total-rows="totalRows"
							:per-page="computedPerPage" />
					</b-col>
				</b-row> -->
			</b-card>
		</b-col>
		<b-modal ref="modal2" centered title="签到二维码"  ok-title="签到" cancel-title="取消" @ok="updateSign()">
			<p class="my-4 text-center">
				是否确定为该用户进行签到，签到过后状态不能修改！
			</p>
		</b-modal>
	</b-row>
</div>
</template>

<script>
import dateFormat from "dateformat";

import axios from 'axios';
import Datetime from './Datetime.vue';
import validate from './validate';
import QrcodeVue from 'qrcode.vue';

const URLPATH = 'http://ufwd.lemonce.com';

function FilterFactory() {
	return {
		keyword: '',
		signIn: null
	};
}

export default {
	name: 'activity-detail',
	components: {
		Datetime,
		QrcodeVue
	},
	mixins: [validate],
	data() {
		return {
			form: {
				published: null
			},
			isUnpublished: null,
			accountList: [],
			groupList: [],
			participant: [],
			filter: {
				keyword: ''
			},
			filterSettings: FilterFactory(),
			attendance: {
				accountName: null,
				accountId: null,
				group: null
			},
			attendanceList: [],
			currentPage: 1,
			totalRows: 0,
			computedPerPage: 10,
			code: {
				value: `${URLPATH}/api/ufwd/app/attendance`,
				size: '150'
			},
			retrive: {
				accountId: 0,
				sign: false
			},
			notification: {
				accountList: null
			}
		}
	},
	computed: {
		activityId() {
			return this.$route.params.id - 0;
		},
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
		}
	},
	methods: {
		resetFilter() {
			this.filterSettings = FilterFactory();
		},
		updateTotalRows(filteredItems) {
			this.totalRows = filteredItems.length;
		},
		filterTable(item) {
			const {keyword, signIn} = this.filterSettings;

			const reg = new RegExp(keyword);

			if (!reg.test(item.name) && !reg.test(item.identification) && !reg.test(item.phone)) {
				return false;
			}

			if (signIn !== null) {
				if ((item.sign && !signIn)  || (!item.sign && signIn)) {
					return false;
				}
			}

			return true;
		},
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
		getActivity() {
			return axios.get(`/api/ufwd/service/activity/${this.activityId}`)
				.then(res => {

					if (!res.data.data.published) {
						this.isUnpublished = true;
					}
					this.form = res.data.data;
				})
		},
		updateActivity() {
			return axios.put(`/api/ufwd/service/activity/${this.activityId}`, {
				title: this.form.title,
				location: this.form.location,
				start: this.form.start,
				end: this.form.end,
				abstract: this.form.abstract,
				description: this.form.description,
				published: this.form.published
			}).then(() => {
				this.getActivity();
			})
		},
		getAttendenceList() {
			return axios.get(`/api/ufwd/service/activity/${this.activityId}/attendance`).then(res => {
				this.attendanceList = res.data.data;

				this.attendanceList.forEach(attendance => {

					if (!attendance.sign) {
						attendance.sign = false;
					} else {
						attendance.sign = dateFormat(attendance.sign, 'yyyy-mm-dd HH:MM:ss')
					}
				});

				this.getNotificationReciver(this.attendanceList);

				this.totalRows = this.attendanceList.length;
			});
		},
		getNotificationReciver(attendanceList) {
			this.notification.accountList = [];

			attendanceList.forEach(attendance => {
				const item = {};

				item.id = attendance.accountId;

				item.ufwd = {};

				item.ufwd.phone = attendance.phone;
				item.ufwd.name = attendance.name;

				this.notification.accountList.push(item);
			});
		},
		sendMessage() {
			const accountList = encodeURIComponent(JSON.stringify(this.notification.accountList));

			return this.$router.push(`/ufwd/system/notification?accountList=${accountList}`);
		},
		appendAccount() {
			if (!this.attendance.accountId) {
				return;
			}

			return axios.post('/api/ufwd/service/attendance', {
				accountId: this.attendance.accountId,
				activityId: this.activityId
			}).then(() => {
				this.filter.keyword = '',

				this.attendance.accountId = null;
				this.attendance.accountName = null;

				this.getAttendenceList();
			});
		},
		appendGroup() {
			if (!this.attendance.group) {
				return;
			}

			return axios.post('/api/ufwd/service/attendance', {
				groupId: this.attendance.group.id,
				activityId: this.activityId
			}).then(() => {
				this.attendance.group = null;

				this.getAttendenceList();
			});
		},
		removeAttendance(id) {
			this.notification.accountList.forEach((attendance, index, arr) => {
				if (attendance.id === id) {
					arr.splice(index, 1);
				}
			});

			return axios.delete(`/api/ufwd/service/activity/${this.activityId}/account/${id}`).then(() => {
				this.getAttendenceList();
			});
		},
		selectAccount(account) {
			this.filter.keyword = account.ufwd.name;
			
			this.attendance.accountId = account.id;
			this.attendance.accountName = account.ufwd.name;
		},
		updateSign() {
			if (this.retrive.sign) {
				return;
			}

			return axios.put(`/api/ufwd/service/activity/${this.activityId}/account/${this.retrive.accountId}/attendance`).then(() => {
				this.getAttendenceList();
			});
		},
		showModal(id, sign) {
			this.retrive.accountId = id;
			this.retrive.sign = sign;

			this.$refs.modal2.show();
		}
	},
	mounted() {
		this.getGroupList();
		this.getAccountList();
		this.getActivity();
		this.getAttendenceList();
	}
}
</script>

<style>
#attendance-account-search-box {
	position: absolute;
	z-index: 100;
}
</style>

