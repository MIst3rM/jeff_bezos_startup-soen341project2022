<template>
  <div id="header" lang="scss">
    <md-toolbar class="md-primary" md-elevation="1">
      <div id="icons-row" class="md-toolbar-row">
        <p class="account" v-if="login">Hi, {{ name }}</p>
        <router-link class="icon-btn account" to="/login" tag="md-button">
          <md-icon>person</md-icon>
        </router-link>
        <md-button class="icon-btn"><md-icon>shopping_bag</md-icon></md-button>
      </div>
      <div id="menu-row" class="md-toolbar-row">
        <router-link to="/" tag="md-button">Home</router-link>
        <router-link to="/about" tag="md-button">About</router-link>
        <md-icon class="md-accent md-size-4x store-logo">storefront</md-icon>
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
    name(){
      return this.$store.getters.getAuthUser.data.name;
    },
  },
};
</script>

<style scoped>
#menu-row {
  justify-content: center;
  min-height: 40px;
  margin-bottom: 10px;
}

#icons-row {
  justify-content: right;
  min-height: 40px;
}

.icon-btn {
  min-width: 40px;
}
.store-logo {
  margin: auto 0.5em;
}

.account {
  margin: 2.9px 0px 0px 0px;
}
</style>