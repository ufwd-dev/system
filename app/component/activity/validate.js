import {
	required, maxLength, minLength
} from 'vuelidate/dist/validators.min.js';

export default {
	computed: {
		validateTitle() {
			const {required, minLength} = this.$v.form.title;

			if (!required) {
				return '标题必填！';
			}

			if (!minLength) {
				return '最少4个字符';
			}
		},
		// validateStart() {
		// 	const {required} = this.$v.form.start;

		// 	if (!required) {
		// 		return '起始时间必填！';
		// 	}

		// 	if (new Date(this.$v.form.start) < new Date()) {
		// 		return '起始时间必须大于当前时间！';
		// 	}
		// },
		// validateEnd() {
		// 	const {required} = this.$v.form.end;

		// 	if (!required) {
		// 		return '结束时间必填！';
		// 	}

		// 	if (new Date(this.$v.form.start) < new Date(this.$v.form.end)) {
		// 		return '结束时间必须大于开始时间时间！';
		// 	}
		// },
		validateLocation() {
			const {required, minLength} = this.$v.form.location;

			if (!required) {
				return '地点必填！';
			}

			if (!minLength) {
				return '最少4个字符';
			}
		},
		validateAbstract() {
			const {required, maxLength} = this.$v.form.abstract;

			if (!required) {
				return '摘要必填！';
			}

			if (!maxLength) {
				return '字数控制在200以内';
			}
		},
		validateDescription() {
			const {required} = this.$v.form.description;

			if (!required) {
				return '描述必填！';
			}
		}
	},
	validations: {
		form: {
			title: {
				required,
				minLength: minLength(4)
			},
			abstract: {
				required,
				maxLength: maxLength(200)
			},
			description: {
				required
			},
			start: {
				required
			},
			end: {
				required
			},
			location: {
				required,
				minLength: minLength(4)
			},
			published: {
				required
			}
		}
	}
};