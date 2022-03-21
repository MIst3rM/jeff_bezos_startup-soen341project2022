<template>
  <body>
    <div id="login" lang="scss">
      <form
        novalidate
        id="login-form"
        ref="loginForm"
        class="md-layout md-alignment-center-center"
        @submit.prevent="validateUser"
      >
        <md-card class="md-layout-item md-size-40">
          <md-card-header>
            <div class="title">Sign in</div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  v-model="form.email"
                  v-on:click="failedLogin = false"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  data-cy="email_required"
                  v-if="!$v.form.email.required"
                  >The email is required</span
                >
                <span
                  class="md-error"
                  data-cy="invalid_email"
                  v-else-if="!$v.form.email.email"
                  >Invalid email</span
                >
              </md-field>
            </div>
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
                <span
                  class="md-error"
                  data-cy="password_required"
                  v-if="!$v.form.password.required"
                  >The password is required</span
                >
              </md-field>
            </div>
            <span
              class="invalidCreds"
              data-cy="login_failed"
              v-if="failedLogin"
            >
              {{ errorMsg }}
            </span>
          </md-card-content>
          <md-card-actions>
            <span id="button-register">
              <router-link class="md-primary" to="/register" tag="md-button">
                Don't have an account? Register Now
              </router-link>
            </span>
            <span id="login-button">
              <md-button
                id="login-color"
                type="submit"
                class="md-primary"
                :disabled="sending"
                >Login</md-button
              >
            </span>
          </md-card-actions>
        </md-card>
      </form>
      <md-snackbar
        :md-position="position"
        :md-duration="duration"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>Due to inactivity, you were logged out.</span>
      </md-snackbar>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  props: {
    showSnackbar: {
      type: Boolean,
      default: false,
    },
    adminLogin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    errorMsg: "",
    failedLogin: false,
    rememberMe: false,
    sending: false,
    position: "center",
    duration: 4000,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
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
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
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
            this.failedLogin = true;
            this.clearForm();
            if (error.response.data.errors.email[0]) {
              this.errorMsg = error.response.data.errors.email[0];
            }
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
body {
  background: #f0f8ff !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}
.md-card {
  border-radius: 28px;
}
.title {
  text-align: center;
  font-weight: bolder;
  font-size: 200%;
}

.md-toolbar {
  justify-content: center;
}
.md-icon {
  margin: auto 0.5em;
}

.md-card-actions {
  display: inline-block;
  width: 100%;
  padding-left: 2.5%;
}

/* Button for login */
.md-card {
  text-align: center;
}

#login-color {
  background-color: #1d4fd8;
  background-size: 0% 100%;
  border: none;
  border-radius: 7px;
  color: #fff;
  display: inline-block;
  font-size: 20px;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.5s;
  width: 150px;
}

#login-color:hover {
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

#login-color:active {
  background-color: #294fb9;
  transition: background-size 0;
}

#login-color {
  color: white;
}

/* Button for registration */
.md-primary {
  padding-right: 100px;
  padding-left: 100px;
}

#login-form {
  position: fixed;
  top: 30%;
  min-width: 100%;
}

.invalidCreds {
  color: red;
  margin-top: 0.5em;
}
</style>