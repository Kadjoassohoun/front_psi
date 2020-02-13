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
              <th>Année</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="expertise in expertises" :key="expertise.skillId">
              <td>{{ expertise.title }}</td>
              <td>{{ expertise.companyName }}</td>
              <td>{{ expertise.startYear}} <span v-if="expertise.endYear">- {{ expertise.endYear }}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScaleLoader from 'vue-spinner/src/ScaleLoader'
  import MenuBar from './MenuBar'

  export default {
    name: 'ViewStudent',
    components: {MenuBar, ScaleLoader},
    data () {
      return {
        loading: true,
        student: {},
        expertises: {}
      }
    },
    async mounted () {
      let studentID = this.$route.params.id
      this.student = (await this.getProfile(studentID)).data
      this.expertises = (await this.getProfileExpertise(studentID)).data

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
