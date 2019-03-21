<template>
  <div class="pet-show">

    <!-- content -->

    <div id="page-content">
      <div class="container">
        <!-- project content + sidebar -->
        <section id="project">
            <div class="row">
                <!-- project content area -->
                <div class="col-sm-7">
                    <div class="project-content-area">
                        <img :src="pet.meme_url" alt="" class="space-bottom-30">
                    </div><!-- / project-content-area -->    
                </div>
                <!-- / project-content-area -->

                <!-- project sidebar area -->
                <div class="col-sm-5 project-sidebar right">
                    <div class="section-description light text-center">
                        <h2>{{pet.pet_name}}</h2>
                        
                        <!-- / project-info -->
                        
                        <div>
                          <button v-if="pet.favorite" v-on:click="unfavoritePet()" type="button" class="btn">
                            <i class="fa fa-heart" style="color:#f442b0"></i>
                          </button>
                          <button v-else v-on:click="makeFavoritePet()" type="button" class="btn"><i class="fa fa-heart-o" style="color:#f442b0"></i>
                          </button>
                        </div>

                        <div v-if="Array.isArray(pet.pet_breeds)">
                          <h5 v-for="breed in pet.pet_breeds">
                            {{breed.$t}}
                          </h5>
                        </div>
                        <div v-else> 
                          <h5>{{pet.pet_breeds.$t }}</h5>
                        </div>
                        <h5>{{ pet.pet_age }}</h5>

                    </div><!-- section-description -->

                </div><!-- / col-sm-4 col-md-3 -->
                <!-- / project sidebar area -->
            </div><!-- / row -->

            <div class="row">
              <h4>Description</h4>
              <p>{{pet.pet_description}}</p>
            </div>
        </section>
        <div class="text-center space-top-30">
          <a href="https://www.petfinder.com/">Adopt {{pet.pet_name}} on Petfinder</a> | 
          <a href="/pets">Back to All Pets</a> | 
          <a href="/users/me">User Profile</a>
        </div>
        <!-- / project content + sidebar --> 

      </div><!-- / container -->

    <!-- / content -->
    </div>
  </div>
</template>

<style>
  div.section-description {
    margin-top:50%;
  }
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pet: {},
      user: {},
      favPetfinderIds: {},
      favoritePet: false,
    };
  },
  created: function() {
    axios.get("/api/pets/" + this.$route.params.id).then(response => {
      this.pet = response.data;
      console.log(response.data);
    });
  },
  methods: {
    makeFavoritePet: function() {
      var params = {
        petfinder_id: this.pet.pet_id
      };
      axios.post("/api/favorites", params).then(response => {
        console.log(response.data);
        this.pet.favorite = true;
      }).catch(error => {
        console.log(error.response.data);
      });
    },
    unfavoritePet: function() {
      axios.delete("/api/favorites/" + this.pet.pet_id).then(response => {
        console.log(response.data);
        this.pet.favorite = false;
      }).catch(error => {
        console.log(error.response.data);
      });
    }
  }
};

</script>