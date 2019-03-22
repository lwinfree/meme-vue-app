<template>
  <div class="pets-index">


    <!-- content -->

    <h1 class=text-center>Found {{ pets.length }} pets in {{ user.zipcode }}:</h1>

    <!-- portfolio section -->


    <section id="portfolio" class="w-shadow">

      <div>
        <h4>
          Search by Breed:
          <input type="text" class="form-control" v-model="breedFilter" list="petBreeds">
        </h4>
      </div>

      <datalist id="petBreeds">
        <option v-for="pet in uniqBreeds">{{pet.breed_list}}</option>
      </datalist>

      <div>
        <button type="button" class="btn btn-sm btn-primary-filled" v-on:click="setSortAttribute('pet_age')">Sort by Age
          <i v-if="sortAttribute == 'pet_age' && sortAscending == 1"><i class="fa fa-sort-up"></i></i>
          <i v-if="sortAttribute == 'pet_age' && sortAscending == -1"><i class="fa fa-sort-down"></i></i>
        </button>
      </div>


      <ul class="row portfolio list-unstyled lightbox" id="grid">
        <li class="col-xs-6 project" v-for="pet in orderBy(filterBy(pets, breedFilter, 'breed_list'), sortAttribute, sortAscending)" v-bind:key="pet.pet_id">
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