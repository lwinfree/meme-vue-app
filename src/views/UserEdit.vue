<template>
  <div class="users-edit">
    
    <div class="container">
      <ul>
        <li v-for="error in errors">{{ error }}
        </li>
      </ul>

      <form v-on:submit.prevent="submit(user)">
        <div>
          Name: <input type="text" v-model="user.name">
        </div>
        <div>
          Email: <input type="text" v-model="user.email">
        </div>
        <div>
          Zipcode: <input type="number" v-model="user.zipcode">
        </div>
        <div>
          Password: <input type="password" v-model="user.password">
        </div>
        <button type="submit">Submit Changes</button>
      </form>
      <div>
        <button v-on:click="destroyUser()">
          Delete User
        </button>
      </div>
    </div>

  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/users/me").then(response => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    submit: function(user) {
      var userParams = {
        name: user.name,
        email: user.email,
        zipcode: user.zipcode,
        password: user.password,
      };
      axios.patch("/api/users/me", userParams).then(response => {
        console.log("Updated!", response.data);
        this.$router.push("/users/me");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    destroyUser: function() {
      axios.delete("/api/users/me").then(response => {
        console.log("User successfully destroyed!", response.data);
        localStorage.removeItem("jwt");
        this.$router.push("/");
      })
    }
  }
};
</script>