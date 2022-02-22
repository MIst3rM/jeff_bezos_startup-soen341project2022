<template>
  <div id="header">
    <md-toolbar id="row1" class="md-dense" md-theme="default">
      <div class="md-layout md-gutter md-alignment-center-left" id="logo">
        <div class="md-layout-item">
          <router-link to="/" tag="md-button">
            <md-icon class="md-accent md-size-2x store-logo"
              >storefront</md-icon
            >
          </router-link>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center-right">
        <b class="account" v-if="login">Hi, {{ name }}</b>
        <div class="md-layout-item">
          <router-link class="icon-btn" to="/login" tag="md-button">
            <md-icon class="sideicon">person</md-icon>
          </router-link>
        </div>
        <div class="md-layout-item">
          <router-link class="icon-btn" to="/cart" tag="md-button">
            <md-icon class="sideicon">shopping_bag</md-icon>
          </router-link>
        </div>
      </div>
    </md-toolbar>
    <md-toolbar class="md-dense" md-elevation="1">
      <router-link to="/" tag="md-button">Home</router-link>
      <router-link to="/about" tag="md-button">About</router-link>
      <router-link to="/shop" tag="md-button">Shop</router-link>
      <router-link to="/faq" tag="md-button">FAQ</router-link>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    login() {
      return this.$store.getters.isLoggedIn;
    },
    name() {
      return this.$store.getters.getAuthUser.data.name;
    },
  },
};
</script>

<style lang="scss" scoped>
#row1 {
  color: white;
  background-color: #071931;
}

#logo {
  flex: 1;
}

.sideicon {
  color: white !important;
}

.md-button {
  min-width: 0px;
}
</style>