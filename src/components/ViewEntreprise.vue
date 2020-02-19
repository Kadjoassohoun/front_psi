<template>
    <div class="d-lg-flex flex-nowrap">
        <MenuBar/>

        <div class="col d-flex flex-wrap">
            <div class="card card-inverse col-12">
                <div class="card-block pt-4">
                    <scale-loader :loading="loading" color="#dc3545" class="float-left"></scale-loader>

                    <font-awesome-icon icon="user" size="3x" class="mb-2"></font-awesome-icon>

                    <h5>{{ student.lastName }} {{ student.firstName }}</h5>
                    <h6>
                        <font-awesome-icon icon="briefcase"></font-awesome-icon>
                        {{ student.headline }} à <i>{{ student.industryName }}</i>
                    </h6>
                    <h6>
                        <font-awesome-icon icon="location-arrow"></font-awesome-icon>
                        {{ student.locationName }}
                    </h6>

                    <table class="table mt-3">
                        <thead>
                        <tr>
                            <th>Poste</th>
                            <th>Entreprise</th>
                            <th>Nombre de recrutement</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="student in orderedStudents" :key="student.profileId">
                            {{ student.industryName }} </tr>
                            <td>{{ student.location }}</td>

                            <td>{{ }} </td>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";

    export default {
        name: "ViewEntreprise"
    }


</script>

<style scoped>

</style>