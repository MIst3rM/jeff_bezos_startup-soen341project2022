<script>
import axios from "axios";
import ItemCard from "../components/ItemCard.vue";

export default {
  name: "Shop",
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
        .get("/items")
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
  <div>
    <md-app>
      <md-app-drawer>
        <md-toolbar class="md-transparent" md-elevation="0">
          Filter
        </md-toolbar>
        <md-list>
          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <div id="shop" class="md-layout md-gutter md-alignment-center-center">
          <ItemCard
            class="item_card"
            :key="item.id"
            v-for="item in items"
            :item="item"
          />
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-layout {
  /* margin: 30px auto; */
  width: 100%;
}

.item_card {
  height: 445px;
  margin: 10px;
}
</style>