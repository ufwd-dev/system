<template>
	<b-modal
		@shown="initForm"
		ref="modal"
		size="lg"
		title="新建活动"
		no-close-on-backdrop
		centered>
		<b-form>
			<b-row>
				<b-col cols="4">
					<b-form-group
						:invalid-feedback="validateTitle"
						:state="!$v.form.title.$invalid"
						class="form-group-required"
						label="名称">
						<b-form-input
							:state="!$v.form.title.$invalid"
							v-model="form.title"
							autocomplete="off"
							size="sm"/>
					</b-form-group>
				</b-col>
				<b-col>
					<datetime label="开始时间" v-model="form.start" />
				</b-col>
				<b-col>
					<datetime label="结束时间" v-model="form.end" />
				</b-col>
			</b-row>

			<b-row>
				<b-col>
					<b-form-group
						class="form-group-required"
						label="地点"
						:invalid-feedback="validateLocation"
						:state="!$v.form.location.$invalid">
						<b-form-input
							v-model="form.location"
							autocomplete="off"
							:state="!$v.form.location.$invalid"
							size="sm"/>
					</b-form-group>
				</b-col>
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
			</b-row>

			<b-form-group
				class="form-group-required"
				:invalid-feedback="validateAbstract"
				:state="!$v.form.abstract.$invalid"
				description="少于200字，将显示在APP的活动列表中"
				label="摘要">
				<b-form-textarea
					rows="3"
					no-resize
					:state="!$v.form.abstract.$invalid"
					v-model="form.abstract"
					autocomplete="off"
					size="sm"/>
			</b-form-group>

			<b-form-group
				class="form-group-required"
				:invalid-feedback="validateDescription"
				:state="!$v.form.description.$invalid"
				label="描述">
				<b-form-textarea
					rows="8"
					no-resize
					v-model="form.description"
					:state="!$v.form.description.$invalid"
					autocomplete="off"
					size="sm"/>
			</b-form-group>
		</b-form>

		<div slot="modal-footer">
			<b-btn variant="danger"
				@click="initForm()">清空</b-btn>
			<b-btn
				:disabled="!form.valid"
				@click="create()"
				variant="success"><i
					class="fa fa-fw mr-1"
					:class="{
						'fa-spin': request,
						'fa-refresh': request,
						'fa-plus': !request 
					}" />创建</b-btn>
		</div>
	</b-modal>
</template>

<script>
import axios from 'axios';
import Datetime from './Datetime.vue';
import validate from './validate';
import _ from 'lodash';

function FormFactory() {
	return {
		published: false,
		abstract: '',
		description: '',
		start: null,
		end: null,
		location: '',
		title: ''
	};
}

export default {
	data() {
		return {
			request: false,
			form: FormFactory()
		};
	},
	components: {
		Datetime
	},
	mixins: [validate],
	methods: {
		open() {
			this.$refs.modal.show();
		},
		initForm() {
			this.form = FormFactory();
		},
		create() {
			this.request = true;
			const activity = _.pick(this.form, ['title', 'abstract', 'description', 'start', 'end', 'location', 'published']);

			return axios.post(`/api/ufwd/service/activity`, activity).then(() => {
				this.$refs.modal.hide();

				this.$emit('create-success');
			}).catch(err => {
				this.request = false;
			});
		}
	},
	watch: {
		form: {
			handler() {
				this.form.valid = !this.$v.$invalid;
			},
			deep: true
		},
		'$v.$invalid'() {
			this.form.valid = !this.$v.$invalid;
		}
	}
}
</script>
