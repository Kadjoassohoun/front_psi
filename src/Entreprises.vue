<template>
    <div class="hello d-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="col-12 my-2">
                <a :href="api.base + 'expertises/export'" v-if="!(name&&searchByName.length)"
                   class="btn btn-success float-right">Exporter</a>
            </div>

            <div class="card card-inverse col-12">
                <div class="card-block">
                    <div class="col-12 pt-3">
                        <h4>Liste des étudiants</h4>
                        </div>



                    </div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Entreprise</th>
                                <th>Localisation</th>

                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="student in students " :key="student.profileId" >                                {{ student.industryName }} </tr>
                                <h6><i class="fa fa-briefcase"></i> {{student.locationName}} </h6>

                            <tr v-for="expertise in expertises" :key="expertise.skillId">
                                <td>{{ expertise.skillId}} </td>

                            </tr>
                            </tbody>
                        </table>

                        <nav aria-label="Page navigation" v-if="!(name&&searchByNameCompagny.length)">
                            <ul class="pagination">
                                <li class="page-item" :class="{'active': resources.pageable.pageNumber === page}"
                                    v-for="page in resources.totalPages" :key="page">
                                    <span class="page-link" v-on:click="toPage(page)">{{ page }}</span>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>

</template>

<script>
    import MenuBar from './MenuBar'
    import _ from 'lodash';

    // let _ = require('lodash')
    require('./../api')

    export default {
        name: 'entreprises',
        components: {MenuBar},
        watch: {
            resources: function () {
                /**
                 * Apres le contacte de l'API httpResponse est modifie ont l'injecte dans le variable students
                 */
            }
        },

        methods: {
            toPage: function (pageNum = 0) {
                this.getGroupByIndustryName(25, pageNum)
            },
            handleSearchByNameCompagny: function () {
                this.getSearchByNameCompagny(this.name)
            },

        },
        data() {
            return {
                name: null,
                resources: {},
                searchByNameCompagny: {},

            }
        },
        computed: {
            students: function () {
                if (this.name && this.searchByNameCompagny.length) {
                    return this.searchByNameCompagny

                }
                return  _.uniqBy(this.resources.content,'industryName')


            },

            },
            mounted() {

                /*
         * On appelle l'API /profiles
         */
                this.getGroupByIndustryName(20000)
            }
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
