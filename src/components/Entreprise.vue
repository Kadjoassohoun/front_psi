<template>
    <div class="hello d-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="card card-inverse col-12">
                <div class="card-block pt-4">
                    <i class="fa fa-user fa-3x mb-2"></i>


                    <tr v-for="student in Students" :key="student.profileId">
                        {{ student.industryName }} </tr>
                        <h6><i class="fa fa-briefcase"></i> {{student.locationName}} </h6>


                    <tr v-for="expertise in expertises" :key="expertise.skillId">
                        <td>{{ expertise.skillId}} </td>

                    </tr>

                    <table class="table mt-3">
                        <thead>
                        <tr>

                            <th>Entreprise</th>
                            <th>Localisation</th>
                            <th>Nombre de recrutement</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="student in students" :key="student.industryName">
                            <td>{{ student.industryName}}</td>
                            <td>{{ student.location}}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MenuBar from './MenuBar'

    export default {
        name: 'entreprises',
        components: {MenuBar},
        data () {
            return {
                student: {},
                expertises: {}
            }
        },
        mounted () {
            let studentID = this.$route.params.id
            this.getProfile(studentID)
            this.getProfileExpertise(studentID)
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
