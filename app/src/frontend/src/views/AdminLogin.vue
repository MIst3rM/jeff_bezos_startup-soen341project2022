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
  <div>
    <Login :adminLogin="true" />
  </div>
</template>