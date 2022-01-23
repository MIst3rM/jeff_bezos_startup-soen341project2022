import Vue from "vue";
import App from "./App.vue";
import { MdToolbar } from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./assets/styles/theme.scss";

Vue.config.productionTip = false;

Vue.use(MdToolbar);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
