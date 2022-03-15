<template>
  <div>
    <AddItem/>
  </div>
</template>


<script>
import Login from "../components/Login.vue";
import AddItem from "../components/AddItem.vue"

export default {
  name: "Admin",
  components: {
    Login,
    AddItem
  },

};
</script>

<style lang="scss" scoped>
.md-layout {
  width: 100%;
}

</style>