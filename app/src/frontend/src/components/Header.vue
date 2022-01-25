<template>
  <div id="header" lang="scss">
    <md-toolbar class="md-primary" md-elevation="1">
      <md-button>Home</md-button>
      <md-button>About</md-button>
      <md-icon class="md-accent md-size-4x">storefront</md-icon>
      <md-button>Shop</md-button>
      <md-button>FAQ</md-button>
    </md-toolbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      msg: null,
    };
  },
  mounted() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.get("/home").then((response) => (this.msg = response.data));
    });
  },
};
</script>

<style scoped>
.md-toolbar{
  justify-content: center;
}
.md-icon{
  margin: auto 0.5em;
}
</style>