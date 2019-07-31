import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import mutations from './mutations';
import actions from './actions';
import { HAS_ERROR } from '../constants/functionNames';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: [],
    users: [],
    reconnect: false,
    activeRoom: null,
    rooms: [],
    messages: [],
    isUserTyping: false,
  },
  actions,
  mutations,
  getters: {
    [HAS_ERROR]: state => state.error ? true : false
  },
  plugins: [vuexLocal.plugin],
  strict: debug
});

