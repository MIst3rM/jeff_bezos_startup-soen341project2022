import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";

import { Home, Admin } from "./views";
import { Login } from "./components";

import { MdToolbar, MdButton, MdIcon, MdCard } from "vue-material/dist/components";

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
      { path: "/login", component: Login },
    ]
  } else if (subdomain === "admin") {
    routes = [
      { path: "/", component: Admin },
    ]
  } else {
    routes = []
  }
  return routes;
};


const router = new Router({
  mode: "history",
  routes: routes()
})


Vue.use(Router);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdCard);

new Vue({
  router,
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
