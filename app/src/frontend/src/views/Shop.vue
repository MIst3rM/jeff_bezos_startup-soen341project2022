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
        .get("/api/allItems")
        .then((response) => {
          this.items = response.data;
          console.log(this.items);
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
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h5>Filter</h5>
        </md-toolbar>
        <md-list>
          <md-list-item></md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <div class="md-layout md-gutter md-alignment-center-center">
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
  width: 100%;
}

.item_card {
  height: 445px;
  margin: 10px;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-app-content {
  overflow-y: hidden;
}
</style>