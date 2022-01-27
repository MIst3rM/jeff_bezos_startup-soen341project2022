<template>
  <div id="login" lang="scss">
    <form
      novalidate
      id="login-form"
      ref="loginForm"
      class="md-layout md-alignment-center-center"
    >
      <md-card class="md-layout-item md-size-40">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-item">
            <!-- <md-field :class="getValidationClass('email')">

            </md-field> -->
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      msg: null,
    };
  },
  mounted() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios.get("/login").then((response) => (this.msg = response.data));
    });
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
</style>