<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://backend.store.conco/";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

