import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import VueHorizontal from "vue-horizontal";
import VueSnip from "vue-snip";
import VueMaterial from "vue-material";
import VueSlider from "vue-slider-component";
import axios from "axios";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "vue-slider-component/theme/material.css";
import "vue-material/dist/theme/default.css";
import "vue-material/dist/vue-material.min.css";

import Popper from "@popperjs/core/dist/esm/popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Login, Registration } from "./components";
import { Home, Admin, Shop, Profile, AdminLogin, AdminRegister, Cart } from "./views";

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://backend.store.conco/";

const host = window.location.host;
const subdomain = host.split(".")[0];

const routes = () => {
  let routes;
  if (subdomain === "store") {
    routes = [
      {
        path: "/",
        component: Home,
        meta: { header: true },
      },
      {
        path: "/login",
        component: Login,
        name: "login",
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.getters.isAuthenticated) {
            next({ path: "/profile" });
          } else {
            next();
          }
        },
        meta: {
          header: true,
        },
      },
      {
        path: "/shop",
        component: Shop,
        name: "shop",
        meta: { header: true },
      },
      {
        path: "/profile",
        component: Profile,
        name: "profile",
        meta: {
          header: false,
          requiresAuth: true,
        },
      },
      {
        path: "/register",
        component: Registration,
        meta: { header: true },
      },
      { path: "/about", meta: { header: true } },
      { path: "/faq", meta: { header: true } },
      {
        path: "/cart",
        component: Cart,
        meta: { header: true, requiresAuth: false },
      },
    ];
  } else if (subdomain === "admin") {
    routes = [
      {
        path: "/",
        component: AdminLogin,
        meta: { header: false },
        beforeEnter: (to, from, next) => {
          if (store.getters.isAuthenticated) {
            next({
              name: "admin_user",
              params: { username: store.getters.getUsername },
            });
          } else {
            next();
          }
        },
      },
      { path: "/register", component: AdminRegister, meta: { header: false } },
      {
        name: "admin_user",
        path: "/:username",
        component: Admin,
        meta: { header: false },
      },
    ];
  } else {
    routes = [];
  }
  return routes;
};

const router = new Router({
  mode: "history",
  routes: routes(),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

Vue.use(Router);
Vue.use(VueMaterial);
Vue.use(VueHorizontal);
Vue.use(VueSnip);
Vue.component("VueSlider", VueSlider);

new Vue({
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
