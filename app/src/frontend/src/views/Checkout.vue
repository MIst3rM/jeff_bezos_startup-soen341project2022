<template>
  <div class="checkout-container">
    <md-steppers
      class="checkout-process"
      :md-active-step.sync="active"
      md-linear
    >
      <md-step
        id="first"
        md-label="Customer Information"
        md-description=""
        :md-done.sync="first"
      >
        <Contact
          ref="contact"
          title="Customer Information"
          :currentUser="login ? currentUser : undefined"
          :checkout="checkout"
          ><Address
            ref="address"
            :currentUser="login ? currentUser : undefined"
            :checkout="checkout"
          />
          <md-button
            id="next"
            type="submit"
            class="md-raised md-primary"
            @click="validate"
          >
            Continue
          </md-button></Contact
        >
      </md-step>
      <md-step
        id="second"
        md-label="Shipping Method"
        md-description=""
        :md-done.sync="second"
      ></md-step>
      <md-step
        id="third"
        md-label="Payment Method"
        md-description=""
        :md-done.sync="third"
      ></md-step>
    </md-steppers>
  </div>
</template>


<script>
import { Contact, Address } from "../components";
import { bus } from "../main";
export default {
  name: "Checkout",
  components: {
    Contact,
    Address,
  },
  data: () => ({
    active: "first",
    first: false,
    second: false,
    third: false,
    firstStepError: null,
    secondStepError: null,
    thirdStepError: null,
    validContact: false,
    validAddress: false,
    checkout: {
      header_class: "info-header",
      login: false,
      size: "md-small-size-50 md-medium-size-80 md-large-size-100",
      alignment: "md-alignment-center-center",
      isActive: true,
    },
  }),
  created() {
    bus.$on("checkout-step", (step) => {
      console.log(step.part);
      if (step.part === "contact") {
        this.validContact = true;
      }
      if (step.part === "address") {
        this.validAddress = true;
      }

      if (this.validContact && this.validAddress) {
        setDone("first", "second");
      }
    });
  },
  methods: {
    setDone(id, index) {
      this[id] = true;
      this.firstStepError = null;
      this.secondStepError = null;
      this.thirdStepError = null;
      if (index) {
        this.active = index;
      }
    },
    setError(id, index) {},
    validate() {
      this.$refs.contact.$refs.save_info.$el.click();
      this.$refs.address.$refs.save_info.$el.click();
    },
  },
  computed: {
    login() {
      this.checkout.login = this.$store.getters.isAuthenticated;
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.getAuthUser.user;
    },
  },
};
</script>

<style scoped lang="scss">
#next {
  z-index: 5;
  float: right;
  margin: 20px;
}
</style>