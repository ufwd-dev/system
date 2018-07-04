<template>
	<b-form-group
		class="form-group-required"
		:label="label">
		<b-input-group size="sm">
			<b-form-input
				size="sm"
				v-model="date"
				type="date"></b-form-input>
			<b-input-group-append>
				<b-form-input size="sm"
					v-model="time"
					type="time"></b-form-input>
			</b-input-group-append>
		</b-input-group>
	</b-form-group>
</template>

<script>
import dateFormat from 'dateformat'

export default {
	props: ['label', 'value'],
	data() {
		return {
			date: '',
			time: ''
		}
	},
	watch: {
		date() {
			this.update();
		},
		time() {
			this.update();
		},
		value(date) {
			this.setTime();
			this.setDate();

			if (!(date instanceof Date)) {
				this.update();
			}
		}
	},
	methods: {
		setDate() {
			this.date = dateFormat(this.value, 'yyyy-mm-dd');
		},
		setTime() {
			this.time = dateFormat(this.value, 'HH:MM');
		},
		update() {
			this.$emit('input', new Date(this.date + ' ' + this.time));
		}
	},
	mounted() {
		this.setDate();
		this.setTime();
		this.update();
	}
}
</script>
