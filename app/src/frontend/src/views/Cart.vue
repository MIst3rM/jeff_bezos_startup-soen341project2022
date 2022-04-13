<template>
  <div class="cart">
    <md-empty-state
      v-if="getItems.length == 0"
      md-icon="shopping_basket"
      md-label="Your cart is empty"
      md-description="Looks like you haven't added anything to your cart yet. Add something to get started."
    >
      <md-button class="md-raised md-primary" @click="$router.push('/shop')">
        Browse Items
      </md-button>
    </md-empty-state>
    <md-table
      v-if="getItems.length > 0"
      v-model="getItems"
      md-card
      @md-selected="onSelect"
      class="md-elevation-0"
    >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="title">Your Cart</h1>
        </div>
      </md-table-toolbar>
      <md-table-toolbar
        class="md-table-alternate-header"
        slot="md-table-alternate-header"
        slot-scope="{ count }"
      >
        <div class="md-toolbar-section-start">
          {{ getAlternateLabel(count) }}
        </div>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button" @click="removeFromCart">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
      >
        <md-table-cell md-label="">
          <img class="item-img" :src="item.image" :alt="item.title" />
        </md-table-cell>
        <md-table-cell data-cy="item_title" md-label="Item">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Category">{{ item.category }}</md-table-cell>
        <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
        <md-table-cell data-cy="quantity" md-label="Quantity">
          <div class="actions-container">
            <md-button
              v-if="item.quantity > 1"
              class="md-icon-button"
              @click="decreaseQuantity(item)"
            >
              <md-icon class="action-icon">remove</md-icon>
            </md-button>
            {{ item.quantity }}
            <md-button data-cy="increaseQuantity" class="md-icon-button" @click="increaseQuantity(item)">
              <md-icon class="action-icon">add</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div v-if="getItems.length > 0" class="total">
      <h2>Total: {{ getTotal }}</h2>
      <router-link id="checkoutBtn" class="md-primary" to="" tag="md-button">
        Checkout
      </router-link>
    </div>
    <md-dialog
      id="checkoutDialog"
      :md-active.sync="showDialog"
      :md-close-on-esc="false"
      :md-click-outside-to-close="false"
    >
      <h1>Processing your order</h1>
      <md-progress-spinner
        :md-stroke="3"
        md-mode="indeterminate"
      ></md-progress-spinner>
    </md-dialog>
    <md-dialog id="deletedDialog" :md-active.sync="showDeletedDialog">
      <md-dialog-title>Items no longer available</md-dialog-title>
      <vue-horizontal>
        <section
          class="deletedItem"
          v-for="item in deletedItems"
          :key="item.id"
        >
          <md-card class="deletedItemCard">
            <md-card-header-text>
              <div class="md-title">{{ item.title }}</div>
            </md-card-header-text>
            <md-card-media>
              <img
                class="deletedItemImage"
                :src="item.image"
                :alt="item.title"
              />
            </md-card-media>
          </md-card>
        </section>
      </vue-horizontal>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDeletedDialog = false"
          >Ok</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import axios from "axios";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default {
  name: "Cart",
  data() {
    return {
      items: [],
      selected: [],
      sending: false,
      showDialog: false,
      showDeletedDialog: false,
      deletedItems: [],
    };
  },
  mounted() {
    window.Echo.channel("channel").listen("UpdatedItem", (e) => {
      this.$store.dispatch("cart/updateCartItem", e.item);
    });

    window.Echo.channel("channel").listen("DeletedItem", (e) => {
      this.deletedItems.push(e.item);
      this.showDeletedDialog = true;
      this.$store.dispatch("cart/removeProductFromCart", e.item);
    });
  },
  computed: {
    getItems() {
      return this.$store.getters["cart/getCartProducts"];
    },
    getTotal() {
      return formatter.format(this.$store.getters["cart/getCartTotalPrice"]);
    },
    isSelected() {
      if (this.selected.length > 0) {
        return 1;
      } else {
        return 2;
      }
    },
  },
  methods: {
    checkout() {
      this.showDialog = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/checkout", {
            items: this.$store.getters["cart/getCartProducts"],
          })
          .then((response) => {
            this.$store.dispatch("cart/checkout");
            this.showDialog = false;
          })
          .catch((error) => {
            this.showDialog = false;
            console.log(error);
          });
      });
    },
    onSelect(items) {
      this.selected = items;
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }
      return `${count} item${plural} selected`;
    },
    removeFromCart() {
      this.selected.forEach((item) => {
        this.$store.dispatch("cart/removeProductFromCart", item);
      });
    },
    increaseQuantity(item) {
      this.$store.dispatch("cart/incrementItemQuantity", { product: item });
    },
    decreaseQuantity(item) {
      this.$store.dispatch("cart/decrementItemQuantity", { product: item });
    },
  },
};
</script>

<style scoped lang="scss">
.md-table-alternate-header {
  background-color: rgb(238, 133, 115) !important;
}

.deletedItem {
  margin: 0 auto;
}
.deletedItemCard {
  width: 300px;
  height: 200px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  padding: 4px;
  text-align: center;
}

#deletedDialog .md-dialog-container {
  width: 500px;
  height: 400px;
  border-radius: 28px;
}

.md-dialog-title {
  text-align: center;
}

#checkoutDialog :first-child {
  border-radius: 24px;
  padding: 10px;
}

.md-progress-spinner {
  justify-content: space-evenly;
  margin: 24px;
}
.total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

h2 {
  padding: 20px;
}

.md-empty-state-icon {
  color: rgb(13, 24, 48) !important;
}

.actions-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.action-icon {
  font-size: 15px !important;
}

.md-icon-button {
  z-index: 3;
}

.md-button + .md-button {
  margin-left: 8px;
}

img {
  display: block;
  max-width: 100px;
  max-height: 133px;
  width: auto;
  height: auto;
  margin: 0 auto;
}

#checkoutBtn {
  background-color: #1d4fd8;
  background-size: 0% 100%;
  border: none;
  border-radius: 7px;
  color: #fff;
  display: inline-block;
  font-size: 17px;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.5s;
  width: 150px;
  right: 10px;
}
#checkoutBtn:hover {
  background-color: #011f4b;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.7) 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  transition: background-size 1s, background-color 1s;
}
#checkoutBtn:active {
  background-color: #294fb9;
  transition: background-size 0;
}
</style>