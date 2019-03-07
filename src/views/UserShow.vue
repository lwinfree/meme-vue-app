<template>
  <div class="users-show">
    <div class = "container">
      <h1>{{ user.name }}</h1>
      <h4>Email: {{ user.email }}</h4>
      <h4>Zipcode: {{ user.zipcode }}</h4>
    </div>
    <router-link v-bind:to="'/users/me/edit'">Edit my profile</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios.get("/api/users/" + localStorage.getItem("user_id")).then(response => {
      this.user = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>