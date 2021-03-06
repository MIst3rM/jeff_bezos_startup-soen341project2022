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
import "bootstrap/dist/js/bootstrap.bundle.min";


import { EditItem, Login, Registration, SellerItems, ManageUsers } from "./components";
import {
  Home,
  Admin,
  Seller,
  Shop,
  Profile,
  AdminLogin,
  AdminRegister,
  Cart,
  Checkout,
  SellerProfile,
} from "./views";

Vue.config.productionTip = false;

import Echo from "laravel-echo";
window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://backend.store.conco/";

const host = window.location.host;
const subdomain = host.split(".")[0];

const routes = () => {
  let routes;
  if (subdomain === 'store') {
    routes = [
      {
        path: '/',
        component: Home,
        meta: { header: true },
      },
      {
        path: '/login',
        component: Login,
        name: 'login',
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.getters.isAuthenticated) {
            next({ path: '/profile' });
          } else {
            next();
          }
        },
        meta: {
          header: true,
          requiresAuth: false
        },
      },
      {
        path: '/shop',
        component: Shop,
        name: 'shop',
        meta: { 
          header: true,
          requiresAuth: false
        },
      },
      {
        path: '/profile',
        component: Profile,
        name: 'profile',
        meta: {
          header: false,
          requiresAuth: true,
        },
      },
      {
        path: '/register',
        component: Registration,
        meta: {
          header: true,
          requiresAuth: false 
        },
      },
      {
        path: '/cart',
        component: Cart,
        meta: { header: true, requiresAuth: false },
      },
      {
        name: 'checkout',
        path: '/checkout',
        component: Checkout,
        meta: { header: true, requiresAuth: false },
      },
    ];
  } else if (subdomain === 'admin') {
    routes = [
      {
        path: '/',
        component: AdminLogin,
        meta: { 
          header: false,
          requiresAuth: false 
        },
        beforeEnter: (to, from, next) => {
          if (store.getters.isAuthenticated) {
            next({
              name: "seller",
              params: { username: store.getters.getUsername },
            });
          } else {
            next();
          }
        },
      },
      { path: '/register', component: AdminRegister, meta: { header: false, requiresAuth: false } },
      {
        name: "seller",
        path: "/seller/:username",
        component: Seller,
        meta: { header: false, requiresAuth: true },
        children: [
          {
            name: "listed",
            path: "/seller/:username/listed",
            component: SellerItems,
            meta: { requiresAuth: true },
            children: [
              {
                name: "edit_item",
                path: "/seller/:username/listed/:id/edit",
                component: EditItem,
                meta: { requiresAuth: true },
                props: true,
              },
            ],
          },
          {
            name: "seller_profile",
            path: "/seller/:username/profile",
            component: SellerProfile,
            meta: { requiresAuth: true },
          },
          {
            name: "sales",
            path: "/seller/:username/sales",
            component: null,
          },
        ],
      },
      {
        name: "admin",
        path: "/admin/:username",
        component: Admin,
        meta: { header: false, requiresAuth: true },
        children: [
          {
            name: "admin_profile",
            path: "/admin/:username/profile",
            component: SellerProfile,
            meta: { requiresAuth: true },
          },
          {
            name: "manage_users",
            path: "/admin/:username/manage_users",
            component: ManageUsers,
            meta: { requiresAuth: true },
          }
        ],
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
    } else if (subdomain === "admin") {
      next("/");
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

Vue.use(Router);
Vue.use(VueMaterial);
Vue.use(VueHorizontal);
Vue.use(VueSnip);
Vue.component("VueSlider", VueSlider);
Vue.component(
  "MdSelect",
  Vue.options.components.MdSelect.extend({
    methods: {
      isInvalidValue: function isInvalidValue() {
        return this.$el.validity
          ? this.$el.validity.badInput
          : this.$el.querySelector("input").validity.badInput;
      },
    },
  })
);
Vue.component(
  "MdFile",
  Vue.options.components.MdFile.extend({
    methods: {
      isInvalidValue: function isInvalidValue() {
        return this.$el.validity
          ? this.$el.validity.badInput
          : this.$el.querySelector("input").validity.badInput;
      },
    },
  })
);

export const bus = new Vue();

new Vue({
  data() {
    return {
      isCartEmpty: true,
    };
  },
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
