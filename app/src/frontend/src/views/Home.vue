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
  mounted() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/items")
        .then((response) => {
          this.items = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>

<template>
  <div id="home" lang="scss" class="md-layout md-gutter md-alignment-center-center">
    <ItemCard class="item_card" :key="item.id" v-for="item in items" :item="item" />
  </div>
</template>

<style scoped>
.md-layout {
  margin: 30px auto;
}

.item_card{
  height: 445px;
}
</style>