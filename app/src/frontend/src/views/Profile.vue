<template>
  <div>
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">Profile</span>
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
            <router-link to="/" tag="md-button" @click.native="signout">
              <md-icon>logout</md-icon>
            </router-link>
            <span class="md-list-item-text">Sign out</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <div class="md-layout">
          <form class="md-layout">
            <md-card class="md-layout-item">
              <md-card-header>
                <div class="md-title">Contact</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="first-name">First Name</label>
                      <md-input
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="last-name">Last Name</label>
                      <md-input
                        name="last-name"
                        id="last-name"
                        autocomplete="last-name"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="email">Email</label>
                      <md-input
                        name="email"
                        id="email"
                        autocomplete="email"
                        disabled
                      />
                    </md-field>
                  </div>
                </div>
              </md-card-content>
              <md-card-header>
                <div class="md-title">Payment Methods</div>
              </md-card-header>
              <md-card-actions>
                <md-button type="submit" class="md-primary"> Save </md-button>
              </md-card-actions>
            </md-card>
          </form>
          <form class="md-layout">
            <md-card class="md-layout-item">
              <md-card-header>
                <div class="md-title">Address</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="address">Address</label>
                      <md-input
                        name="address"
                        id="address"
                        autocomplete="address-line1"
                      />
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="address2">Apartment, suite, etc.</label>
                      <md-input
                        name="address2"
                        id="address2"
                        autocomplete="address-line2"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="city">City</label>
                      <md-input name="city" id="city" autocomplete="city" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="province">State/Province</label>
                      <md-select
                        v-model="province"
                        name="province"
                        id="province"
                      >
                        <md-option
                          v-for="province in provinces"
                          :value="province.name"
                          :key="province.abbreviation"
                        >
                          {{ province.name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="country">Country</label>
                      <md-select v-model="country" name="country" id="country">
                        <md-option
                          v-for="province in provinces"
                          :value="province.name"
                          :key="province.abbreviation"
                        >
                          {{ province.name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="postal-code">Postal Code</label>
                      <md-input
                        name="postal-code"
                        id="postal-code"
                        autocomplete="postal-code"
                      />
                    </md-field>
                  </div>
                </div>
              </md-card-content>
              <md-card-actions>
                <md-button type="submit" class="md-primary"> Save </md-button>
              </md-card-actions>
            </md-card>
          </form>
        </div>
        <md-card class="md-layout-item md-size-40">
          <md-card-header>
            <div class="md-title">Order History</div>
          </md-card-header>
          <md-card-content>
            <vue-horizontal>
              <section v-for="index in 10" :key="index">
                <md-card>
                  <md-card-header>
                    <div class="md-title">{{ index }}</div>
                  </md-card-header>
                </md-card>
              </section>
            </vue-horizontal>
          </md-card-content>
        </md-card>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data: () => ({
    username: "",
    menuVisible: false,
    province: "",
    country: "",
    provinces: [
      {
        name: "Alberta",
        abbreviation: "AB",
      },
      {
        name: "British Columbia",
        abbreviation: "BC",
      },
      {
        name: "Manitoba",
        abbreviation: "MB",
      },
      {
        name: "New Brunswick",
        abbreviation: "NB",
      },
      {
        name: "Newfoundland and Labrador",
        abbreviation: "NL",
      },
      {
        name: "Northwest Territories",
        abbreviation: "NT",
      },
      {
        name: "Nova Scotia",
        abbreviation: "NS",
      },
      {
        name: "Nunavut",
        abbreviation: "NU",
      },
      {
        name: "Ontario",
        abbreviation: "ON",
      },
      {
        name: "Prince Edward Island",
        abbreviation: "PE",
      },
      {
        name: "Quebec",
        abbreviation: "QC",
      },
      {
        name: "Saskatchewan",
        abbreviation: "SK",
      },
      {
        name: "Yukon Territory",
        abbreviation: "YT",
      },
    ],
  }),
  methods: {
    setUsername() {
      //this.username = this.$store.state.user.name;
    },
    signout(event) {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/logout", {})
          .then((response) => {
            window.sessionStorage.clear();
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
  height: 126px !important;
}

form {
  margin-bottom: 20px;
}
</style>