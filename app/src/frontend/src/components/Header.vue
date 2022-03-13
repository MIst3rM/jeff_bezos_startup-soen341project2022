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
        <b class="account" v-if="login">Hi, {{ username }}</b>

        <md-menu class="md-layout-item">
          <md-button
            class="md-icon-button"
            md-menu-trigger
            @click.native="handleMenu"
          >
            <md-icon class="sideicon">person</md-icon>
          </md-button>

          <md-menu-content v-if="login" ref="menu">
            <md-menu-item>
              <router-link to="/profile" tag="md-button">
                <md-icon>person</md-icon>
              </router-link>
              <span>My Profile</span>
            </md-menu-item>

            <md-menu-item>
              <router-link to="/" tag="md-button" @click.native="logout">
                <md-icon>logout</md-icon>
              </router-link>
              <span>Logout</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>

        <!-- <div class="md-layout-item">
          <router-link class="icon-btn" to="/login" tag="md-button">
            <md-icon class="sideicon">person</md-icon>
          </router-link>
        </div> -->
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
  },
  methods: {
    handleMenu(event) {
      if (!this.login) {
        this.$router.push("/login");
      }
    },
    async logout(event) {
      console.log("logout");
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