<template>
  <div id="header" lang="scss">
    <div class="topnav">
      <md-icon class="md-accent md-size-2x store-logo">storefront</md-icon>
        <div class="topnav-right">
          <router-link class="icon-btn" to="/login" tag="md-button">
          <md-icon style="color:white">person</md-icon>
          </router-link>
          <md-button class="icon-btn"><md-icon style="color:white">shopping_bag</md-icon></md-button>
        </div>
    </div>
    <md-toolbar  md-elevation="1">
      <div id="menu-row" class="md-toolbar-row">
        <md-button>Home</md-button>
        <md-button>About</md-button>
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
.topnav {
    background-color: rgb(7, 25, 49);
    overflow: hidden;
}

.topnav-right {
  float: right;
}

#menu-row {
  min-height: 40px;
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

md-ic{
  color:white
}
</style>