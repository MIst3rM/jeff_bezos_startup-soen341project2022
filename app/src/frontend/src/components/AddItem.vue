<template>
<body>
  <div>
    <form
      id="item-form"
      novalidate
      class="md-layout"
      @submit.prevent="validateItem"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-40">

        <md-card-header>
          <div id="add-item-title" class="md-title">Add Item</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Item</label>
                <md-input
                  name="title"
                  id="title"
                  v-model="form.title"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.title.required"
                  >The item name is required</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('image')">
                
                <md-input
                  type="file"
                  name="image"
                  id="image"
                  v-model="form.image"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.image.required"
                  >An image is required</span
                >
                <span class="md-error" v-else-if="!$v.form.image.valid"
                  >A valid image type is required</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label for="description">Description</label>
                <md-textarea
                  name="last-name"
                  id="last-name"
                  autocomplete="description"
                  v-model="form.description"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.description.required"
                  >The item description is required</span
                >
              </md-field>
            </div>
            
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field :class="getValidationClass('category')">
                <label for="category">Category</label>
                <md-select
                  name="category"
                  id="category"
                  v-model="form.category"
                  :disabled="sending"
                  required
                >
                  <md-option value="mens-clothing">Men's Clothing</md-option>
                  <md-option value="womens-clothing">Women's Clothing</md-option>
                  <md-option value="jewelery">Jewelery</md-option>
                  <md-option value="shoes">Shoes</md-option>
                  <md-option value="health-and-beauty">Health and Beauty</md-option>
                  <md-option value="outdoors-and-sports">Outdoors and Sports</md-option>
                  <md-option value="home">Home</md-option>
                  <md-option value="kids">Kids</md-option>
                  <md-option value="accessories">Accessories</md-option>
                  <md-option value="other">Other</md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item">
              <md-field :class="getValidationClass('price')">
                <label for="price">Price</label>
                <md-input
                  name="price"
                  id="price"
                  v-model="form.price"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.price.required"
                  >The item price is required</span
                >
                <span class="md-error" v-else-if="!$v.form.price.decimal"
                  >The item price must be a numeric value</span
                >
                <span class="md-error" v-else-if="!$v.form.price.minLength"
                  >The item price must contain at least one figure</span
                >
                <span class="md-error" v-else-if="!$v.form.price.maxLength"
                  >The item price must be a at most six figures</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <span class="invalidCreds" v-if="failedItemAdd">
          {{ errorMsg }}
        </span>
        <md-card-actions>
          <md-button id="button-add-item" type="submit" class="md-primary" :disabled="sending"
            >Add</md-button
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
  minLength,
  maxLength,
  decimal,
  helpers,
} from "vuelidate/lib/validators";

export default {
  name: "AddItem",
  mixins: [validationMixin],
  data: () => ({
    form: {
      title: null,
      description: null,
      image: null,
      category: null,
      price: null,
    },
    sending: false,
    failedItemAdd: false,
  }),
  validations: {
    form: {
      title: {
        required
      },
      description: {
        required,
      },
      image: {
        required,
        valid: function (value) {
          const alpha = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
          console.log(alpha);
          return alpha;
        },
      },
      price: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(6),
        decimal,
      }
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
      this.form.title = null;
      this.form.description = null;
      this.form.image = null;
      this.form.category = null;
      this.form.price = null;
    },
    saveItem() {
      this.sending = true;
      axios.get("/sanctum/csrf-cookie").then(() => { 
            axios
              .post("/api/addItem", {
              seller_id: 1, // CHANGE CHANGE CHANGE
              title: this.form.title,
              description: this.form.description,
              image: this.form.image,
              category: this.form.category,
              price: this.form.price,
          })
          .catch((error) => {
            this.sending = false;
            this.failedItemAdd = true;
            this.clearForm();
          });
      });
    },
    validateItem() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveItem();
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

  body {
    background:	#f0f8ff !important;
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

  #item-form {
    justify-content: center;
    position: fixed;
    top: 30%;
    min-width: 100%;
  }

  .invalidCreds {
    color: red;
    margin-top: 0.5em;
  }
  .md-card{
    border-radius: 28px;
  }

  #add-item-title {
    font-weight: bolder;
  }

  #button-add-item {
    background-color:#1d4fd8;
    background-size: 0% 100%;
    border:none;
    border-radius:7px;
    color:#fff;
    display: inline-block;
    font-size:20px;
    text-decoration:none;
    transition: background-color .5s;
    width:150px;
    margin: 2%;
  }

  #button-add-item:hover {
    background-color:#011f4b;
    background-image:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 100%);
    background-repeat:no-repeat;
    background-size: 200% 100%; 
    transition:background-size 1s, background-color 1s;
  }

  #button-add-item:active {
    background-color:#294fb9; transition:background-size 0
  }
</style>