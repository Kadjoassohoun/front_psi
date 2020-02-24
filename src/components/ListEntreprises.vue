<template>
    <div class="d-lg-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="col-12 text-left px-lg-0">
                <h1 class="text-red-1 text-uppercase font-weight-bold text-head">Entreprises
                    <scale-loader :loaded="loading" v-if="loading" color="#dc3545" class="d-inline"></scale-loader>
                </h1>
            </div>
            <div class="card card-inverse col-12">
                <div class="card-block">
                    <div class="col-12 pt-3">
                        <h4>Secteurs</h4>

                        <div class="form-group">
                            <div class="input-group">
                                <label class="form-control"> Recherche par nom : </label>
                                <input type="text" class="form-control">
                                <div class="input-text p-2" style="cursor: pointer">
                                    <font-awesome-icon icon="search"></font-awesome-icon>
                                </div>
                            </div>
                        </div>

                        <table class="table table-responsive">
                            <thead>
                            <tr>


                                <th>Secteurs</th>
                                <th>Localisation</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="student in students " :key="student.profileId">
                                <td> <router-link :to="'/entreprise/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                                                  exact-active-class="active">
                                    {{ student.industryName }}
                                </router-link></td>
                                <td>{{ student.locationName }} </td>
                            </tr>



                                <th>#</th>
                                <th>Entreprise</th>
                                <th>Nom</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="company in students" :key="company.profileId">
                                <td>
                                    <a href="#">
                                        <router-link :to="'/entreprise/'+company.profileId" tag="li" class="list-group-item cursor-pointer" exact-active-class="active">
                                            <font-awesome-icon :icon="['fas', 'address-card']"></font-awesome-icon>
                                        </router-link>
                                    </a>
                                </td>

                                <td>
                                    <router-link :to="'/entreprise/'+company.profileId" tag="li" class="list-group-item cursor-pointer"
                                                 exact-active-class="active">{{ company.industryName }}</router-link></td>
                                <td>{{ company.locationName }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation" v-if="!(name&&searchByName.length)">
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
    import _ from "lodash";

    require('./../api')

    export default {
        name: 'ListEntreprises',
        components: {MenuBar, ScaleLoader},
        data () {
            return {
                cpt: ['0','1'],
                loading: true,
                name: null,
                resources: {},
                searchByNameCompagny: {},
                }
        },
        methods: {
            toPage: async function (pageNum = 0) {
                this.loading = true
                this.resources = (await this.getProfiles(20000, pageNum)).data
                this.loading = false
            },
            handleSearchByNameCompagny: async function () {
                this.loading = true
                this.searchByNameCompagny = (await this.getSearchByNameCompagny(this.name)).data
                this.loading = false
            },
        },
        computed: {
            students: function ()
            {
<<<<<<< HEAD


=======
                if (this.name && this.searchByNameCompagny.length)
                {
                    return this.searchByNameCompagny
                }
>>>>>>> 14ef1ba6edfd166558fa1866d5732dc37db17b60
                return _.uniqBy(this.resources.content,'industryName')
            }
        },
        async mounted () {
            /**
             * On appelle l'API /profiles
             */

            this.resources = (await this.getProfiles(25)).data
            this.loading = false
        },
    }

</script>

<style scoped>
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
