<template>
  <div>
    <md-list class="md-triple-line">

      <md-list-item v-for="item in items" :key="item.title">

        <md-icon >
          <img :src="item.image" alt="Items">
        </md-icon>

        <div class="md-list-item-text">
          <span>{{ item.title }}</span>
          <span>{{ item.description }}</span>
          <p>{{ item.price }}</p>
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">delete</md-icon>
        </md-button>
      </md-list-item>

    </md-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ItemsList",
  data() {
    return {
      items: null,
    }
  },
  created() {

    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/sellerItems")
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

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>