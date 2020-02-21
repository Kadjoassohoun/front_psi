<template>
    <div class="d-lg-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="card card-inverse col-12">
                <div class="card-block pt-4">
                    <scale-loader :loading="loading" color="#dc3545" class="float-left"></scale-loader>

                    <font-awesome-icon icon="user" size="3x" class="mb-2"></font-awesome-icon>

                    <h6>
                        <font-awesome-icon icon="briefcase"></font-awesome-icon>
                        {{ student.headline }} à <i>{{ student.industryName }}</i>
                    </h6>


                    <table class="table mt-3">
                        <thead>
                        <tr>
                            <th>prenom</th>
                            <th>entreprise</th>

                        </tr>
                        </thead>
                        <tbody>

                        <tr v-for="student in students" :key="student.industryName">
                            <td>{{ student.firstName }}</td>
                            <td>{{ student.industryName }}</td>

                        </tr>
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
        data () {
            return {
                loading: true,
                student: {},
                expertises: {}
            }
        },
        computed: {
            students: function ()
            {
                return this.resources.content
            }
        },
        async mounted () {
            this.resources = (await this.getProfiles(2000)).data

            this.loading = false
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
