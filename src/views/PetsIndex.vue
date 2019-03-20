<template>
  <div class="pets-index">


    <!-- content -->

    <h1 class=text-center>Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <!-- portfolio section -->
    <section id="portfolio" class="info-box two-col">
        <div class="container">
            <ul class="row portfolio list-unstyled lightbox" id="grid">
                <!-- project -->
                <li v-for="pet in pets" class="col-xs-6 project">
                    <div class="img-bg-color primary">
                        <img :src="pet.pet_photo" alt="">
                        <!-- project-hover-tools -->
                        <div class="project-hover-tools">
                          <router-link v-bind:to="'/pets/' + pet.pet_id" class="view-btn">
                             <i class="lnr lnr-eye"></i>
                           </router-link>
                        </div><!-- / project-hover-tools -->

                        <!-- project-details -->
                        <div class="project-details"> 
                          <h4>{{ pet.pet_name }}</h4>
                          <p>{{ pet.pet_age }}</p>
                            <p v-if="Array.isArray(pet.pet_breeds)">
                              {{pet.pet_breeds[0]["$t"]}}
                              <!-- <span v-for="breed in pet.pet_breeds">
                                {{breed.$t}}
                              </span> -->
                            </p>
                            <p v-else> 
                              {{pet.pet_breeds.$t }} 
                            </p>
                        </div><!-- / project-details -->
                    </div><!-- / img-bg-color -->
                </li>
                <!-- / project -->

                <!-- sizer -->
                <li class="col-xs-6 shuffle_sizer"></li>      
            </ul> <!-- / projects -->
        </div><!-- / container -->

    </section>
    <!-- / portfolio section -->

    <!-- / content -->

  </div>
</template>


<style>
  div.img-bg-color.primary {
    height: 400px;
  }
  div img {
      height: 100%;
      width: auto;
  }
</style>

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
