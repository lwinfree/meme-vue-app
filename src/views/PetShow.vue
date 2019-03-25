<template>
  <div class="pet-show">

    <!-- content -->

    <div id="page-content">
      <div class="container">
        <!-- project content + sidebar -->
        <section id="project">
          <div v-if="pet.no_pet">
            <h1 text-center>There is no information for this pet.
            </h1>
          </div>
          <div class="row" v-else>
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

                <div class="space-top-30" v-if="Array.isArray(pet.pet_breeds)">
                  <h5 v-for="breed in pet.pet_breeds">
                    {{breed.$t}}
                  </h5>
                </div>
                <div class="space-top-30" v-else> 
                  <h5>{{pet.pet_breeds.$t }}</h5>
                </div>
                <div class="space-top-30">
                  <h5>{{ pet.pet_age }}</h5>
                </div>

                <div class="sharing">
                  <h5>
                    Share {{pet.pet_name}} with your friends!
                  </h5>
                  <social-sharing url="'/pets/' + favorite.petfinder_id"
                   title="Check out this adoptable pet"
                   description="This pet is adorable and adoptable!"
                   quote="Don't you want to adopt this pet?"
                   hashtags="adopt,pet,cute"
                   inline-template>
                    <div>
                      <button class="btn btn-sm btn-primary">
                        <network network="email">
                          <i class="fa fa-envelope"></i> Email   
                        </network>
                      </button>
                      <button class="btn btn-sm btn-primary">
                        <network network="facebook">
                          <i class="fa fa-facebook"></i> Facebook   
                        </network>
                      </button>
                      <button class="btn btn-sm btn-primary">
                        <network network="twitter">
                          <i class="fa fa-twitter"></i> Twitter
                        </network>
                      </button>
                    </div>
                  </social-sharing>
                </div>


              </div><!-- section-description -->

            </div><!-- / col-sm-4 col-md-3 -->
            <!-- / project sidebar area -->
          </div><!-- / row -->

            <div class="row description">
              <h4>Description</h4>
              <p>{{pet.pet_description}}</p>
            </div>
        </section>
        <div class="text-center space-top-30">
          <a href="https://www.petfinder.com/" target="_blank">Adopt {{pet.pet_name}} on Petfinder</a> | 
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
  div.space-top-30 h5 {
    color: #000;
  }
  div.description{
    padding: 50px;
  }
  div.sharing {
    text-align: center;
    color: rgb(198, 154, 111);
    margin-top: 25px;
  }
  div.sharing h5{
    color: rgb(198, 154, 111);
  }
</style>

<script>
import axios from "axios";
import SocialSharing from "vue-social-sharing";

export default {
  components: {
    SocialSharing
  },
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