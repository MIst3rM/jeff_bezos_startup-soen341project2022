<template>
  <div id="app">
    <Header v-if="$route.meta.header" />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

