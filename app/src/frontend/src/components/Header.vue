<template>
  <div id="header">
    <md-toolbar id="row1" class="md-dense" md-theme="default">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start" id="logo">
          <router-link to="/" tag="md-button">
            <md-icon class="md-accent md-size-2x store-logo"
              >storefront</md-icon
            >
          </router-link>
        </div>
        <div class="md-toolbar-section-end">
          <strong
            class="account"
            v-if="login"
            data-cy="username"
            style="margin-top: 6px"
            >Hi, {{ username }}</strong
          >

          <md-menu ref="menu" :mdCloseOnClick="true">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon class="sideicon" data-cy="menu" style="margin-top: 5px"
                >person</md-icon
              >
            </md-button>

            <md-menu-content>
              <md-menu-item v-if="login">
                <router-link
                  class="md-icon-button"
                  to="/profile"
                  tag="md-button"
                >
                  <md-icon data-cy="profile">person</md-icon>
                </router-link>
                <span>My Profile</span>
              </md-menu-item>

              <md-menu-item v-if="login" class="menu-logout">
                <router-link
                  class="md-icon-button"
                  to="/"
                  tag="md-button"
                  @click.native="logout"
                >
                  <md-icon data-cy="logout">logout</md-icon>
                </router-link>
                <span>Logout</span>
              </md-menu-item>

              <md-menu-item v-if="!login">
                <router-link class="md-icon-button" to="/login" tag="md-button">
                  <md-icon data-cy="login">login</md-icon>
                </router-link>
                <span>Login</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-badge
            :md-content="cartQuantity"
            md-dense
            class="cart-badge"
            v-if="isCartEmpty"
          ></md-badge>
          <div class="cart-icon">
            <router-link class="md-icon-button" to="/cart" tag="md-button">
              <md-icon class="sideicon" data-cy="cart" style="margin-top: 2px"
                >shopping_bag</md-icon
              >
            </router-link>
          </div>
        </div>
      </div>
    </md-toolbar>
    <md-toolbar class="md-dense" md-elevation="1">
      <router-link to="/" tag="md-button">Home</router-link>
      <router-link to="/shop" tag="md-button">Shop</router-link>
    </md-toolbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  computed: {
    login() {
      return this.$store.getters.isAuthenticated;
    },
    username: function () {
      return this.$store.getters.getAuthUser.user.firstname;
    },
    isCartEmpty: function () {
      return this.$store.getters["cart/isCartEmpty"] ? false : true;
    },
    cartQuantity: function () {
      return this.$store.getters["cart/getCartTotalQuantity"];
    },
  },
  methods: {
    async logout(event) {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/logout")
          .then(() => {
            this.$store.dispatch("Logout");
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
#row1 {
  color: white;
  background-color: #071931;
}

.md-badge {
  color: #071931 !important;
  font-weight: 900;
  font-size: 12px !important;
}

.cart-badge {
  top: 15px;
  right: 1px;
}

.cart-icon {
  width: 40px;
  height: 40px;
}

.sideicon {
  color: white !important;
}

.menu-logout :nth-child(1) {
  justify-content: flex-start;
}
</style>