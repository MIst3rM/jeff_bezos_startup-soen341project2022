<template>
  <div id="header" lang="scss">
    <md-toolbar class="md-primary" md-elevation="1">
      <div id="icons-row" class="md-toolbar-row">
        <router-link class="icon-btn account" to="/login" tag="md-button">
          <md-icon>person</md-icon>
        </router-link>
        <md-button class="icon-btn"><md-icon>shopping_bag</md-icon></md-button>
      </div>
      <div id="menu-row" class="md-toolbar-row">
        <md-button>Home</md-button>
        <md-button>About</md-button>
        <md-icon class="md-accent md-size-4x store-logo">storefront</md-icon>
        <md-button>Shop</md-button>
        <md-button>FAQ</md-button>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: "Header",
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