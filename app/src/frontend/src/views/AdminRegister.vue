<script>
import { Registration } from "../components";
export default {
  name: "AdminRegister",
  components: {
    Registration,
  },
};
</script>

<template>
  <div id="adminregister" lang="scss">
    <Registration :adminLogin="true" />
  </div>
</template>