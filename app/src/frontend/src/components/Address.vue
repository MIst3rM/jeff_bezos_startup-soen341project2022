<template>
  <component
    :is="checkout.isActive ? 'div' : 'form'"
    novalidate
    class="md-layout"
    @submit.prevent="validateAddress"
    data-cy="address_form"
  >
    <component
      :is="checkout.isActive ? 'div' : 'md-card'"
      class="md-layout-item"
    >
      <component :is="checkout.isActive ? '' : 'md-card-header'">
        <div class="md-title">Address</div>
      </component>
      <component :is="checkout.isActive ? 'div' : 'md-card-content'">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('address1')">
              <label for="address">Address</label>
              <md-input
                name="address1"
                id="address1"
                autocomplete="address-line1"
                v-model="currentUser.address1"
              />
              <span class="md-error" v-if="!$v.currentUser.address1.minLength"
                >address is not valid</span
              >
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="address2">Apartment, suite, etc.</label>
              <md-input
                name="address2"
                id="address2"
                autocomplete="address-line2"
                v-model="currentUser.address2"
              />
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('city')">
              <label for="city">City</label>
              <md-input
                name="city"
                id="city"
                autocomplete="city"
                v-model="currentUser.city"
              />
              <span class="md-error" v-if="!$v.currentUser.city.alpha"
                >city is not valid</span
              >
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="province">State/Province</label>
              <md-select
                v-model="currentUser.province_state"
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
                v-model="currentUser.postal_code"
              />
            </md-field>
          </div>
        </div>
      </component>

      <md-progress-bar md-mode="indeterminate" v-if="sending3" />

      <md-card-actions :class="checkout.isActive ? 'hidden-save-btn' : ''">
        <md-button
          ref="save_info"
          type="submit"
          class="md-primary"
          :disabled="sending3"
        >
          Save
        </md-button>
      </md-card-actions>
    </component>
  </component>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import { allCountries } from "country-region-data";
import { validationMixin } from "vuelidate";
import { alpha, minLength } from "vuelidate/lib/validators";

export default {
  name: "Address",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    checkout: {
      type: Object,
      required: false,
      default: () => ({
        header_class: "",
        login: false,
        size: "",
        alignment: "",
        isActive: false,
      }),
    },
  },
  mixins: [validationMixin],
  data: () => ({
    sending3: false,
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
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.currentUser[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    validateAddress() {
      this.$nextTick().then(() => {
        this.$v.currentUser.$touch();

        if (!this.$v.currentUser.$invalid) {
          if (this.checkout.isActive) {
            bus.$emit("checkout-step", {
              part: "address",
            });
          } else {
            this.persistAddressChanges();
          }
        }
      });
    },
    persistAddressChanges() {
      this.sending3 = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/updateAddress", {
            updatedUser: {
              id: this.currentUser.id,
              address1: this.currentUser.address1,
              address2: this.currentUser.address2,
              city: this.currentUser.city,
              province_state: this.currentUser.province_state
                ? this.currentUser.province_state
                : "",
              postal_code: this.currentUser.postal_code,
              country: this.currentUser.country ? this.currentUser.country : "",
            },
          })
          .then((response) => {
            this.sending3 = false;
            this.$store.dispatch("updateUser", {
              user: response.data,
            });
          })
          .catch((error) => {
            this.sending3 = false;
            if (error.response.status === 401) {
              this.$store.dispatch("Logout");
              setTimeout(() => this.$router.push({ path: "/login" }), 500);
            }
          });
      });
    },
  },
  validations: {
    currentUser: {
      address1: {
        minLength: minLength(1),
      },
      city: {
        alpha,
      },
    },
  },
};
</script>

<style scoped lang="scss">
.hidden-save-btn {
  visibility: collapse;
}
</style>