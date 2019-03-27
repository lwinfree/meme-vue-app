<template>

  <!-- code below adds a banner image -->
    <div id="header-banner" class="demo-1">
        <div class="banner-content text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1>Welcome to the Pet Meme App!</h1>
                <div v-if="isLoggedIn()">
                  <router-link to="/pets" class="btn btn-md btn-success-filled page-scroll" ><span>Pet Search</span></router-link>
                </div>
                <div v-if="!isLoggedIn()">
                  <h5>Sign in to search for adoptable pets.</h5>
                  <router-link to="/login" class="btn btn-md btn-default-filled page-scroll"><span>Login</span></router-link>
                  <router-link to="/signup" class="btn btn-md btn-default-filled page-scroll"><span>Signup</span></router-link>
                </div>
            </div>
          </div>
        </div>
    </div>

</template>

<style>
  h1 {
    line-height: 1.5em;
  }
  div.banner-info h5 {
    color: #000;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      user: {}
    };
  },
  // created: function() {
  //   axios.get("api/users/:id").then(response => {
  //     this.user = response.data;
  //     console.log(this.user);
  //   });
  // },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem('jwt');
    }
  }
};
</script>

