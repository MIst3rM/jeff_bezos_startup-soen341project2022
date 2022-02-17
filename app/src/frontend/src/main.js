import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import Router from "vue-router";
import createPersistedState from "vuex-persistedstate";

import { Home, Admin, Shop, Profile } from "./views";
import { Login } from "./components";

import {
  MdToolbar,
  MdButton,
  MdIcon,
  MdCard,
  MdField,
  MdList,
  MdApp,
  MdContent,
  MdDrawer,
} from "vue-material/dist/components";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./assets/styles/theme.scss";

Vue.config.productionTip = false;

const host = window.location.host;
const subdomain = host.split(".")[0];

const routes = () => {
  let routes;
  if (subdomain === "store") {
    routes = [
      { path: "/", component: Home },
      {
        path: "/login",
        component: Login,
        beforeEnter: (to, from, next) => {
          if (window.sessionStorage.getItem("store")) {
            next({ path: "/profile" });
          }else{
            next();
          }
        },
      },
      { path: "/shop", component: Shop },
      { path: "/profile", component: Profile },
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
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdList);
Vue.use(MdApp);
Vue.use(MdContent);
Vue.use(MdDrawer);

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
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    },
    getAuthUser(state) {
      return state.user;
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
