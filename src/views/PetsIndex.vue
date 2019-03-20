<template>
  <div class="pets-index">
    <h1 class=text-center>Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <section id="portfolio" class="info-box two-col">
      <div class = "container">
        <ul class="row portfolio list-unstyled lightbox" id="grid" >
          <!-- <div v-for="pet in pets"> -->
            <!-- <router-link v-bind:to="'/pets/' + pet.pet_id"> -->
              
              <li class="col-xs-6 project m-project" v-for="pet in pets">
                  <div class="img-bg-color primary">
                      <!-- / project-link -->
                      <img :src="pet.pet_photo" :alt="pet.pet_name">
                      <!-- / project-image -->

                      <!-- project-hover-tools -->
                      <div class="project-hover-tools">
                          <router-link v-bind:to="'/pets/' + pet.pet_id" class="view-btn">
                              <i class="lnr lnr-eye"></i>
                          </router-link>
                      </div><!-- / project-hover-tools -->

                      <!-- project-details -->
                      <div class="project-details">
                          <h5 class="project-title">{{ pet.pet_name }}</h5>
                          <p class="skill">Age: {{ pet.pet_age }}</p>
                          <p class="skill">Breed: {{ pet.pet_breeds }}</p>
                      </div><!-- / project-details -->
                  </div><!-- / img-bg-color -->
              </li>


            <!-- </router-link> -->
          <!-- </div> -->
        </ul>
      </div>
    </section>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pets: [],
      user: {},
    };
  },
  created: function() {
    axios.get("/api/pets").then(response => {
      this.pets = response.data;
      console.log(response.data);
    });
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
      console.log(response.data);
    });
  },
  methods: {}
};

</script>


<!-- original pet card code: -->
<!-- <div class = "container">
  <div v-for="pet in pets">
    <router-link v-bind:to="'/pets/' + pet.pet_id">
      <div class="card">
        <img class="card-img-top" :src="pet.pet_photo" :alt="pet.pet_name">
        <div class="card-body">
          
            <h2>{{ pet.pet_name }}</h2>
            <h4>Age: {{ pet.pet_age }}</h4>
            <h4>Breed: {{ pet.pet_breeds }}</h4>
            More Info
        </div>
      </div>
    </router-link>
  </div>
</div> -->