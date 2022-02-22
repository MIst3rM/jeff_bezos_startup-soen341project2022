<script>
import axios from "axios";
import ItemCard from "../components/ItemCard.vue";

export default {
  name: "Home",
  components: {
    ItemCard,
  },
  data() {
    return {
      items: null,
    };
  },
  created() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/items")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>

<template>
  <div id="home" class="md-layout md-gutter md-alignment-center-center">
    <ItemCard
      class="item_card"
      :key="item.id"
      v-for="item in items"
      :item="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.md-layout {
  width: 100%;
}

.item_card {
  height: 445px;
  margin: 10px;
}
</style>