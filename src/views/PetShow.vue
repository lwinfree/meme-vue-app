<template>
  <div class="pet-show">
    <div class = "container">
      <h1>{{ pet.pet_name }}</h1>
      <img :src="pet.pet_photo" :alt="pet.pet_name">
    </div>
    <div>
      <h2>About {{pet.pet_name}}</h2>
      <h4>{{ pet.pet_age }}</h4>
      <h4>{{ pet.pet_breeds }}</h4>
      <!-- note: gotta fix breeds -->
      <p>{{ pet.pet_description }}</p>
      <a href="https://www.petfinder.com/">Adopt {{pet.pet_name}} on Petfinder</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pet: {},
    };
  },
  created: function() {
    axios.get("/api/pets/" + this.$route.params.id).then(response => {
      this.pet = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};

</script>