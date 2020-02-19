<template>
    <div class="hello d-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="col-12 my-2">
                <a :href="api.base + 'profiles/export'"
                   class="btn btn-success float-right">Exporter</a>
            </div>

            <div class="card card-inverse col-12">
                <div class="card-block">
                    <div class="col-12 pt-3">
                        <h4>Liste des entreprises</h4>
                        <h5 class="card-title text-left px-3 py-4">
                            Top Secteurs d'Activités

                        </h5>
                        <div class="form-group">
                            <div class="input-group">

                                <label class="form-control">Recherche par nom d'entreprise: </label>
                                <input type="text" class="form-control" v-model="name" @change="handleSearchByNameCompagny">
                                <div class="input-text p-2" style="cursor: pointer"><i class="fa fa-search"></i></div>
                            </div>
                        </div>


                        <table class="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Entreprise</th>
                                <th>Localisation</th>
                                <th>Nombre de recrutement</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="student in students " :key="student.profileId" >
                                <h6><i class="fa fa-briefcase"></i> {{student.industryName}} </h6>

                                <h6><i class="fa fa-briefcase"></i> {{student.locationName}} </h6>

                            </tr>
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
        </div>
    </div>

</template>



<script>
    import MenuBar from './MenuBar'
    import _ from 'lodash'
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";

    // let _ = require('lodash')
    require('./../api')

    export default {
        name: 'Entreprises',

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
                this.getProfiles(25, pageNum)
            },
            handleSearchByNameCompagny: function ()
            {
                this.getSearchByNameCompagny(this.name)
            }
            ,




        data () {
            return {
                name: null,
                fname: null,
                resources: {},
                searchByNameCompagny: {},

            }
        },

        computed:
            {
                students: function () {
                    if (this.name && this.searchByNameCompagny.length)
                    {
                        return this.searchByNameCompagny
                    }

                    return this.resources.content
                },


                mounted () {
            /*
             * On appelle l'API /profiles
             */
            this.getProfiles(25)
        }
    },}
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