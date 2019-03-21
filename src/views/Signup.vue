<template>
  <div class="signup">

    <div id="header-banner">
        <div class="banner-content single-page text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1>SIGN UP</h1>
            </div>
          </div>
        </div>
    </div>

    <div id="page-content" class="container">

      <div class="contact-area">
        <div class="contact-form-area">
        
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>

          <div id="contact-form">
            <form v-on:submit.prevent="submit()" id="contactForm" data-toggle="validator">
              
              <div class="form-group">
                <input type="text" class="form-control" id="name" placeholder="NAME" v-model="name" required>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="EMAIL" v-model="email">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="zipcode" placeholder="ZIPCODE" v-model="zipcode">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password" placeholder="PASSWORD" v-model="password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" id="password_confirmation" placeholder="PASSWORD CONFIRMATION" v-model="passwordConfirmation">
              </div>
              <button type="submit" id="form-submit" class="btn btn-md btn-primary-filled btn-form-submit">SIGNUP</button>
            </form>
          </div>
        </div>
      </div>
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