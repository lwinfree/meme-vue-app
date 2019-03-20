<template>
  <div class="users-show">
    <div  id="page-content" class = "container">

      <section id="project">

        <div class="section-description light">
          <h1>{{ user.name }}</h1>
          <h4>
            <i class="fa fa-envelope"></i> {{ user.email }}
          </h4>
          <h4>
            <i class="fa fa-map-marker"></i> {{ user.zipcode }}
          </h4>
          <h2 class="space-top-30">Favorites:</h2>
        </div>
      </section>

      <section id="portfolio" class="info-box two-col">
        <div class = "container">
          <ul class="row portfolio list-unstyled lightbox" id="grid" >
            <!-- <div v-for="pet in pets"> -->
              <!-- <router-link v-bind:to="'/pets/' + pet.pet_id"> -->
                
                <li class="col-xs-6 project m-project" v-for="favorite in user.favorites">
                    <div class="img-bg-color primary">
                        <!-- / project-link -->
                        <img :src="favorite.pet_info.pet_photo" :alt="favorite.pet_info.pet_name">
                        <!-- / project-image -->

                        <!-- project-hover-tools -->
                        <div class="project-hover-tools">
                            <router-link v-bind:to="'/pets/' + favorite.petfinder_id" class="view-btn">
                                <i class="lnr lnr-eye"></i>
                            </router-link>
                        </div><!-- / project-hover-tools -->

                        <!-- project-details -->
                        <div class="project-details">
                            <h5 class="project-title">{{ favorite.pet_info.pet_name }}</h5>
                        </div><!-- / project-details -->
                    </div><!-- / img-bg-color -->
                </li>


              <!-- </router-link> -->
            <!-- </div> -->
          </ul>
        </div>
      </section>
        
      <router-link v-bind:to="'/users/me/edit'">Edit my profile</router-link> | 
      <router-link v-bind:to="'/pets'">Search for pets</router-link>
      
    </div>



    

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