<template>
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
          <div class="md-title">Sign in</div>
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
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
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
              <span class="md-error" v-if="!$v.form.password.required"
                >The password is required</span
              >
              <span class="md-error" v-else-if="!$v.form.password.minLength"
                >Password must be at least 8 characters</span
              >
              <span class="md-error" v-else-if="!$v.form.password.maxLength"
                >Password should not exceed 20 characters</span
              >
            </md-field>
          </div>
          <span class="invalidCreds" v-if="failedLogin">
            {{ errorMsg }}
          </span>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Login</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "Login",
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
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(20),
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
            console.log(response);
            setTimeout(() => this.$router.push({ path: "/" }), 1500);
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

<style scoped>
.md-toolbar {
  justify-content: center;
}
.md-icon {
  margin: auto 0.5em;
}

#login-form {
  position: fixed;
  top: 50%;
  min-width: 100%;
}

.invalidCreds {
  color: red;
  margin-top: 0.5em;
}
</style>