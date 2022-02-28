<template>
  <div>
    <md-app md-waterfall md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = true">
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
            <router-link to="/" tag="md-button" @click.native="signout">
              <md-icon>logout</md-icon>
            </router-link>
            <span class="md-list-item-text">Sign out</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <div class="md-layout">
          <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card class="md-layout-item">
              <md-card-header>
                <div class="md-title">Contact</div>
              </md-card-header>
              <md-card-content>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('firstname')">
                      <label for="first-name">First Name</label>
                      <md-input
                        name="first-name"
                        id="first-name"
                        autocomplete="given-name"
                        v-model="currentUser.firstname"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.currentUser.firstname.minlength"
                        >firstname too short min: 2 char</span
                      >
                      <span
                        class="md-error"
                        v-if="!$v.currentUser.firstname.maxlength"
                        >firstname too long max: 255 char</span
                      >
                    </md-field>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('lastname')">
                      <label for="last-name">Last Name</label>
                      <md-input
                        name="last-name"
                        id="last-name"
                        autocomplete="last-name"
                        v-model="currentUser.lastname"
                      />
                      <span
                        class="md-error"
                        v-if="!$v.currentUser.lastname.minlength"
                        >lastname too short min: 2 char</span
                      >
                      <span
                        class="md-error"
                        v-if="!$v.currentUser.lastname.maxlength"
                        >lastname too long max: 255 char</span
                      >
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field :class="getValidationClass('email')">
                      <label for="email">Email</label>
                      <md-input
                        name="email"
                        id="email"
                        autocomplete="email"
                        v-model="currentUser.email"
                        readonly
                      />
                      <span class="md-error" v-if="!$v.currentUser.email.email"
                        >email is not valid</span
                      >
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="phone">Phone</label>
                      <md-input
                        name="phone"
                        id="phone"
                        autocomplete="phone"
                        v-model="currentUser.phone"
                      />
                    </md-field>
                  </div>
                </div>
              </md-card-content>
              <md-card-header>
                <div class="md-title">Payment Methods</div>
              </md-card-header>
              <md-card-actions>
                <md-button type="submit" class="md-primary" :disabled="sending">
                  Save
                </md-button>
              </md-card-actions>
            </md-card>
          </form>
          <form novalidate class="md-layout" @submit.prevent="validateAddress">
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
                        v-model="currentUser.address_line1"
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
                        v-model="currentUser.address_line2"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="city">City</label>
                      <md-input
                        name="city"
                        id="city"
                        autocomplete="city"
                        v-model="currentUser.city"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="province">State/Province</label>
                      <md-select
                        v-model="currentUser.province"
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
                      <md-select
                        v-model="currentUser.country"
                        name="country"
                        id="country"
                      >
                        <md-option
                          v-for="country in allCountries"
                          :value="country[0]"
                          :key="country[1]"
                        >
                          {{ country[0] }}
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
                        v-model="currentUser.postalCode"
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
import { allCountries } from "country-region-data";
import { validationMixin } from "vuelidate";
import { email, alpha, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  mixins: [validationMixin],
  data: () => ({
    currentUser: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      province_state: "",
      postal_code_zip: "",
      country: "",
    },
    sending: false,
    menuVisible: false,
    province: "",
    country: "",
    allCountries: allCountries,
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
  beforeRouteLeave(to, from, next) {
    this.menuVisible = false;
    next();
  },
  beforeMount() {
    this.currentUser = this.$store.getters.getAuthUser.user;
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.currentUser[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    persistChanges() {
      this.sending = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/updateUser", {
            updatedUser: {
              firstname: this.currentUser.firstname,
              lastname: this.currentUser.lastname,
              email: this.currentUser.email,
              // address: this.currentUser.address,
              // address2: this.currentUser.address2,
              // city: this.currentUser.city,
              // province_state: this.currentUser.province,
              // postal_code_zip: this.currentUser.postalCode,
              // country: this.currentUser.country,
            },
          })
          .then((response) => {
            this.sending = false;
            console.log(response.data);
            //snackbar
          })
          .catch((error) => {
            this.sending = false;
            console.log(error);
          });
      });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.persistChanges();
      }
    },
    signout(event) {
      console.log("signout");
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/logout")
          .then(() => {
            this.$store.commit("clearAuthUser");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  validations: {
    currentUser: {
      firstname: {
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      lastname: {
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      email: {
        email,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
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