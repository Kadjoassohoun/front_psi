<template>
    <div class="d-lg-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="card card-inverse col-12">
                <div class="card-block pt-4">
                    <scale-loader :loading="loading" color="#dc3545" class="float-left"></scale-loader>

                    <font-awesome-icon icon="user" size="3x" class="mb-2"></font-awesome-icon>

                    <h6>
<<<<<<< HEAD

                        <div id ="mon-texte"> <i>{{student.industryName }}</i></div>
=======
                        <var id="var1"><i>{{student.industryName }}</i></var>
>>>>>>> 14ef1ba6edfd166558fa1866d5732dc37db17b60
                    </h6>

                    <table class="table mt-3">
                        <thead>
                        <tr>
<<<<<<< HEAD
                         <th>Prenom</th>
                              <th>Nom </th>
                                <th>Poste</th>
                        </tr>
                        </thead>
                        <tbody>


                        <tr v-for="student2 in students" :key="student2.industryName">

                            <td v-if="student2.industryName ==student.industryName">{{ student2.firstName }}</td>
                            <td v-if="student2.industryName ==student.industryName">{{ student2.lastName }}</td>
                            <td v-if="student2.industryName ==student.industryName">{{student2.headline}}</td>

                        </tr>



=======
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Headline</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="student in students" :key="student.industryName">
                            <div v-if="student.industryName =='Banking'">
                                <td>{{ student.firstName }}</td>
                                <td>{{ student.lastName }}</td>
                                <td>{{student.headline}}</td>
                            </div>
                        </tr>
>>>>>>> 14ef1ba6edfd166558fa1866d5732dc37db17b60
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import MenuBar from "./MenuBar";
    import ScaleLoader from "vue-spinner/src/ScaleLoader";

    export default {
        name: "ViewEntreprise",
        components: {MenuBar, ScaleLoader},
        created(){
            this.vars = {
                svg:null
            }
        },
        data () {
            return {
                loading: true,
                student: {},
                expertises: {}
                }
            },
        computed: {
<<<<<<< HEAD
            students: function ()
            {

                    return this.resources.content

            },

=======
            students: function (){
                return this.resources.content
                }
            },
        async mounted () {
            let studentID = this.$route.params.id
            this.student = (await this.getProfile(studentID)).data
            this.resources = (await this.getProfiles(2000)).data
            this.loading = false
>>>>>>> 14ef1ba6edfd166558fa1866d5732dc37db17b60
        },
    }
</script>

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