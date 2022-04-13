<template>
  <div id="adminPageContainer">
    <AdminHeader />
    <md-app md-waterfall md-mode="fixed">
      <md-app-drawer class="md-elevation-5" md-permanent="full">
        <md-tabs md-sync-route>
          <md-tab
            :to="{ name: 'admin_profile' }"
            md-label="Personal Information"
          ></md-tab>
          <md-tab
            :to="{ name: 'manage_users' }"
            md-label="Manage Users"
          ></md-tab>
        </md-tabs>
      </md-app-drawer>
      <md-app-content>
        <md-empty-state
          v-if="$route.matched.length === 1"
          md-icon="manage_accounts"
          md-label="Choose an option to get started"
          md-description="Click on one of the tabs on the left."
        >
        </md-empty-state>

        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { AdminHeader } from "../components";

export default {
  name: "Admin",
  components: {
    AdminHeader,
  },
};
</script>

<style scoped>
#adminPageContainer {
  height: 100vh;
}

.md-tabs :nth-of-type(-n + 2) {
  min-width: -webkit-fill-available;
}

.md-layout {
  width: 100%;
}

.md-app {
  margin: 1px;
}

.md-app-content {
  border: none;
}

.md-drawer {
  width: min-content;
  max-width: calc(100vw - 125px);
  height: 96vh;
}

.md-tabs > :first-child {
  flex-direction: column;
}
</style>