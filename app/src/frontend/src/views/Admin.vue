<template>
  <div class="md-layout">
    <AdminHeader />
    <Contact :currentUser="currentUser" title="Personal Information" />
    <Address :currentUser="currentUser" />
    <Password />
  </div>
</template>

<script>
import { Contact, Address, Password, AdminHeader } from "../components";

export default {
  name: "Admin",
  components: {
    Contact,
    Address,
    Password,
    AdminHeader,
  },
  data: () => ({
    currentUser: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      province_state: "",
      postal_code: "",
      country: "",
    },
  }),
  created() {
    this.currentUser = this.$store.getters.getAuthUser.user;
  },
};
</script>