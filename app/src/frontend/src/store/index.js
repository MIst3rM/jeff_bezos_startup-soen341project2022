import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    cart,
  },
  plugins: [
    createPersistedState({
      key: "store",
      storage: window.sessionStorage,
    }),
  ],
});
