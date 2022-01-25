import Vue from "vue";
import App from "./App.vue";
import { MdToolbar, MdButton, MdIcon, MdCard } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./assets/styles/theme.scss";
import home from "./router/index";
import admin from "./router/admin";

Vue.config.productionTip = false;

const host = window.location.host;
const subdomain = host.split(".")[0];

const router = () => {
  let routes;
  if (subdomain === "store") {
    routes = home;
  } else if (subdomain === "admin") {
    routes = admin;
  } else {
    routes = home;
  }
  return routes;
};

Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdCard);

new Vue({
  router: router(),
  render: (h) => h(App),
  components: {
    App,
  },
}).$mount("#app");
