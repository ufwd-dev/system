<template>
	<b-modal ref="modal"
		size="lg"
		:title="$t('ufwd.group.addGroup')"
		no-close-on-backdrop
		centered>

		<h5><i class="fa fa-plus fa-fw mr-2" />基本属性</h5><hr>

		<b-form>
			<b-row>
				<b-col cols="6">
					<b-form-group
						class="form-group-required"
						label="名称">
						<b-form-input
							autocomplete="off"
							size="sm"
							v-model.trim.lazy="form.group.name" />
					</b-form-group>
				</b-col>
			</b-row>

			<b-form-group
				class="form-group-required"
				label="描述">
				<b-form-textarea
					rows="3"
					no-resize
					autocomplete="off"
					size="sm"
					v-model.trim="form.group.description" />
			</b-form-group>
		</b-form>

		<div slot="modal-footer">
			<b-btn variant="danger"
				@click="reset()">清空</b-btn>
			<b-btn
				@click="createGroup()"
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

function GroupFactory() {
	return {
		name: '',
		description: ''
	};
}

export default {
	data() {
		return {
			request: false,
			form: {
				group: GroupFactory()
			}
		};
	},
	methods: {
		createGroup() {
			axios.post('/api/ufwd/service/group', this.form.group).then(() => {
				this.$emit('group-create-success');
				this.reset();
				this.$refs.modal.hide();
			});
		},
		open() {
			this.$refs.modal.show();
		},
		reset() {
			this.form.group = GroupFactory();
		}
	},
	mounted() {
		this.reset();
	}
}
</script>

<style lang="less">
.form-group-required {
	> label, legend {
		&::before {
			content: "*";
			color: red;
			margin-right: .25em
		}
	}
}
</style>