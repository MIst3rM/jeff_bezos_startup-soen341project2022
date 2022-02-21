<template>
  <div id="header" lang="scss">
    <!-- <p class="account" v-if="login">Hi, {{ name }}</p> -->
    <div class="topnav">
      <router-link to="/" tag="md-button">
        <md-icon class="md-accent md-size-2x store-logo">storefront</md-icon>
      </router-link>
      <div class="topnav-right">
        <router-link class="icon-btn" to="/login" tag="md-button">
          <md-icon style="color: white">person</md-icon>
        </router-link>
        <router-link class="icon-btn" to="/cart" tag="md-button">
          <md-icon style="color: white">shopping_bag</md-icon>
        </router-link>
      </div>
    </div>
    <md-toolbar md-elevation="1">
      <div id="menu-row" class="md-toolbar-row">
        <router-link to="/" tag="md-button">Home</router-link>
        <router-link to="/about" tag="md-button">About</router-link>
        <router-link to="/shop" tag="md-button">Shop</router-link>
        <router-link to="/faq" tag="md-button">FAQ</router-link>
      </div>
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

<style scoped>
.topnav {
  background-color: rgb(7, 25, 49);
  overflow: hidden;
}

.topnav-right {
  float: right;
}

.icon-btn {
  min-width: 40px;
}
.store-logo {
  margin: auto 0.5em;
}

#menu-row {
  min-height: 40px;
}

#icons-row {
  justify-content: right;
  min-height: 40px;
}

md-ic {
  color: white;
}
</style>