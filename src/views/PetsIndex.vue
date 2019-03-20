<template>
  <div class="pets-index">


    <!-- content -->

    <h1 class=text-center>Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <!-- portfolio section -->
    <section id="portfolio" class="info-box two-col">
        <div class="container">
            <ul class="row portfolio list-unstyled lightbox" id="grid">
                <!-- project -->
                <li v-for="pet in pets" class="col-xs-6 project" data-groups='["illustration"]'>
                    <div class="img-bg-color primary">
                        <a href="single-project.html" class="project-link"></a>
                        <!-- / project-link -->
                        <img :src="pet.pet_photo" alt="">
                        <!-- / project-image -->

                        <!-- project-hover-tools -->
                        <div class="project-hover-tools">
                            <router-link v-bind:to="'/pets/' + pet.pet_id" class="view-btn">
                               <i class="lnr lnr-eye"></i>
                             </router-link>
                            <a href="images/project.jpg" class="open-gallery">
                                <i class="lnr lnr-frame-expand"></i>
                            </a>
                        </div><!-- / project-hover-tools -->

                        <!-- project-details -->
                        <div class="project-details">
                            <h5 v-if="Array.isArray(pet.pet_breeds)">
                              <span v-for="breed in pet.pet_breeds">
                                {{breed.$t}}
                              </span>
                            </h5>
                            <h5 v-else> 
                              {{pet.pet_breeds.$t }} 
                            </h5>
                            <p class="skill">SKILLS</p>
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

<!--     

    <section id="portfolio" class="info-box two-col">
      <div class = "container">
        <ul class="row portfolio list-unstyled lightbox" id="grid" >

          <li class="col-xs-6 project m-project" v-for="pet in pets">
            <div class="img-bg-color primary">

              <img :src="pet.pet_photo" :alt="pet.pet_name">


              <div class="project-hover-tools">
                <router-link v-bind:to="'/pets/' + pet.pet_id" class="view-btn">
                  <i class="lnr lnr-eye"></i>
                </router-link>
              </div>

              <div class="project-details">
                <h5 class="project-title">{{ pet.pet_name }}</h5>
                <p class="skill">Age: {{ pet.pet_age }}</p>
                <p class="skill">Breed: {{ pet.pet_breeds }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section> -->

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