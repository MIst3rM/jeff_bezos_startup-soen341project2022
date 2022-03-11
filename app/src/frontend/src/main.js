import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import Router from "vue-router";
import createPersistedState from "vuex-persistedstate";
import VueHorizontal from "vue-horizontal";
import VueSnip from "vue-snip";
import VueMaterial from "vue-material";
import VueSlider from "vue-slider-component";

import "bootstrap/dist/css/bootstrap.min.css";
import "vue-slider-component/theme/material.css";
import "vue-material/dist/theme/default.css";
import "vue-material/dist/vue-material.min.css";

import Popper from "@popperjs/core/dist/esm/popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home, Admin, Shop, Profile } from "./views";
import { Login, Registration } from "./components";

Vue.config.productionTip = false;

const host = window.location.host;
const subdomain = host.split(".")[0];

// console.log("host is: " + host);
// console.log("subdomain is: " + subdomain);

const routes = () => {
  let routes;
  if (subdomain === "store") { // frontend
    routes = [
      { path: "/", component: Home, meta: { header: true } },
      {
        path: "/login",
        component: Login,
        beforeEnter: (to, from, next) => {
          if (window.sessionStorage.getItem("store")) {
            next({ path: "/profile" });
          } else {
            next();
          }
        },
        meta: {
          header: true,
        },
      },
      { path: "/shop", component: Shop, meta: { header: true } },
      {
        path: "/profile",
        component: Profile,
        beforeEnter: (to, from, next) => {
          console.log(!window.sessionStorage.getItem("store").includes("null"));
          if (true) {
            next();
          } else {
            next({ path: "/login" });
          }
        },
        meta: {
          header: false,
        },
      },
      { path: "/register", component: Registration, meta: { header: true } },
      { path: "/about", meta: { header: true } },
      { path: "/faq", meta: { header: true } },
      { path: "/cart", meta: { header: true } },
    ];
  } else if (subdomain === "admin") {
    routes = [{ path: "/", component: Admin }];
  } else {
    routes = [];
  }
  return routes;
};

const router = new Router({
  mode: "history",
  routes: routes(),
});

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueMaterial);
Vue.use(VueHorizontal);
Vue.use(VueSnip);
Vue.component("VueSlider", VueSlider);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "store",
      paths: ["user"],
      storage: window.sessionStorage,
      getState: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
      },
      setState: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
    }),
  ],
  state: {
    user: null,
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    clearAuthUser(state) {
      state.user = null;
    },
  },
  getters: {
    isLoggedIn(state) {
      if (state.user !== null) {
        return true;
      } else {
        return false;
      }
    },
    getAuthUser(state) {
      return state.user;
    },
  },
  actions: {},
});

Vue.use(VueSnip);

new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
