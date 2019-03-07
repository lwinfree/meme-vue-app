<template>
  <div class="pets-index">
    <h1>Found {{ pets.length }} pets in 97214:</h1>
    <!-- TODO: want to make # of pets & zipcode dynamic & want to add a button here to change the zipcode & reload search results-->
    
    <div class = "container">
      <div v-for="pet in pets">
        <router-link v-bind:to="'/pets/' + pet.pet_id">
          <div class="card">
            <img class="card-img-top" :src="pet.pet_photo" :alt="pet.pet_name">
            <div class="card-body">
              
                <h2>{{ pet.pet_name }}</h2>
                <h4>Age: {{ pet.pet_age }}</h4>
                <h4>Breed: {{ pet.pet_breeds["$t"] }}</h4>
                More Info
            </div>
          </div>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pets: [],
    };
  },
  created: function() {
    axios.get("/api/pets").then(response => {
      this.pets = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};

</script>