<template>
  <div class="users-show">
    <div class = "container">
      <h1>{{ user.name }}</h1>
      <h4>Email: {{ user.email }}</h4>
      <h4>Zipcode: {{ user.zipcode }}</h4>
      <h4>Favorites:</h4>
      <div v-for="favorite in user.favorites">
        <router-link v-bind:to="'/pets/' + favorite.petfinder_id">
          <h4>{{favorite.pet_info.pet_name}}</h4>
          <h4>{{favorite.petfinder_id}}</h4>
          <img :src="favorite.pet_info.pet_photo">
        </router-link>
      </div>
    </div>
    <router-link v-bind:to="'/users/me/edit'">Edit my profile</router-link> | 
    <router-link v-bind:to="'/pets'">Search for pets</router-link>
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
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};
</script>