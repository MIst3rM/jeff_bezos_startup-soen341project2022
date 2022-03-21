<script>
import { Login } from "../components";
export default {
  name: "AdminLogin",
  components: {
    Login,
  },
};
</script>

<template>
  <div id="adminlogin" lang="scss">
    <Login :adminLogin="true" />
  </div>
</template>