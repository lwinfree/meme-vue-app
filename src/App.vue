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
                <a class="navbar-brand" href="/"><img src="images/shiba-inu.png" alt="Meme App"></a>
            </div><!-- / navbar-header -->
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/"><span>HOME</span></a></li>
                      <li v-if="isLoggedIn()"><router-link to="/pets"><span>PET SEARCH</span></router-link></li>
                      <li v-if="isLoggedIn()"><router-link to="/users/me"><span>USER PROFILE</span></router-link></li>
                      <li v-if="isLoggedIn()"><router-link to="/logout"><span>LOGOUT</span></router-link></li>
                      <li v-if="!isLoggedIn()"><router-link to="/login"><span>LOGIN</span></router-link></li>
                      <li v-if="!isLoggedIn()"><router-link to="/signup"><span>SIGNUP</span></router-link></li>
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
