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

// initial state
const state = {
  added: [],
  all: [
  ]
}

// getters
const getters = {
  allProducts: state => state.all, // would need action/mutation if data fetched async
  getNumberOfProducts: state => (state.all) ? state.all.length : 0,
  cartProducts: state => {
    return state.added.map(({ id, quantity }) => {
      const product = state.all.find(p => p.id === id)

      return {
        name: product.name,
        price: product.price,
        quantity
      }
    })
  }
}

// actions
const actions = {
  addToCart({ commit }, product){
    commit(types.ADD_TO_CART, {
      id: product.id
    })
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




