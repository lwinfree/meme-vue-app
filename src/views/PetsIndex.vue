<template>
  <div class="pets-index">


    <!-- content -->

    <h1 class=text-center>Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <!-- portfolio section -->


    <section id="portfolio" class="w-shadow">
      <ul class="row portfolio list-unstyled lightbox" id="grid">
        <li class="col-xs-6 project" v-for="pet in pets">
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
                    <h4>{{ pet.pet_name }}</h4>
                    <h5>{{ pet.pet_age }}</h5>
                      <h5 v-if="Array.isArray(pet.pet_breeds)">
                        {{pet.pet_breeds[0]["$t"]}}
                      </h5>
                      <h5 v-else> 
                        {{pet.pet_breeds.$t }} 
                      </h5>
                </div><!-- / project-details -->
            </div><!-- / img-bg-color -->
        </li>
      </ul>
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
  div.project-details h4, h5 {
    color: #e0e1e2;
  }

  /*div.project-hover-tools {
    margin: 0, 50px, 0, 0;
  }*/
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
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
