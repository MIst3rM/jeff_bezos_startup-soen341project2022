<template>
  <div id="login" lang="scss">
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      msg: null,
    };
  },
  mounted() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.get("/login").then((response) => (this.msg = response.data));
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