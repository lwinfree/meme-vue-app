<template>
  <div class="users-show">

  <div id="header-banner" class="demo-1">
        <div class="banner-content single-page text-center">
          <div class="banner-border">
            <div class="banner-info">
                <h1 class="space-bottom-30">{{ user.name }}</h1>
                <router-link v-bind:to="'/users/me/edit'">Edit my profile</router-link> | 
                <router-link v-bind:to="'/pets'">Search for pets</router-link>
            </div>
          </div>
        </div>
    </div>

    <div  id="page-content" class = "container">
      <section id="project">
        <div class="row">
          <div class="col-sm-6 contact-info text-center space-bottom">
            <h4>
              <i class="fa fa-envelope"></i> {{ user.email }}
            </h4>
            <h4 space-top-30>
              <i class="fa fa-map-marker"></i> {{ user.zipcode }}
            </h4>
          </div>

          <div class="col-sm-6 contact-info text-center space-bottom">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Update my Zipcode
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="exampleModalLabel">Edit Zipcode</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div id="contact-form">
                      <form v-on:submit.prevent="submit(user)" id="contactForm">
                        <div class="form-group">
                          Zipcode: <input class="form-control" type="number" v-model="user.zipcode">
                        </div>
                        <div class="form-group">
                          Password: <input class="form-control" type="password" required v-model="user.password">
                        </div>

                        <button type="submit" class="btn btn-lg btn-primary-filled btn-form-submit">Update My Zipcode</button>
                      </form>
                    </div>

                    <ul>
                      <li class="text-success">{{ message }}</li>
                    </ul>

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="message = ''">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          


        </div>
      </section>

      <section id="portfolio" class="info-box two-col w-shadow">
        <h2 class="text-center">Favorites</h2>
          <div class="pricing-table-button text-center">
            <a href="/pets" class="btn btn-lg btn-primary-filled">Search for pets to add favorites</a>
          </div>
          <ul class="row portfolio list-unstyled lightbox" id="grid" >
            <!-- <div v-for="pet in pets"> -->
              <!-- <router-link v-bind:to="'/pets/' + pet.pet_id"> -->
                
                <li class="col-xs-6 project" v-for="favorite in orderBy(user.favorites, 'pet_info.pet_name')">
                    <div class="img-bg-color show">
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
      </section>
    </div>
  </div>
</template>

<style>
  div.img-bg-color.show {
    height: auto;
  }
  div img {
    height: auto;
    width: auto;
  }
  li.text-success {
    font-size: 1.5em;
    margin-top: 15px;
  }
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      user: {},
      message: ""
    };
  },
  created: function(user) {
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
      console.log(response.data);
      customMasonry();
    });
  },
  methods: {
    submit: function(user) {
      var userParams = {
        zipcode: user.zipcode,
        password: user.password
      };
      axios.patch("/api/users/me", userParams).then(response => {
        console.log("Updated!", response.data);
        this.$router.push("/users/me");
        this.message = "Success!"
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
  }
};
</script>