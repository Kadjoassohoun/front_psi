<template>
  <div class="d-lg-flex flex-nowrap">
    <MenuBar/>

    <div class="col d-flex flex-wrap">
      <div class="col-12 my-2 text-right">
        <a :href="api.base + 'profiles/export'"
           class="btn btn-success">Exporter</a>
      </div>

      <div class="col-12 text-left px-lg-0">
        <h1 class="text-red-1 text-uppercase font-weight-bold text-head">Etudiants
          <scale-loader :loaded="loading" v-if="loading" color="#dc3545" class="d-inline"></scale-loader>
        </h1>
      </div>
      <div class="card card-inverse col-12">
        <div class="card-block">
          <div class="col-12 pt-3">
            <h4>Liste des étudiants</h4>

            <div class="form-group">
              <div class="input-group">
                <label class="form-control"> Recherche par nom : </label>
                <input type="text" class="form-control" v-model="name" @change="handleSearchByName">
                <div class="input-text p-2" style="cursor: pointer">
                  <font-awesome-icon icon="search"></font-awesome-icon>
                </div>
              </div>
            </div>

            <table class="table table-responsive">
              <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Localisation</th>
                <th>Poste actuel</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="student in students" :key="student.profileId">

                <td>
                  <router-link :to="'/etudiant/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                               exact-active-class="active">{{ student.firstName }}
                  </router-link>
                </td>

                <td>
                  <router-link :to="'/etudiant/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                               exact-active-class="active">{{ student.lastName }}</router-link></td>
                <td>{{ student.locationName }}</td>
                <td>{{ student.headline }}</td>
              </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation" v-if="!(name&&searchByName.length || searchByFirstName)">
              <ul class="pagination flex-wrap justify-content-center">
                <li class="page-item my-2" :class="{'active': resources.pageable.pageNumber === page}"
                    v-for="page in resources.totalPages" :key="page">
                  <span class="page-link" v-on:click="toPage(page)">{{ page }}</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuBar from './MenuBar'
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

  require('./../api')

  export default {
    name: 'ListStudents',
    components: {MenuBar, ScaleLoader},

    data () {
      return {
        loading: true,
        name: null,
        resources: {},
        searchByName: {},
        searchByFirstName: {}
      }
    },
    methods: {
      toPage: async function (pageNum = 0) {
        this.loading = true
        this.resources = (await this.getProfiles(25, pageNum)).data
        this.loading = false
      },
      handleSearchByName: async function () {
        this.loading = true
        this.searchByName = (await this.getSearchByName(this.name)).data
        this.searchByFirstName = (await this.getSearchByFirstName(this.name)).data
        this.loading = false
      }
    },
    computed: {
      students: function () {
        if (this.name && this.searchByName.length) {
          return this.searchByName
        } else if (this.name && this.searchByFirstName.length) {
          return this.searchByFirstName
        }
        return this.resources.content
      }
    },
    async mounted () {
      /**
       * On appelle l'API /profiles
       */
      this.resources = (await this.getProfiles(25)).data
      this.loading = false
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
