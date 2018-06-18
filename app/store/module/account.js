'use strict';
import axios from 'axios';

// getPartyPool() {
// 	return axios.get(`/api/ufwd/service/party`).then(res => {
// 		const pool = res.data.data;

// 		pool.forEach(element => {
// 			const party = {};

// 			party.text = element.name;
// 			party.value = element.name;

// 			this.partyPool.push(party);
// 		});
// 	});
// },
// getStreetPool() {
// 	return axios.get(`/api/ufwd/service/street`).then(res => {
// 		const pool = res.data.data;

// 		pool.forEach(element => {
// 			const group = {};

// 			group.text = element.name;
// 			group.value = element.name;

// 			this.streetPool.push(group);
// 		});
// 	});
// },
// updateAccount({ id, examine }) {
// 	return axios.put(`/api/ufwd/service/account/${id}`, {
// 		ufwd: { examine: !examine }
// 	});
// }

// getGroupPool() {
// 	return axios.get(`/api/ufwd/service/group`)
// 		.then(res => {
// 			this.group.groupPool = res.data.data;
// 		});
// },
// getPartyPool() {
// 	return axios.get(`/api/ufwd/service/party`)
// 		.then(res => {
// 			this.partyPool = res.data.data;
// 		});
// },
// getStreetPool() {
// 	return axios.get(`/api/ufwd/service/street`)
// 		.then(res => {
// 			this.streetPool = res.data.data;
// 		});
// },
// getIdentityPool() {
// 	return axios.get(`/api/ufwd/service/identity`)
// 		.then(res => {
// 			this.identity.identityPool = res.data.data;
// 		});
// },

export default {
	namespaced: true,
	state: {
		signedIn: false,
		id: null,
		available: {
			group: [],
			street: [],
			party: [],
			identity: []
		}
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
		},
		initAvailable({ commit }) {
			
		}
	},
	mutations: {
		updateAccount(state, accountId = null) {
			state.id = accountId;
			state.signedIn = Boolean(accountId);
		},
		updateAvailable(state, available) {
			Object.assign(state.available, available);
		}
	}
};