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
                        <h4>Liste des Métiers</h4>
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Métiers</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="student in students " :key="student.profileId">
                                <td> <router-link :to="'/metier/'+student.profileId" tag="li" class="list-group-item cursor-pointer"
                                                  exact-active-class="active">
                                    {{ student.headline }}
                                </router-link>
                                </td>
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
    require('./../api')

    export default {
        name: 'Metiers',
        components: {MenuBar},
        watch: {
            resources: function () {
                /**
                 * Apres le contact de l'API httpResponse est modifie ont l'injecte dans le variable students
                 */
            }
        },
        methods: {
            toPage: function (pageNum = 0) {
                this.getProfiles(25, pageNum)
            },
            handleSearchByNameCompagny: function () {
                this.getSearchByNameCompagny(this.name)
            },
            data () {
                return {
                    name: null,
                    fname: null,
                    resources: {}
                }
            }
        },
        computed: {
            students: function () {

                return this.resources.content
            },
            mounted () {
                /*
                 * On appelle l'API /profiles
                 */
                this.getProfiles(25)
            }
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