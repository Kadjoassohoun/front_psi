import Vue from 'vue'
import axios from 'axios'


Vue.mixin({
  data () {
    return {
      api: {
        cors: 'https://cors-anywhere.herokuapp.com/',
        base: 'http://localhost:3000/'
      }
    }
  },
  methods: {
    getHttp: async function (endpoint) {
      return axios.get( this.api.base + endpoint)
    },

    getProfiles: function (size = 500, page = 0) {
      return this.getHttp('profiles?size=' + (size) + '&page=' + (page))
    },

    getProfile: function (id) {
      return this.getHttp('profiles/' + id)
    },
    getProfileExpertise: function (id) {
      return this.getHttp('profiles/' + id + '/expertises')
    },
    getExpertises: function () {
      return this.getHttp('expertises')
    },
    getGroupByIndustryName: function () {
      return this.getHttp('profiles/groupByIndustry')
    },
    getGroupByCountryCode: function () {
      return this.getHttp('profiles/groupByCountryCode')
    },
    getGroupByCompany: function () {
      return this.getHttp('expertises/groupByCompany')
    },
    groupByCompany: function () {
      return this.getHttp('expertises/groupByCompany', 'expertises')
    },
    getSearchByName: function (name) {
      return this.getHttp('profiles/by-lastname/' + name)
    },
    getSearchByFirstName: function (name) {
      return this.getHttp('profiles/by-firstname/' + name)
    },

    getSearchByNameCompagny: function (name) {
      return this.getHttp('profiles/groupByIndustry/' + name)
    },

  }
})

