<template>
	<b-modal ref="modal"
		size="lg"
		:title="$t('ufwd.group.addGroup')+': '+form.group.name+' [#'+id+']'"
		no-close-on-backdrop
		centered>

		<h5><i class="fa fa-plus fa-fw mr-2" />基本属性</h5><hr>

		<b-form>
			<b-row>
				<b-col cols="6">
					<b-form-group
						class="form-group-required"
						label="分组名称">
						<b-form-input
							autocomplete="off"
							size="sm"
							v-model.trim.lazy="form.group.name" />
					</b-form-group>
				</b-col>
			</b-row>

			<b-form-group
				class="form-group-required"
				label="分组描述">
				<b-form-textarea
					rows="3"
					no-resize
					autocomplete="off"
					size="sm"
					v-model.trim="form.group.description" />
			</b-form-group>
		</b-form>

		<div slot="modal-footer">
			<b-btn
				@click="updateGroup()"
				variant="success"><i
					class="fa fa-fw mr-1"
					:class="{
						'fa-spin': request,
						'fa-refresh': request,
						'fa-plus': !request
					}" />保存修改</b-btn>
		</div>
	</b-modal>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

function GroupFactory() {
	return {
		name: '',
		description: ''
	};
}

export default {
	data() {
		return {
			id: null,
      request: false,
      origin: null,
			form: {
				group: GroupFactory()
			}
		};
	},
	methods: {
		updateGroup() {
			axios.put(`/api/ufwd/service/group/${this.id}`, this.form.group).then(() => {
				this.$emit('group-update-success');
				this.reset();
				this.$refs.modal.hide();
			});
		},
		getGroup(id) {
			axios.get(`/api/ufwd/service/group/${id}`).then(res => {
        this.originGroup = _.cloneDeep(this.form.group = res.data.data);
        delete this.form.group.id;
        delete this.form.group.created_at;
        delete this.form.group.updated_at;
        delete this.form.group.deleted_at;
			}).then(() => this.id = id);
		},
		reset() {
			this.form.group = GroupFactory();
		},
		open(groupId) {

			this.getGroup(groupId);

			this.$refs.modal.show();
		}
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