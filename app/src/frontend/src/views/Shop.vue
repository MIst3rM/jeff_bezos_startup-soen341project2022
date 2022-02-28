<template>
  <div>
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="1">
          <h3>Filters</h3>
        </md-toolbar>

        <md-subheader>Category</md-subheader>
        <md-checkbox
          v-for="category in categories"
          :key="category"
          v-model="selectedCategories"
          :id="category"
          :value="category"
        >
          {{ category }}
        </md-checkbox>

        <md-subheader>Price</md-subheader>
        <vue-slider></vue-slider>
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
      categories: [],
      selectedCategories: [],
    };
  },
  created() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/allItems")
        .then((response) => {
          this.items = response.data;
          this.items.filter((item) => {
            if (!this.categories.includes(this.pascalCase(item.category))) {
              this.categories.push(this.pascalCase(item.category));
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  methods: {
    pascalCase(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
};
</script>

<style lang="scss">
.vue-slider-rail {
  background-color: #acb2ba;
}

.vue-slider-dot-handle {
  background-color: #fe7e6d;
}

.vue-slider-dot-handle::after {
  background-color: #fe7e6d78;
}

.vue-slider-process {
  background-color: #082c5c;
}

.vue-slider-dot-tooltip-inner-top {
  background-color: #082c5c;
}
</style>

<style lang="scss" scoped>

.md-drawer.md-permanent-full {
  z-index: 1;
}

.md-checkbox {
  display: flex;
  padding: 8px;
}

.vue-slider {
  margin: 20px;
}

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