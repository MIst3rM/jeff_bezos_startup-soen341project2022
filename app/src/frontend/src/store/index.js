import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import * as types from './mutation-types';

Vue.use(Vuex);

// mutations
const mutations = {

  [types.ADD_TO_CART] (state, { id }) {
      const record = state.added.find(p => p.id === id)

      if (!record) {
        state.added.push({
          id,
          quantity: 1
        })
      } else {
        record.quantity++
      }
    }
}

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      key: "store",
      storage: window.sessionStorage,
    }),
  ],
  state,
  getters,
  actions,
  mutations
});
