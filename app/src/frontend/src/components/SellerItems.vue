<template>
  <div class="seller_items_container">
    <md-list class="md-triple-line" v-if="items.length > 0">
      <md-list-item
        v-for="item in items"
        :key="item.title"
        :to="{ name: 'edit_item', params: { id: item.id, item: item } }"
      >
        <md-icon>
          <img :src="item.image" alt="Items" class="item-icon" />
        </md-icon>

        <div class="md-list-item-text">
          <span>{{ item.title }}</span>
          <span>{{ item.description }}</span>
          <p>{{ item.price }}</p>
        </div>

        <md-button
          class="md-icon-button md-list-action"
          @click="
            showDeleteConfirm = true;
            itemToDelete = item.id;
          "
        >
          <md-icon class="md-primary">delete</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <span v-else class="md-display-1">You have not listed any items yet</span>

    <router-view />

    <md-button id="add_new_item" data-cy="add_new_item" class="md-fab" @click="showDialog = true">
      <md-icon id="add_icon">add</md-icon>
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <AddItem />
    </md-dialog>
    <md-dialog-confirm
      :md-active.sync="showDeleteConfirm"
      md-title="Are you sure you want to delete this item?"
      md-content="This action cannot be undone"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="
        showDeleteConfirm = false;
        itemToDelete = null;
      "
      @md-confirm="onConfirm"
      data-cy="delete_item_confirm"
    />
  </div>
</template>

<script>
import axios from "axios";
import { AddItem } from "../components";
import { bus } from "../main";
export default {
  name: "SellerItems",
  components: {
    AddItem,
  },
  data() {
    return {
      items: [],
      showDialog: false,
      showDeleteConfirm: false,
      itemToDelete: null,
    };
  },
  created() {
    bus.$on("refreshItems", () => {
      setTimeout(() => {
        this.showDialog = false;
      }, 2000);
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("/api/sellerItems/" + this.$store.getters.getAuthUser.user.id)
          .then((response) => {
            this.items = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/sellerItems/" + this.$store.getters.getAuthUser.user.id)
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  methods: {
    onConfirm() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .delete("/api/deleteItem/" + this.itemToDelete)
          .then((response) => {
            this.showDeleteConfirm = false;
            this.showSnackbar = true;
            this.successMsg = response.data;
            this.itemToDelete = null;
            bus.$emit("refreshItems");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.seller_items_container {
  display: flex;
  flex-direction: row;
  justify-content: unset;
  align-items: center;
}

.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
  height: 93vh;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #071931;
  border-radius: 10px;
}

#add_new_item {
  position: fixed;
  right: 10px;
  top: 5px;
}

.md-dialog :nth-child(1) {
  border-radius: 28px;
}

.md-list-action {
  align-self: center !important;
}

.item-icon {
  max-width: 50px;
  max-height: 50px;
  width: auto;
  height: auto;
}
</style>