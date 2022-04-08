<template>
  <body>
    <div>
      <form
        id="registration-form"
        novalidate
        class="md-layout"
        @submit.prevent="validateUser"
      >
        <md-card class="md-layout-item md-size-50 md-small-size-40">
          <md-card-header>
            <div id="register-title" class="md-title">Create Account</div>
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
                    v-model="form.firstname"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.firstname.required"
                    >The first name is required</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.firstname.minlength"
                    >Invalid first name</span
                  >
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('lastname')">
                  <label for="last-name">Last Name</label>
                  <md-input
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    v-model="form.lastname"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.lastname.required"
                    >The last name is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.lastname.minlength"
                    >Invalid last name</span
                  >
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('email')">
                  <label for="email">Email</label>
                  <md-input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    v-model="form.email"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.email.required"
                    >The email is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.email.email"
                    >Invalid email</span
                  >
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field :class="getValidationClass('password')">
                  <label for="password">Password</label>
                  <md-input
                    type="password"
                    name="password"
                    id="password"
                    v-model="form.password"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.password.required"
                    >The password is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password.minLength"
                    >Password must be at least 8 characters</span
                  >
                  <span class="md-error" v-else-if="!$v.form.password.maxLength"
                    >Password should not exceed 20 characters</span
                  >
                  <span
                    class="md-error"
                    v-else-if="!$v.form.password.passwordRequirements"
                    >Password should contain uppercase, lowercase, and special
                    characters and at least one number.</span
                  >
                </md-field>
              </div>

              <div class="md-layout-item">
                <md-field :class="getValidationClass('password_confirmation')">
                  <label for="password_confirmation">Confirm Password</label>
                  <md-input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    :disabled="sending"
                  />
                  <span
                    class="md-error"
                    v-if="!$v.form.password_confirmation.required"
                    >Please confirm password</span
                  >
                  <span
                    class="md-error"
                    v-if="!$v.form.password_confirmation.sameAsPassword"
                    >Passwords do not match, please try again</span
                  >
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <span class="invalidCreds" v-if="failedRegister">
            {{ errorMsg }}
          </span>
          <md-card-actions>
            <md-button
              id="button-registration"
              type="submit"
              class="md-primary"
              :disabled="sending"
              >Create user</md-button
            >
          </md-card-actions>
        </md-card>
      </form>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "vuelidate/lib/validators";

const passwordRequirements = helpers.regex(
  /[A-Z]/,
  /[a-z]/,
  /[0-9]/,
  /[^A-Za-z0-9]/
);

export default {
  name: "FormValidation",
  props: {
    adminLogin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    sending: false,
    failedRegister: false,
    errorMsg: "",
  }),
  validations: {
    form: {
      firstname: {
        required,
        minLength: minLength(3),
      },
      lastname: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
        passwordRequirements,
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.email = "";
      this.form.password = "";
      this.form.password_confirmation = "";
    },
    saveUser() {
      this.sending = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/register", {
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation,
            role: this.adminLogin ? "admin" : "customer",
          })
          .then(() => {
            this.sending = false;
            axios
              .post("/api/login", {
                email: this.form.email,
                password: this.form.password,
              })
              .then((response) => {
                this.sending = false;
                this.clearForm();
                this.$store.dispatch("Login", {
                  user: response.data,
                });
                if (!this.adminLogin) {
                  setTimeout(() => this.$router.push({ path: "/" }), 500);
                } else {
                  setTimeout(
                    () =>
                      this.$router.push({
                        name: "admin_user",
                        params: { username: response.data.firstname },
                      }),
                    500
                  );
                }
              })
              .catch((error) => {
                this.sending = false;
                this.clearForm();
                if (error.response.data.errors.email[0]) {
                  this.errorMsg = error.response.data.errors.email[0];
                }
              });
          })
          .catch((error) => {
            this.sending = false;
            this.failedRegister = true;
            this.clearForm();
          });
      });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

#registration-form {
  justify-content: center;
  position: fixed;
  top: 30%;
  min-width: 100%;
}

body {
  background: #f0f8ff !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

#registration-form {
  justify-content: center;
  position: fixed;
  top: 30%;
  min-width: 100%;
}

.invalidCreds {
  color: red;
  margin-top: 0.5em;
}
.md-card {
  border-radius: 28px;
}

#register-title {
  font-weight: bolder;
}

#button-registration {
  background-color: #1d4fd8;
  background-size: 0% 100%;
  border: none;
  border-radius: 7px;
  color: #fff;
  display: inline-block;
  font-size: 20px;
  text-decoration: none;
  transition: background-color 0.5s;
  width: 150px;
}

#button-registration:hover {
  background-color: #011f4b;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.7) 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  transition: background-size 1s, background-color 1s;
}

#button-registration:active {
  background-color: #294fb9;
  transition: background-size 0;
}
</style>