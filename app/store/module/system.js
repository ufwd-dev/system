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
		restrict: {
			
		}
	},
	getters: {
		isRestricted(state) {
			return !Object.keys(state.restrict).length;
		},
		isFieldRestricted(state) {
			return name => state.restrict.hasOwnProperty(name);
		},
		availableGroup(state) {
			return state.available.group;
		},
		availableStreet(state) {
			const all = state.available.street;
			const restrict = state.restrict.street;

			if (!restrict) {
				return all;
			}

			return all.filter(street => {
				return restrict.find(id => street.id === id);
			});
		},
		availableParty(state) {
			const all = state.available.party;
			const restrict = state.restrict.party;

			if (!restrict) {
				return all;
			}

			return all.filter(party => {
				return restrict.find(id => party.id === id);
			});
		},
		availableIdentity(state) {
			const all = state.available.identity;
			const restrict = state.restrict.identity;

			if (!restrict) {
				return all;
			}

			return all.filter(identity => {
				return restrict.find(id => identity.id === id);
			});
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
				};
			}).then(available => {
				commit('updateAvailable', available);
			});
		}
	},
	mutations: {
		updateAvailable(state, available) {
			Object.assign(state.available, available);
		},
		setRestrict(state, restrict = {}) {
			state.restrict = restrict;
		}
	}
};