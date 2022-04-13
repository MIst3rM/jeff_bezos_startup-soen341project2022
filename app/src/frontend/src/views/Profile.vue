<template>
  <div>
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button
            class="md-icon-button"
            @click="menuVisible = true"
            data-cy="sidemenu"
          >
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Hi, {{ currentUser.firstname }}</span>
        </div>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          Quick Actions
        </md-toolbar>
        <md-list>
          <md-list-item>
            <router-link to="/" tag="md-button">
              <md-icon>home</md-icon>
            </router-link>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item>
            <router-link to="/profile" tag="md-button">
              <md-icon>person</md-icon> </router-link
            ><span class="md-list-item-text">Account</span>
          </md-list-item>

          <md-list-item>
            <router-link
              to="/"
              tag="md-button"
              @click.native="logout"
              data-cy="logout"
            >
              <md-icon>logout</md-icon>
            </router-link>
            <span class="md-list-item-text">Sign out</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <div class="md-layout">
          <Contact :currentUser="currentUser" title="Personal Information" />
          <Password />
          <Address :currentUser="currentUser" />
        </div>
        <md-card class="md-layout-item md-size-90">
          <md-card-header>
            <div class="md-title">Order History</div>
          </md-card-header>
          <md-card-content>
            <vue-horizontal>
              <section
                class="invoice"
                v-for="(order, index) in orderHistory"
                :key="index"
              >
                <md-card class="invoice-card">
                  <md-card-header>
                    <md-card-header-text>
                      <div class="md-title">
                        Purchased on {{ parseDate(order.invoice.created_at) }}
                      </div>
                    </md-card-header-text>
                  </md-card-header>

                  <vue-horizontal ref="horizontal">
                    <section
                      class="item-pic"
                      v-for="(item, index) in order.items"
                      :key="index"
                    >
                      <img :src="item.image" alt="Item-Picture" />
                    </section>
                  </vue-horizontal>

                  <md-card-content>
                    <div class="md-subhead">
                      Total: ${{ order.invoice.total_price }}
                    </div>
                  </md-card-content>

                  <md-card-expand>
                    <md-card-actions>
                      <md-card-expand-trigger>
                        <md-button>See Details</md-button>
                      </md-card-expand-trigger>
                    </md-card-actions>
                    <md-card-expand-content>
                      <md-card-content>
                        <div class="md-layout md-gutter">
                          <div
                            class="md-layout-item md-size-100 detail-item"
                            v-for="(item, index) in order.items"
                            :key="index"
                          >
                            <p v-snip="1">
                              {{ order.quantities[index] }} x {{ item.title }}
                            </p>
                            <p>${{ item.price }}</p>
                          </div>
                        </div>
                      </md-card-content>
                    </md-card-expand-content>
                  </md-card-expand>
                </md-card>
              </section>
            </vue-horizontal>
          </md-card-content>
        </md-card>
      </md-app-content>
    </md-app>
    <md-snackbar
      :md-position="position"
      :md-duration="4000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ message }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { ItemCard, Contact, Address, Password } from "../components";

export default {
  name: "Profile",
  components: { ItemCard, Contact, Address, Password },
  data: () => ({
    currentUser: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      province_state: "",
      postal_code: "",
      country: "",
    },
    // related to image carousel
    hasPrev: false,
    hasNext: false,
    interval: null,
    scrollWidth: 0,
    left: 0,
    progress: 0,
    index: 0,
    // related to image carousel
    orderHistory: [],
    menuVisible: false,
    position: "center",
    message: "",
    showSnackbar: false,
  }),
  beforeRouteLeave(to, from, next) {
    this.menuVisible = false;
    next();
  },
  created() {
    this.currentUser = this.$store.getters.getAuthUser.user;
    
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .post("/api/userOrderHistory", {
          id: this.currentUser.id,
        })
        .then((response) => {
          this.orderHistory = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  methods: {
    parseDate(date) {
      let d = new Date(date);
      return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    },
    logout() {
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

<style scoped lang="scss">
$light: #fe7e6d !important;
$dark: #071931 !important;
$border: 1px solid rgba(#000, 0.12);

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-button {
  margin: 6px 2px !important;
  min-width: 0px !important;
}

.md-app {
  padding: 20px;
  height: 100vh;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-toolbar {
  height: 126px;
}

form {
  margin-bottom: 20px;
}

.second-error {
  margin: -11px 0px;
}

.invoice {
  margin: 8px 30px 8px 30px;
}

.invoice-card {
  width: 400px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.md-card-header .md-card-media {
  height: 150px;
}

.detail-item {
  display: inline-flex;
  justify-content: space-between;
}

img {
  display: block;
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
  margin: 0 auto;
}

.item-pic {
  min-width: -webkit-fill-available;
}
</style>