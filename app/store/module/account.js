'use strict';
import axios from 'axios';

export default {
	namespaced: true,
	state: {
		signedIn: false,
		id: null
	},
	actions: {
		signIn({ commit }, { name, password }) {
			return axios.post('/api/ufwd/service/session/account', {
				name, password
			}).then(({data}) => {
				commit('updateAccount', data.data.accountId);
			});
		},
		signOut({ commit }) {
			return axios.delete('/api/account/session').then(() => {
				commit('updateAccount');
			});
		}
	},
	mutations: {
		updateAccount(state, accountId = null) {
			state.id = accountId;
			state.signedIn = Boolean(accountId);
		}
	}
};