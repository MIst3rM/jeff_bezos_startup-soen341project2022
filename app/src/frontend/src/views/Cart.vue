<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p class ="cart-message" v-show="!products.length">
      <i>Your cart is empty! </i>
      <router-link to="/"> Go shopping</router-link>
    </p>
    <table class="table" v-show="products.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for-key="p in products">
            <td>{{ p.name }}</td>
            <td>${{ p.price }}</td>
            <td>{{ p.quantity }}</td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>${{ total }}</b></td>
          </tr>
      </tbody>

    </table>
    <span id="login-button">
              <md-button
                v-show="products.length"
                id="login-color"
                type="submit"
                class="md-primary"
                :disabled="sending"
                @click='checkout'>
                Checkout
                </md-button
              >
            </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Cart",
    computed: {
    ...mapGetters({
      products: 'cartProducts'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout(){
      alert('Pay us $' + this.total)
    }
  }
}
</script>

<style>
body{
    background: #f0f8ff !important;
}
table{
    font-size: 20px;
}
.cart-message,
h1.title {
    text-align: center;
    padding: 10px;
}
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
  font-size: 17px;
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
</style>

