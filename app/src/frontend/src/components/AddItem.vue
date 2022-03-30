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

          <md-card-content id="addItemForm">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="title">Title</label>
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
                  <label for="image">Image</label>
                  <md-file
                    name="image"
                    id="image"
                    accept="image/*"
                    v-model="form.image"
                    :disabled="sending"
                    @change="uploadImage($event)"
                  />
                  <span class="md-error" v-if="!$v.form.image.required"
                    >An image is required</span
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
                    data-cy="category"
                  >
                    <md-option value="mens-clothing">Men's Clothing</md-option>
                    <md-option value="womens-clothing" data-cy="womens-clothing"
                      >Women's Clothing</md-option
                    >
                    <md-option value="electronics">Electronics</md-option>
                    <md-option value="jewelery">Jewelery</md-option>
                    <md-option value="shoes">Shoes</md-option>
                    <md-option value="health-and-beauty"
                      >Health and Beauty</md-option
                    >
                    <md-option value="outdoors-and-sports"
                      >Outdoors and Sports</md-option
                    >
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
                </md-field>
              </div>
            </div>
            <span class="invalidCreds" v-if="failedItemAdd">
              {{ errorMsg }}
            </span>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-snackbar
            :md-position="position"
            :md-duration="4000"
            :md-active.sync="showSnackbar"
            md-persistent
            data-cy="item_added"
          >
            <span>{{ successMsg }}</span>
          </md-snackbar>

          <md-card-actions>
            <md-button
              id="button-add-item"
              type="submit"
              class="md-primary"
              :disabled="sending"
              data-cy="add_item"
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
import { required, decimal, helpers } from "vuelidate/lib/validators";

const instance = axios.create({
  baseURL: "https://api.imgbb.com/1",
  withCredentials: false,
});

const priceRequirements = helpers.regex(/^\d+(\.\d{1,2})?$/, /^(?!0).*/);

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
    errorMsg: "",
    image_url: "",
    successMsg: "",
    showSnackbar: false,
    position: "center",
  }),
  computed: {
    id: function () {
      return this.$store.getters.getAuthUser.user.id;
    },
  },
  validations: {
    form: {
      title: {
        required,
      },
      description: {
        required,
      },
      image: {
        required,
      },
      price: {
        required,
        decimal,
        priceRequirements,
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
      this.form.title = null;
      this.form.description = null;
      this.form.image = null;
      this.form.category = null;
      this.form.price = null;
      this.errorMsg = "";
    },
    saveItem() {
      this.sending = true;
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .post("/api/addItem", {
            seller_id: this.id,
            title: this.form.title,
            description: this.form.description,
            image: this.image_url,
            category: this.form.category,
            price: this.form.price,
          })
          .then((response) => {
            this.sending = false;
            this.clearForm();
            this.successMsg = response.data;
            this.showSnackbar = true;
          })
          .catch((error) => {
            this.sending = false;
            this.failedItemAdd = true;
            this.errorMsg = error.response.data.message;
            if (error.response.status === 401) {
              this.$store.dispatch("Logout");
              this.clearForm();
              setTimeout(() => this.$router.push({ path: "/" }), 500);
            }
          });
      });
    },
    uploadImage(event) {
      const bodyData = new FormData();
      bodyData.set("key", process.env.VUE_APP_IMGBB_API_KEY);
      bodyData.append("image", event.target.files[0]);

      instance({
        method: "post",
        url: "/upload",
        data: bodyData,
      })
        .then((response) => {
          this.image_url = response.data.data.display_url;
        })
        .catch((error) => {
          console.log(error);
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
#addItemForm {
  text-align: center;
  font-size: 18px;
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
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
.md-card {
  border-radius: 28px;
}

#add-item-title {
  font-weight: bolder;
}

#button-add-item {
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
  margin: 2%;
}

#button-add-item:hover {
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

#button-add-item:active {
  background-color: #294fb9;
  transition: background-size 0;
}
</style>