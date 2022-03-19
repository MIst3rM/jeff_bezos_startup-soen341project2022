<script>
import { Login } from "../components";
export default {
  name: "AdminLogin",
  data: () => ({
    redirectPath: ""
  }),
  components: {
    Login,
  },
};
</script>

<template>
  <div id="adminlogin" lang="scss">
    <Login :redirectPath=this.redirectPath />
  </div>
</template>