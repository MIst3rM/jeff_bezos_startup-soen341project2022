<template>
  <div>
    <form id="registration-form" novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create Account</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
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
              <span class="md-error" v-else-if="!$v.form.password.valid"
                >Password should contain uppercase, lowercase, and special characters and at least one number.</span
              >
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field :class="getValidationClass('confirmPassword')">
              <label for="confirmPassword">Confirm Password</label>
              <md-input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                v-model="form.confirmPassword"
                :disabled="sending"
              />
               <span class="md-error" v-if="!$v.form.password.required"
                >Please confirm password</span
              >
              <span class="md-error" v-if="!$v.form.confirmPassword.sameAsPassword"
                >Passwords do not match, please try again</span
              >           
            </md-field>
          </div>

          </div>
          
        

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

    
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20),
          valid: function(value) {
            const containsUppercase = /[A-Z]/.test(value)
            const containsLowercase = /[a-z]/.test(value)
            const containsNumber = /[0-9]/.test(value)
            const containsSpecial = /[#?!@$%^&*-]/.test(value)
                return containsUppercase && containsLowercase && containsNumber && containsSpecial
          }  
        },
        confirmPassword: {
            required,
            sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.email = null
        this.form.password = null
        this.form.confirmPassword = null
      },
      saveUser () {
        this.sending = true

         axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/register", {
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            email: this.form.email,
            password: this.form.password,
            confirmPassword: this.form.confirmPassword
          })
          .then((response) => {
            this.sending = false;
            console.log(response);
            setTimeout(() => this.$router.push({ path: "/login" }), 1500);
          })
          .catch((error) => {
            this.sending = false;
            this.failedLogin = true;
            this.clearForm();
            // if (error.response.data.errors.email[0]) {
            //   this.errorMsg = error.response.data.errors.email[0];
            // }
          });
      });

      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
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
</style>