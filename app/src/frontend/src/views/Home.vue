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
          let img = new Image();
          this.items = response.data;
          this.items.forEach((item) => {
            img.src = item.image;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  mounted() {
    window.Echo.channel("channel").listen("AddedItem", (e) => {
      this.items = e.items.sort((a, b) => {
        return b.id - a.id;
      }).slice(0,5);
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
      data-cy="item-card"
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