<template>
  <div>
    <md-app md-theme="profile">
      <md-app-toolbar>
        <span class="md-title md-transparent">Profile</span>
      </md-app-toolbar>
      <md-app-drawer class="md-accent" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0"> </md-toolbar>
        <md-list>
          <md-list-item></md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>

          <md-list-item> </md-list-item>
        </md-list>
      </md-app-drawer>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "Profile",
};
</script>

<style scoped lang="scss">
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  height: 100vmax;
}
</style>