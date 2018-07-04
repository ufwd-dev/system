<template>
<div>
	<b-breadcrumb :items="[
		{ text: $t('ufwd.home'), href: '#/'},
		{ text: '活动', active: true },
	]"/>

	<h3>所有活动</h3><hr>
	
	<b-card title="查询选项">
		<b-row>
			<b-col cols="auto">
				<b-form-group
					label="关键字过滤"
					style="width: 12em">
					<b-form-input
						size="sm"
						v-model="filterSettings.keyword"
						placeholder="名称 / 摘要" />
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="已发布?">
					<b-form-radio-group
						size="sm"
						button-variant="outline-primary"
						buttons
						v-model="filterSettings.published"
						:options="[
							{ text: '全部', value: null },
							{ text: '是', value: true },
							{ text: '否', value: false },
						]" />
				</b-form-group>
			</b-col>
			<b-col md="auto">
				<b-form-group label="过期?">
					<b-form-radio-group
						size="sm"
						v-model="filterSettings.expired"
						button-variant="outline-primary"
						buttons
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

	<hr><b-row>
		<b-col>
			<b-btn @click="openCreate()"
				size="sm"
				variant="primary"><i class="fa fa-plus mr-2" />创建</b-btn>
		</b-col>
		<b-col cols="auto">
			<b-pagination
				size="sm"
				:limit="7"
				align="right"
				v-model="currentPage"
				:total-rows="10"
				:per-page="10" />
		</b-col>
	</b-row>

	<b-table
		hover bordered small
		:items="activityList"
		:filter="filter"
		:fields="[
			{ key: 'expired', label: '过期?', class: 'data-expired' },
			{ key: 'published', label: '发布?', class: 'data-published' },
			{ key: 'title', label: '名称', class: 'data-name' },
			{ key: 'abstract', label: '摘要' },
			{ key: 'location', label: '地点' },
			{ key: 'created_at', label: '创建时间', class: 'data-created' },
		]">

		<template slot="title" slot-scope="data">
			<a :href="`#/ufwd/activity/${data.item.id}`">{{data.item.title}}</a>
		</template>
		
		<template slot="expired" slot-scope="data">
			<div class="text-center">
				<i class="fa"
					:class="{
						'fa-stop': isExpired(data.item.end)
					}"></i>
			</div>
		</template>
		
		<template slot="published" slot-scope="data">
			<b-form-radio-group
				size="sm"
				button-variant="outline-primary"
				buttons
				v-model="data.item.published"
				:options="[
					{ text: '是', value: true },
					{ text: '否', value: false },
				]" />
		</template>
		
		<template slot="created_at" slot-scope="data">
			{{data.item.created_at|isoDateTime}}
		</template>

	</b-table>

	<create ref="createDialog" />
</div>

</template>

<script>
import axios from 'axios';
import Create from './Create.vue';
import dateFormat from "dateformat";

function FilterFactory() {
	return {
		keyword: '',
		published: null,
		expired: null
	};
}

export default {
	data() {
		return {
			currentPage: 1,
			activityList: [],
			filterSettings: FilterFactory()
		}
	},
	filters: {
		isoDateTime(date) {
			return dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
		}
	},
	components: {
		Create
	},
	computed: {
	},
	methods: {
		resetFilter() {
			this.filterSettings = FilterFactory();
		},
		isExpired(end) {
			return new Date(end) < new Date();
		},
		getActivityById(id) {
			return this.$router.push(`/ufwd/activity/list/${id}/detail`);
		},
		getActivityList() {
			return axios.get(`/api/ufwd/service/activity`).then(res => {
				this.activityList = res.data.data;
			});
		},
		openCreate() {
			this.$refs.createDialog.open();
		},
		filter(item) {
			const { keyword, abstract, published, expired } = this.filterSettings;

			const reg = new RegExp(keyword);

			if (!reg.test(item.title) && !reg.test(item.abstract)) {
				return false;
			}

			if (published !== null) {
				if (item.published !== published) {
					return false;
				}
			}

			if (expired !== null) {
				if (this.isExpired(item.end) !== expired) {
					return false;
				}
			}

			return true;
		}
	},
	mounted() {
		this.getActivityList();
	}
}
</script>

<style lang="less">
.data-name {
	width: 12em;
}
.data-expired {
	width: 4em;
}
.data-published {
	width: 5em;
}
.data-created {
	width: 12em;
}
</style>
