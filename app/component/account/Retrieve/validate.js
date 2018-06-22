import axios from 'axios';
import {
	required, maxLength, minLength
} from 'vuelidate/dist/validators.min.js';

const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
const chineseIdReg =
	/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export default {
	computed: {
		accountPasswordInvalid() {
			const {
				minLength, maxLength
			} = this.$v.form.password;

			if (!minLength || !maxLength) {
				return '请输入6-32位长的用户名';
			}
		},
		ufwdNameInvalid() {
			const { required } = this.$v.form.account.ufwd.name;

			if (!required) {
				return '必须填写姓名';
			}
		},
		ufwdSexInvalid() {
			const { required } = this.$v.form.account.ufwd.sex;

			if (!required) {
				return '选择性别';
			}
		},
		ufwdIdentificationInvalid() {
			const {
				required, chineseId, isUnique, $pending
			} = this.$v.form.account.ufwd.identification;

			if ($pending) {
				return '正在分析';
			}

			if (!required) {
				return '必须填写身份证号';
			}

			if (!chineseId) {
				return '非法的身份证号';
			}

			if (!isUnique) {
				return '该身份证号已存在';
			}

			if (!this.network) {
				return '网络连接失败';
			}
		},
		ufwdPhoneInvalid() {
			const {
				required, pattern, isUnique, $pending
			} = this.$v.form.account.ufwd.phone;

			if ($pending) {
				return '正在分析';
			}

			if (!required) {
				return '必须填写手机号';
			}

			if (!pattern) {
				return '非法的手机号';
			}

			if (!isUnique) {
				return '该手机号已被注册';
			}

			if (!this.network) {
				return '网络连接失败';
			}
		},
		ufwdJobInvalid() {
			const { required } = this.$v.form.account.ufwd.job;

			if (!required) {
				return '必须填写职务';
			}
		},
		ufwdUnitInvalid() {
			const { required } = this.$v.form.account.ufwd.unit;

			if (!required) {
				return '必须填写单位';
			}
		},
		ufwdPartyInvalid() {
			const { required } = this.$v.form.account.ufwd.party;

			if (!required) {
				return '必选项';
			}
		},
		ufwdStreetInvalid() {
			const { required } = this.$v.form.account.ufwd.street;

			if (!required) {
				return '必选项';
			}
		}
	},
	validations: {
		origin: {},
		form: {
			password: {
				minLength: minLength(6),
				maxLength: maxLength(32),
			},
			account: {
				ufwd: {
					name: {
						required
					},
					sex: {
						required
					},
					identification: {
						required,
						chineseId(value) {
							return chineseIdReg.test(value);
						},
						isUnique(value, vm) {
							if (value === '') {
								return true;
							}

							if (!this.originForm) {
								return true;
							}
							
							if (value === this.originForm.account.ufwd.identification) {
								return true;
							}

							if (value.length < 18) {
								return false;
							}

							return axios.get('/api/ufwd/service/validate/account', {
								params: {
									identification: value
								}
							}).then(res => !res.data.data.existed, () => this.network = false);
						}
					},
					phone: {
						required,
						pattern(value) {
							return phoneReg.test(value);
						},
						isUnique(value) {
							if (value === '') {
								return true;
							}

							if (!this.originForm) {
								return true;
							}
							
							if (value === this.originForm.account.ufwd.phone) {
								return true;
							}

							if (value.length < 11) {
								return false;
							}

							return axios.get('/api/ufwd/service/validate/account', {
								params: {
									phone: value
								}
							}).then(res => !res.data.data.existed, () => this.network = false);
						}
					},
					job: {
						required
					},
					unit: {
						required
					},
					street: {
						required
					},
					party: {
						required
					}
				}
			}
		}
	}
};