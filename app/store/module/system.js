'use strict';
import axios from 'axios';

export default {
	namespaced: true,
	state: {
		available: {
			group: [],
			street: [],
			party: [],
			identity: []
		},
	},
	getters: {
		availableGroup(state) {
			return state.available.group;
		},
		availableStreet(state) {
			return state.available.street;
		},
		availableParty(state) {
			return state.available.party;
		},
		availableIdentity(state) {
			return state.available.identity;
		}
	},
	actions: {
		initAvailable({ commit }) {
			Promise.all([
				axios.get('/api/ufwd/service/group'),
				axios.get('/api/ufwd/service/party'),
				axios.get('/api/ufwd/service/street'),
				axios.get('/api/ufwd/service/identity')
			]).then(([group, party, street, identity]) => {
				return {
					group: group.data.data,
					party: party.data.data,
					street: street.data.data,
					identity: identity.data.data
				}
			}).then(available => {
				commit('updateAvailable', available);
			});
		}
	},
	mutations: {
		updateAvailable(state, available) {
			Object.assign(state.available, available);
		}
	}
};