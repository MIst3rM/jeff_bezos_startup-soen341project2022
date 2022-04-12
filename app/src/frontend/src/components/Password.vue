<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validatePassword"
    data-cy="password_form"
  >
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">Update Password</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('current_password')">
              <label for="current_password">Current Password</label>
              <md-input
                name="current_password"
                type="password"
                id="current_password"
                autocomplete="current-password"
                v-model="updatePassword.current_password"
              />
              <span
                class="md-error"
                v-if="!$v.updatePassword.current_password.required"
              >
                password is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.updatePassword.current_password.minLength"
              >
                password too short min: 6 char
              </span>
              <span
                class="md-error second-error"
                v-else-if="!$v.updatePassword.current_password.maxLength"
              >
                password too long max: 255 char
              </span>
            </md-field>
            <md-field :class="getValidationClass('new_password')">
              <label for="new_password">New Password</label>
              <md-input
                name="new_password"
                type="password"
                id="new_password"
                autocomplete="new-password"
                v-model="updatePassword.new_password"
              />
              <span
                class="md-error"
                v-if="!$v.updatePassword.new_password.required"
              >
                password is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.updatePassword.new_password.minLength"
              >
                password too short min: 6 char
              </span>
              <span
                class="md-error second-error"
                v-else-if="!$v.updatePassword.new_password.maxLength"
              >
                password too long max: 255 char
              </span>
            </md-field>
            <md-field :class="getValidationClass('confirmed_password')">
              <label for="confirmed_password"> Confirm New Password</label>
              <md-input
                name="confirmed_password"
                type="password"
                id="confirmed_password"
                autocomplete="new-password"
                v-model="updatePassword.confirmed_password"
              />
              <span
                class="md-error"
                v-if="!$v.updatePassword.confirmed_password.required"
              >
                password is required
              </span>
              <span
                class="md-error"
                v-else-if="!$v.updatePassword.confirmed_password.sameAs"
              >
                password does not match
              </span>
              <span
                class="md-error"
                v-else-if="!$v.updatePassword.confirmed_password.minLength"
              >
                password too short min: 6 char
              </span>
              <span
                class="md-error second-error"
                v-else-if="!$v.updatePassword.confirmed_password.maxLength"
              >
                password too long max: 255 char
              </span>
            </md-field>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending2">
          Save
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Password",
  mixins: [validationMixin],
  data: () => ({
    updatePassword: {
      current_password: "",
      new_password: "",
      confirmed_password: "",
    },
    sending2: false,
    message: "",
    showSnackbar: false,
    duration: 4000,
  }),
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.updatePassword[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    persistPasswordChanges() {
      this.sending2 = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .put("/api/user/password ", {
            current_password: this.updatePassword.current_password,
            new_password: this.updatePassword.new_password,
            new_password_confirmation: this.updatePassword.confirmed_password,
          })
          .then((response) => {
            this.sending2 = false;
            this.showSnackbar = true;
            this.message = "Password updated successfully";
            this.updatePassword.current_password = "";
            this.updatePassword.new_password = "";
            this.updatePassword.confirmed_password = "";
            this.$v.updatePassword.$reset();
            setTimeout(() => {
              this.showSnackbar = false;
              this.message = "";
            }, this.duration);
          })
          .catch((error) => {
            this.sending2 = false;
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
    validatePassword() {
      this.$nextTick().then(() => {
        this.$v.updatePassword.$touch();

        if (!this.$v.updatePassword.$invalid) {
          this.persistPasswordChanges();
        }
      });
    },
  },
  validations: {
    updatePassword: {
      current_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      new_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
      confirmed_password: {
        required,
        sameAs: sameAs("new_password"),
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
    },
  },
};
</script>
