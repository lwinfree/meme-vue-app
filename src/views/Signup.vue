<template>
  <div class="signup">

    <div id="header-banner">
        <div class="banner-content single-page text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1>SIGN UP</h1>
            </div><!-- / banner-info -->
          </div>
        </div><!-- / banner-content -->
    </div>

    <div class="container">
        <!-- <div class="contact-form"> -->
          <form v-on:submit.prevent="submit()">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Name:</label> 
              <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" v-model="email">
            </div>
            <div class="form-group">
              <label>Zipcode:</label>
              <input type="text" class="form-control" v-model="zipcode">
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <div class="form-group">
              <label>Password confirmation:</label>
              <input type="password" class="form-control" v-model="passwordConfirmation">
            </div>
            <input type="submit" class="btn btn-primary" value="Submit">
          </form>
        <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      zipcode: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        zipcode: this.zipcode,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users/", params)
        .then(response => {
          this.$router.push("login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>