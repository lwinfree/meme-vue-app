<template>
  <div id="page-content" class="pet-show">
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