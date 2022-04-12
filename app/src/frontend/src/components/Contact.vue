<template>
  <form
    novalidate
    :class="`md-layout ${checkout.alignment}`"
    @submit.prevent="validateUser"
    data-cy="personal_info_form"
  >
    <md-card :class="`md-layout-item ${checkout.size}`">
      <md-card-header :class="checkout.header_class">
        <div class="md-title">{{ title }}</div>
        <div class="md-subtitle" v-if="!checkout.login & checkout.isActive">
          Already Have An Account?
          <router-link id="loginBtn" to="/login" tag="md-button"
            >Login</router-link
          >
        </div>
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
              <span class="md-error" v-if="!$v.currentUser.firstname.required">
                firstname is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.currentUser.firstname.minLength"
              >
                firstname too short min: 2 char
              </span>
              <span
                class="md-error second-error"
                v-else-if="!$v.currentUser.firstname.maxLength"
              >
                firstname too long max: 255 char
              </span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastname')">
              <label for="last-name">Last Name</label>
              <md-input
                name="last-name"
                id="last-name"
                autocomplete="lastname"
                v-model="currentUser.lastname"
              />
              <span class="md-error" v-if="!$v.currentUser.lastname.required">
                lastname is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.currentUser.lastname.minLength"
              >
                lastname too short min: 2 char
              </span>
              <span
                class="md-error second-error"
                v-else-if="!$v.currentUser.lastname.maxLength"
              >
                lastname too long max: 255 char
              </span>
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
              />
              <span class="md-error" v-if="!$v.currentUser.email.required">
                email is required
              </span>
              <span class="md-error" v-else-if="!$v.currentUser.email.email">
                email is not valid
              </span>
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
        <slot></slot>
      </md-card-content>
      <md-card-actions :class="checkout.isActive ? 'hidden-save-btn' : ''">
        <md-button
          ref="save_info"
          type="submit"
          class="md-primary"
          :disabled="sending1"
          data-cy="save_info"
        >
          Save
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Contact",
  mixins: [validationMixin],
  props: {
    title: {
      type: String,
      default: "",
    },
    currentUser: {
      type: Object,
      required: false,
      default: () => ({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      }),
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
    login: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    sending1: false,
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
    persistChanges() {
      this.sending1 = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/updateUser", {
            updatedUser: {
              id: this.currentUser.id,
              firstname: this.currentUser.firstname,
              lastname: this.currentUser.lastname,
              email: this.currentUser.email,
              phone: this.currentUser.phone,
            },
          })
          .then((response) => {
            this.sending1 = false;
            this.$store.dispatch("updateUser", {
              user: response.data,
            });
          })
          .catch((error) => {
            this.sending1 = false;
            if (error.response.status === 401) {
              this.$store.dispatch("Logout");
              setTimeout(
                () =>
                  this.$router.push({
                    name: "login",
                    params: { showSnackbar: true },
                  }),
                500
              );
            }
          });
      });
    },
    validateUser() {
      this.$nextTick().then(() => {
        this.$v.currentUser.$touch();

        if (!this.$v.currentUser.$invalid) {
          if (this.checkout.isActive) {
            bus.$emit("checkout-step", {
              part: "contact",
            });
          } else {
            this.persistChanges();
          }
        }
      });
    },
  },
  validations: {
    currentUser: {
      firstname: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
      lastname: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(255),
      },
      email: {
        required,
        email,
        minLength: minLength(2),
        maxLength: maxLength(255),
      },
    },
  },
};
</script>

<style scoped lang="scss">
.info-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

#loginBtn {
  min-width: unset;
  vertical-align: middle;
}

.hidden-save-btn {
  visibility: collapse;
}
</style>
