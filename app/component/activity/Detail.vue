<template>

<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '活动', href: '#/ufwd/activity/list'},
		{ text: activity.title || 'N/A', active: true },
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
								label="名称">
								<b-form-input
									autocomplete="off"
									size="sm"/>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group
								class="form-group-required"
								label="地点">
								<b-form-input
									autocomplete="off"
									size="sm"/>
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
									:options="[
										{ text: '是', value: true },
										{ text: '否', value: false },
									]" />
							</b-form-group>
						</b-col>
						<b-col>
							<datetime label="开始时间" />
						</b-col>
						<b-col>
							<datetime label="结束时间" />
						</b-col>
					</b-row>

					<b-form-group
						class="form-group-required"
						description="少于200字，将显示在APP的活动列表中"
						label="摘要">
						<b-form-textarea
							rows="3"
							no-resize
							autocomplete="off"
							size="sm"/>
					</b-form-group>
					<b-form-group
						class="form-group-required"
						label="描述">
						<b-form-textarea
							rows="8"
							no-resize
							autocomplete="off"
							size="sm"/>
					</b-form-group>
				</b-form>

				<b-row>
					<b-col md="auto">
						<b-btn variant="success"
							size="sm"
							@click="resetFilter()">保存修改</b-btn>
					</b-col>
					<b-col></b-col>
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
							<b-form-input
								autocomplete="off"
								size="sm"/>
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							class="form-group-required"
							label="按组添加">
							<b-form-input
								autocomplete="off"
								size="sm"/>
						</b-form-group>
					</b-col>
					<b-col md="auto">
						<b-form-group
							class="form-group-required"
							label="活动通知">
							<b-btn variant="primary"
								size="sm"
								@click="resetFilter()">编辑并发送</b-btn>
						</b-form-group>
					</b-col>
				</b-row>

				<b-table
					hover bordered small
					caption-top
					caption="参与者名单"
					:items="[]"
					:fields="[
						{ key: 'id', label: '#', class: 'data-id' },
						{ key: 'name', label: '姓名', class: 'data-name' },
						{ key: 'identification', label: '身份证', class: 'data-idcard' },
						{ key: 'phone', label: '电话', class: 'data-phone' },
						{ key: 'signing', label: '签到', class: 'data-signing' },
					]"
				></b-table>
			</b-card>
		</b-col>
	</b-row>
</div>
</template>

<script>
import axios from 'axios';
import Datetime from './Datetime.vue';

export default {
	name: 'activity-detail',
	computed: {
		activityId() {
			return this.$route.params.id;
		},
	},
	components: {
		Datetime
	},
	data() {
		return {
			activity: {
				published: null
			},
			isUnpublished: null
		}
	},
	methods: {
		getActivity() {
			return axios.get(`/api/ufwd/service/activity/${this.activityId}`)
				.then(res => {
					// console.log(res.data.data)


					if (!res.data.data.published) {
						this.isUnpublished = true;
					}
					this.activity = res.data.data;
				})
		},
		updateActivity() {
			return axios.put(`/api/ufwd/service/activity/${this.activityId}`, {
				title: this.activity.title,
				location: this.activity.location,
				start: this.activity.start,
				end: this.activity.end,
				abstract: this.activity.abstract,
				description: this.activity.description,
				published: this.activity.published
			}).then(() => {
					this.$notify({
						title: 'success',
						message: '',
						type: 'success'
					})
				})
		}
	},
	mounted() {
		this.getActivity();
	}
}
</script>
