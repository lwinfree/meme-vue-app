<template>
  <div id="app">

    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Pet Memez</a>
            </div><!-- / navbar-header -->
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/"><span>HOME</span></a></li>
                      <li v-if="isLoggedIn()"><a href="/pets"><span>PET SEARCH</span></a></li>
                      <li v-if="isLoggedIn()"><a href="/users/me"><span>USER PROFILE</span></a></li>
                      <li v-if="isLoggedIn()"><a href="/logout"><span>LOGOUT</span></a></li>
                      <li v-else><a href="/login"><span>LOGIN</span></a></li>
                      <li v-else><a href="/signup"><span>SIGNUP</span></a></li>
                </ul>
            </div><!--/ nav-collapse -->
        </div><!-- / container -->
    </nav>

    <router-view/>
  </div>
</template>

<style>

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
