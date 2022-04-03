<template>
  <div>
    <AdminHeader />
    <ItemsList />
  </div>
</template>


<script>
import { AddItem, AdminHeader, ItemsList } from "../components";

export default {
  name: "Admin",
  components: {
    AddItem,
    AdminHeader,
    ItemsList,
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