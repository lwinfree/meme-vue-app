<template>
  <div class="pet-show">

    <!-- content -->

    <div id="page-content" class="container">
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
                    <div class="section-description light">
                        <h4>{{pet.pet_name}}</h4>
                        <div v-if="Array.isArray(pet.pet_breeds)">
                          <p v-for="breed in pet.pet_breeds">
                            {{breed.$t}}
                          </p>
                        </div>
                        <div v-else> 
                          {{pet.pet_breeds.$t }} 
                        </div>
                        <h4 class="space-top-30">PROJECT INFO</h4>
                        <div class="project-info">
                            <div class="info">
                                <p><i class="lnr lnr-user"></i><span>Client:<a href="#x"> King Studio</a></span></p>
                            </div>
                            <div class="info">
                                <p><i class="lnr lnr-star"></i><span>Skills:<a href="#x"> Graphic Design</a>, <a href="#x"> Branding</a></span></p>
                            </div>
                            <div class="info">
                                <p><i class="lnr lnr-calendar-full"></i><span>Date: Nov. 15, 2016</span></p>
                            </div>
                            <div class="info">
                                <p><i class="lnr lnr-map"></i><span>Location: Miami</span></p>
                            </div>
                        </div><!-- / project-info -->

                        <div class="info-buttons">
                            <a href="" class="btn btn-primary-filled"><i class="lnr lnr-eye"></i><span> View Demo</span></a>
                            <a href="contact.html" class="btn btn-default-filled"><i class="lnr lnr-phone-handset"></i><span> Contact</span></a>
                        </div><!-- / info-buttons -->

                    </div><!-- section-description -->

                </div><!-- / col-sm-4 col-md-3 -->
                <!-- / project sidebar area -->
            </div><!-- / row -->

            <div class="row">
              <h4>PET DESCRIPTION</h4>
              <p>{{pet.pet_description}}</p>
            </div>
        </section>
        <!-- / project content + sidebar --> 

    </div><!-- / container -->

    <!-- / content -->









    <div class = "container">

      <section id="project">
        <div class="row">

          <div class="col-sm-7">
            <div class="project-content-area">
              <div>
                <img :src="pet.meme_url" :alt="pet.pet_name">
              </div>
            </div>
          </div>

          <div class="col-sm-5 project-sidebar right">
            <div class="section-description light">
              <h2>About {{pet.pet_name}}</h2>
              <button v-if="pet.favorite" v-on:click="unfavoritePet()" type="button" class="btn">
                <i class="fa fa-heart" style="color:#f442b0"></i>
              </button>
              <button v-else v-on:click="makeFavoritePet()" type="button" class="btn"><i class="fa fa-heart-o" style="color:#f442b0"></i>
              </button>
            </div>
            <div  class="section-description light">
              <h4>{{ pet.pet_age }}</h4>
              <h4>{{ pet.pet_breeds }}</h4>
              <!-- <h4>{{ user.favorites[0]["petfinder_id"] }}</h4> -->
              <h4>{{ user.fav_petfinder_ids }}</h4>
              <!-- note: gotta fix breeds -->
              <p>{{ pet.pet_description }}</p>
            </div>
          </div>

        </div>
      </section>
      <div class=text-center>
        <a href="https://www.petfinder.com/">Adopt {{pet.pet_name}} on Petfinder</a> | 
        <a href="/pets">Back to All Pets</a> | 
        <a href="/users/me">User Profile</a>
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