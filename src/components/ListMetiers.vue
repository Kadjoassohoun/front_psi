<template>
    <div class="d-lg-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">

            <div class="col-12 my-2 text-right">
                <a :href="api.base + 'profiles/export'"
                   class="btn btn-success">Exporter</a>
            </div>
            <scale-loader :loading="loading" color="#dc3545"></scale-loader>
            <div class="card card-inverse col-12">
                <div class="card-block">
                    <div class="col-12 pt-3">
                        <h4>Liste des métiers</h4>
                        <table class="table table-responsive">
                            <thead>
                            <tr>
                                <th>Métiers</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="student in students " :key="student.profileId">
                                <td> <router-link :to="'/metier/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                                                  exact-active-class="active">
                                   <p id =student.headline >{{ student.headline }}</p>
                                </router-link>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <nav aria-label="Page navigation" v-if="!(name&&searchByNameCompagny.length)">

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
        name: 'ListMetiers',
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
                this.resources = (await this.getProfiles(30, pageNum)).data
                this.loading = false
            },
        },
        computed: {
            students: function ()
            {
                return _.uniqBy(this.resources.content,'headline')
            }
        }
        ,
        async mounted () {
            /*
             * On appelle l'API /profiles
             */
            this.resources = (await this.getProfiles(2000)).data
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