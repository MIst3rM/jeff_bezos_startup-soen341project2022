<template>
  <div class="users_container">
    <md-list class="md-triple-line" v-if="users.length > 0">
      <md-list-item v-for="user in users" :key="user.id">
        <md-icon class="user-icon"> account_circle </md-icon>

        <div class="md-list-item-text">
          <span>{{ user.name }}</span>
          <span>{{ user.email }}</span>
          <p>{{ user.role }}</p>
        </div>

        <md-button
          class="md-icon-button md-list-action"
          @click="
            showDeleteConfirm = true;
            userToDelete = user.id;
          "
        >
          <md-icon class="md-primary">delete</md-icon>
        </md-button>
      </md-list-item>
    </md-list>

    <router-view />

    <md-dialog-confirm
      :md-active.sync="showDeleteConfirm"
      data-cy="delete_user_confirm"
      md-title="Are you sure you want to delete this user?"
      md-content="This action cannot be undone"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="
        showDeleteConfirm = false;
        userToDelete = null;
      "
      @md-confirm="onConfirm"
    />
    <md-snackbar
      md-position="center"
      :md-duration="2000"
      :md-active.sync="showSnackbar"
      md-persistent
      data-cy="user_deleted"
    >
      <span>{{ successMsg }}</span>
    </md-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ManageUsers",
  data() {
    return {
      users: [],
      showDialog: false,
      showDeleteConfirm: false,
      userToDelete: null,
      showSnackbar: false,
      successMsg: "",
    };
  },
  created() {
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .get("/api/allUsers")
        .then((response) => {
          this.users = response.data.filter((user) => user.role !== "admin");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
  mounted() {
    window.Echo.channel("channel").listen("DeletedUser", (e) => {
      this.users = e.users.filter((user) => user.role !== "admin");
      setTimeout(() => {
        this.showDialog = false;
      }, 2000);
    });
  },
  methods: {
    onConfirm() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios
          .delete("/api/deleteUser/" + this.userToDelete)
          .then((response) => {
            this.showDeleteConfirm = false;
            this.showSnackbar = true;
            this.successMsg = response.data;
            this.userToDelete = null;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.users_container {
  display: flex;
  flex-direction: row;
  justify-content: unset;
  align-items: center;
}

.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
  height: 93vh;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #071931;
  border-radius: 10px;
}

.md-list-action {
  align-self: center !important;
}

.md-dialog :nth-child(1) {
  border-radius: 28px;
}
</style>