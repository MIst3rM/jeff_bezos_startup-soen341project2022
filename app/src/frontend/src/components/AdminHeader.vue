<template>
  <div id="admin_header">
    <md-toolbar id="row1" class="md-dense" md-theme="default">
      <div class="md-layout md-gutter md-alignment-center-left" id="logo">
        <div class="md-layout-item">
          <md-icon class="md-accent md-size-2x store-logo">storefront</md-icon>
        </div>
      </div>
      <div class="md-layout md-gutter md-alignment-center-right">
        <strong class="account" v-if="login" data-cy="username"
          >Hi, {{ username }}</strong
        >

        <md-menu class="md-layout-item" ref="menu" :mdCloseOnClick="true">
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon class="sideicon" data-cy="menu">person</md-icon>
          </md-button>

          <md-menu-content>
            <md-menu-item v-if="login">
              <router-link to="/" tag="md-button" @click.native="logout">
                <md-icon data-cy="logout">logout</md-icon>
              </router-link>
              <span>Logout</span>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminHeader",
  computed: {
    login() {
      return this.$store.getters.isAuthenticated;
    },
    username: function () {
      return this.$store.getters.getAuthUser.user.firstname;
    },
  },
  methods: {
    logout() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/logout")
          .then(() => {
            this.$store.dispatch("Logout");
            this.$router.push("/");
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