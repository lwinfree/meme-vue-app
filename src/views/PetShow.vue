<template>
  <div class="pet-show">
    <div class = "container">
      <div>
        <h1>{{ pet.pet_name }}</h1>
        <img :src="pet.pet_photo" :alt="pet.pet_name">
      </div>
      <div>
        <button v-if="pet.favorite_id" v-on:click="unfavoritePet()">
          <i class="icon ion-md-heart">
            <ion-icon name="heart-empty"></ion-icon>
          </i></button>
        <button v-else v-on:click="favoritePet()">
          <i class="icon ion-md-heart">
            <ion-icon name="heart"></ion-icon>
          </i>
          </button>
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
  methods: {
    favoritePet: function() {
      var params = {
        petfinder_id: this.pet.pet_id
      };
      axios.post("/api/favorites", params).then(response => {
        console.log(response.data);
        this.pet.favorite_id = response.data.pet_id;
      }).catch(error => {
        console.log(error.response.data);
      });
    },
    unfavoritePet: function() {
      axios.delete("/api/favorites/" + this.pet.pet_id).then(response => {
        console.log(response.data);
        this.pet.favorite_id = "";
      }).catch(error => {
        console.log(error.response.data);
      });
    }
  }
};

</script>