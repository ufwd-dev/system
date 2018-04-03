'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import account from './module/account';

const store = new Vuex.Store({
	modules: { account }
});

export default store;