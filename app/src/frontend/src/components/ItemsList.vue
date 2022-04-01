<template>
  <div>
    <md-list class="md-triple-line">

      <md-list-item v-for="item in items" :key="item.title">

        <div class="md-list-item-text">
          <span>{{ item.title }}</span>
          <!-- <span>{{ item.description }}</span>
          <p>{{ item.price }}</p> -->
        </div>

        <md-button class="md-icon-button md-list-action">
          <md-icon class="md-primary">delete</md-icon>
        </md-button>
      </md-list-item>

    </md-list>
  </div>
</template>

<script>
export default {
  name: "ItemsList",
  data() {
    return {
      items: null,
      currentUser: null,
    }
  },
  created() {
    if (process.env.NODE_ENV !== "test") {
      this.currentUser = this.$store.getters.getAuthUser.user;   
    }

    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/sellerItems", {
          seller_id: this.currentUser.id
        })
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