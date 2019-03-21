<template>
  <div class="users-edit">

    <div id="header-banner">
        <div class="banner-content single-page text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1>EDIT PROFILE</h1>
            </div><!-- / banner-info -->
          </div>
        </div><!-- / banner-content -->
    </div>
    

    <div id="page-content" class="container">

      <div class="contact-area">
          <div class="contact-form-area">

            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
              <div id="contact-form">
                <form v-on:submit.prevent="submit(user)" id="contactForm">
                  <div class="form-group">
                    <h5>NAME: </h5>
                    <input class="form-control" type="text" v-model="user.name">
                  </div>
                  <div class="form-group">
                    <h5>EMAIL: </h5>
                    <input class="form-control" type="text" v-model="user.email">
                  </div>
                  <div class="form-group">
                    <h5>ZIPCODE: </h5>
                    <input class="form-control" type="number" v-model="user.zipcode">
                  </div>
                  <div class="form-group">
                    <h5>PASSWORD: </h5>
                    <input class="form-control" type="password" v-model="user.password">
                  </div>
                  <button type="submit" class="btn btn-md btn-primary-filled btn-form-submit">EDIT</button>
                </form>
                  <div class="space-top-30">
                    <button class="btn btn-md btn-default-filled btn-form-submit" v-on:click="destroyUser()">
                      DELETE USER
                    </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style>
  div.form-group h5 {
    color: #c39d6d;
  }
</style>

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