<template>
  <div>
    <AdminHeader />
    <AddItem />
  </div>
</template>


<script>
import { AddItem, AdminHeader } from "../components";

export default {
  name: "Admin",
  components: {
    AddItem,
    AdminHeader,
  },
  computed: {
    login() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-layout {
  width: 100%;
}
</style>