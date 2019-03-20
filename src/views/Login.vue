<template>
  <div class="login">


    <!-- content -->

    <div id="header-banner">
        <div class="banner-content single-page text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1>LOG IN</h1>
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
              <!-- contact form 1col -->
              <div id="contact-form">
                  <form v-on:submit.prevent="submit()" id="contactForm" data-toggle="validator">
                      <div class="form-group">
                          <input type="email" class="form-control" id="email" placeholder="EMAIL" v-model="email" required>
                          <div class="help-block with-errors"></div>
                      </div>
                      <div class="form-group">
                          <input type="password" class="form-control" id="password" placeholder="PASSWORD" v-model="password" required>
                          <div class="help-block with-errors"></div>
                      </div>
                      <button type="submit" id="form-submit" class="btn btn-md btn-primary-filled btn-form-submit">LOGIN</button>  
                  </form>
              </div><!-- / contact form 1col -->
          </div><!-- / col-sm-6 -->
      </div><!-- / contact-area -->

    </div><!-- / container -->

    <!-- / content -->
    



  </div>
</template>

<style>
  .contact-form-area {
    width: 500px;
    margin: 0 auto;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/users/me");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>