<template>
  <div class="pets-index">

    <!-- content -->

    <h1 class="text-center space-top-30">Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <!-- portfolio section -->

    <section id="portfolio" class="w-shadow">

        <div class="panel-group">
          <div class="panel">
            <div class="panel-heading text-center">
              <a class="panel-title collapsed" data-toggle="collapse" href="#panel1">Filters</a>
            </div>

            <div id="panel1" class="panel-collapse collapse">
              <div class="row">
                <div class="col-sm-6 text-center">
                  <div>
                    <h5>
                      Search by Breed:
                      <input type="text" class="contact-area" v-model="breedFilter" list="petBreeds">
                    </h5>
                    <button type="button" class="btn btn-xs btn-default" v-on:click="breedFilter=''">Clear</button>
                  </div>
                </div>

                <div class="col-sm-6">
                  <datalist id="petBreeds">
                    <option v-for="pet in uniqBreeds">{{pet.breed_list}}</option>
                  </datalist>

                  <div class="text-center">
                    <button type="button" class="btn btn-md btn-primary" v-on:click="setSortAttribute('age_sort')">Sort by Age
                      <i v-if="sortAttribute == 'age_sort' && sortAscending == 1"><i class="fa fa-sort-up"></i></i>
                      <i v-if="sortAttribute == 'age_sort' && sortAscending == -1"><i class="fa fa-sort-down"></i></i>
                    </button> <br>
                    <button type="button" class="btn btn-xs btn-default" v-on:click="setSortAttribute('')">
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- / panel -->
        </div><!-- / panel-group -->

      <ul class="row portfolio list-unstyled lightbox" id="grid">
        <li class="col-xs-6 project" v-for="pet in orderBy(filterBy(pets, breedFilter, 'breed_list'), sortAttribute, sortAscending)" v-bind:key="pet.pet_id">
            <div class="img-bg-color primary">
                <!-- / project-link -->
                <img class="index" :src="pet.pet_photo" :alt="pet.pet_name">
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
  div img.index {
    height: 100%;
    width: auto;
  }
  div.project-details h4, h5 {
    color: #e0e1e2;
  }
  div.project-details h5 {
    font-size: 20px;
  }
  div.panel-collapse h5 {
    color: #c39d6d;
    font-weight: 400;
  }
  button.btn-primary {
    font-size: 18px;
    padding: 5px;
  }
  /*div.project-hover-tools {
    padding-right: 50px;
  }*/

  /*@media max-width(1200px) {
    div.project-hover-tools {
      padding-right: 30px;
    }
  }*/

</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import uniq from 'lodash/uniq';
import underscore from 'vue-underscore';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      pets: [],
      user: {},
      breedFilter: '',
      sortAttribute: 'breed_list',
      sortAscending: 1,
      breedList: '',
      breeds: ''
    };
  },
  computed: {
    uniqBreeds () {
      return _.uniqBy(this.pets, 'breed_list')
    }
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
  methods: {
    setSortAttribute: function(attribute) {
      if (this.sortAttribute === attribute) {
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
      }
      this.sortAttribute = attribute;
    }
  }
};

</script>

<!-- filterBy(pets, 'Baby', 'pet_age') -->