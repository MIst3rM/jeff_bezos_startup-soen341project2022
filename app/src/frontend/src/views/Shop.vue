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
          @change="filter()"
        >
          {{ category }}
        </md-checkbox>

        <md-subheader>Price</md-subheader>
        <vue-slider
          silent
          :interval="1"
          :adsorb="true"
          v-model="price"
          :min="minPrice"
          :max="maxPrice"
          @change="filter()"
        ></vue-slider>
        <md-button id="clear-filters" @click="clearFilters">Clear</md-button>
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
      allItems: null,
      filteredItems: [],
      categories: [],
      selectedCategories: [],
      prices: [],
      price: 0,
      minPrice: 0,
      maxPrice: 0,
    };
  },
  created() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/allItems")
        .then((response) => {
          this.items = response.data;
          this.allItems = response.data;
          this.items.filter((item) => {
            if (!this.categories.includes(this.pascalCase(item.category))) {
              this.categories.push(this.pascalCase(item.category));
            }
          });

          this.prices = this.allItems
            .sort((a, b) => {
              return a.price - b.price;
            })
            .map((item) => item.price);

          this.minPrice = Math.floor(this.prices[0]);
          this.maxPrice = Math.ceil(this.prices[this.prices.length - 1]);
          this.price = this.minPrice;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  mounted(){
    window.Echo.channel("channel").listen("AddedItem", (e) => {
      this.items = e.items;
    });
    window.Echo.channel("channel").listen("UpdatedItem", (e) => {
      var updatedItem = this.items.find((item) => item.id === e.item.id);
      updatedItem.title = e.item.title;
      updatedItem.price = e.item.price;
      updatedItem.category = e.item.category;
      updatedItem.image = e.item.image;
      updatedItem.description = e.item.description;
    });
    window.Echo.channel("channel").listen("DeletedItem", (e) => {
      this.items.splice(
        this.items.findIndex((item) => item.id === e.item.id),
        1
      );
    });
  },
  methods: {
    pascalCase(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
    filter() {
      this.filteredItems = this.allItems.filter((item) => {
        if (this.selectedCategories.length > 0) {
          return (
            this.selectedCategories.includes(this.pascalCase(item.category)) &&
            item.price >= this.price
          );
        } else {
          return item.price >= this.price;
        }
      });
      this.items = this.filteredItems;
    },
    clearFilters() {
      this.selectedCategories = [];
      this.price = this.minPrice;
      this.items = this.allItems;
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

#clear-filters {
  float: right;
}
</style>