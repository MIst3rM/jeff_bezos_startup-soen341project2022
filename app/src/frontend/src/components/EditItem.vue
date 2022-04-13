<template>
  <div class="edit-container">
    <form
      id="item-form"
      novalidate
      class="md-layout"
      @submit.prevent="validateItem"
    >
      <md-card class="md-layout-item">
        <md-card-header>
          <div id="edit-item-title" class="md-title">Edit Item</div>
        </md-card-header>

        <md-card-content>
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
                  <md-option value="men's clothing">Men's Clothing</md-option>
                  <md-option value="women's clothing" data-cy="womens-clothing"
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
          <span class="invalidCreds" v-if="failedItemEdit">
            {{ errorMsg }}
          </span>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-snackbar
          :md-position="position"
          :md-duration="2000"
          :md-active.sync="showSnackbar"
          md-persistent
          data-cy="item_edited"
        >
          <span>{{ successMsg }}</span>
        </md-snackbar>

        <md-card-actions>
          <md-button
            id="button-edit-item"
            type="submit"
            class="md-primary"
            :disabled="sending"
            data-cy="edit_item"
            >Save Changes</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import { validationMixin } from "vuelidate";
import { required, decimal, helpers } from "vuelidate/lib/validators";

const instance = axios.create({
  baseURL: "https://api.imgbb.com/1",
  withCredentials: false,
});

const priceRequirements = helpers.regex(/^\d+(\.\d{1,2})?$/, /^(?!0).*/);

export default {
  name: "EditItem",
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
    failedItemEdit: false,
    errorMsg: "",
    image_url: "",
    successMsg: "",
    showSnackbar: false,
    position: "center",
  }),
  props: {
    item: {
      type: Object,
      required: true,
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
  created() {
    if (this.item === undefined) {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .get("/api/item/" + this.$route.params.id)
          .then((response) => {
            this.form.title = response.data[0].title;
            this.form.description = response.data[0].description;
            this.form.image = response.data[0].image;
            this.form.category = response.data[0].category;
            this.form.price = response.data[0].price;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      this.form.title = this.item.title;
      this.form.description = this.item.description;
      this.form.image = this.item.image;
      this.form.category = this.item.category;
      this.form.price = this.item.price;
    }
  },
  watch: {
    item: {
      handler() {
        this.form.title = this.item.title;
        this.form.description = this.item.description;
        this.form.image = this.item.image;
        this.form.category = this.item.category;
        this.form.price = this.item.price;
      },
      immediate: true,
      deep: true,
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
          .post("/api/updateItem", {
            updatedItem: {
              id: this.$route.params.id,
              title: this.form.title,
              description: this.form.description,
              image: this.form.image,
              category: this.form.category,
              price: this.form.price,
            },
          })
          .then((response) => {
            this.sending = false;
            this.form.title = response.data.title;
            this.form.description = response.data.description;
            this.form.image = response.data.image;
            this.form.category = response.data.category;
            this.form.price = response.data.price;
            bus.$emit("refreshItems");
          })
          .catch((error) => {
            this.sending = false;
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
<style scoped lang="scss">
.edit-container {
  width: -webkit-fill-available;
}

.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.invalidCreds {
  color: red;
  margin-top: 0.5em;
}
.md-card {
  padding: 10px;
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