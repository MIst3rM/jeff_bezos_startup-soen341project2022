<script>
import ItemCard from '../components/ItemCard.vue';

export default {
  name: "Home",
  components: {
    ItemCard,
  },
};
</script>

<template>
  <div id="home" lang="scss" class="md-layout md-gutter md-alignment-center">
    <ItemCard/>
  </div>
</template>

<style scoped>
.md-layout{
  margin: 30px auto;
}
</style>