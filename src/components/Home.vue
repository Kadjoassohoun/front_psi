<template>
  <div class="home d-lg-flex flex-nowrap">
    <MenuBar/>

    <div class="col d-flex flex-wrap">

      <div class="col-12 text-left px-lg-0">
        <h1 class="text-red-1 text-uppercase font-weight-bold text-head">Statistiques
          <scale-loader :loaded="loading" v-if="loading" color="#dc3545" class="d-inline"></scale-loader>
        </h1>
      </div>
      <div class="col-12 d-lg-flex flex-nowrap pl-lg-0">
        <div class="card col-lg-6 col-md-12 chart-block mb-lg-0 mb-2"
             :class="{'fullscreen': screens.entreprises, 'd-none': lodash.size(screens)&&!screens.entreprises}"
             id="entreprises">
          <div class="card-block">
            <h5 class="card-title text-left px-3 py-4">
              Top Entreprises
              <small>(sur un total de {{ count.activities }})</small>
              <font-awesome-icon icon="expand" v-on:click="expandFrame('entreprises')"
                                 ref="secteurs_old" class="float-right"></font-awesome-icon>
            </h5>
            <div id="chart1"></div>
          </div>
        </div>
        <div class="card col-lg-6 col-md-12 pl-lg-0 chart-block"
             :class="{'fullscreen': screens.sectors, 'd-none': lodash.size(screens)&&!screens.sectors}" id="sectors">
          <div class="card-block">
            <h5 class="card-title text-left px-3 py-4">
              Top Secteurs d'Activités
              <small>(sur un total de {{ count.industry }})</small>
              <font-awesome-icon icon="expand" v-on:click="expandFrame('sectors')"
                                 ref="secteurs" class="float-right"></font-awesome-icon>
            </h5>
            <div id="chart2"></div>
          </div>
        </div>
      </div>
      <div class="col-12 pl-lg-0 mt-4 chart-block"
           :class="{'fullscreen': screens.map, 'd-none': lodash.size(screens)&&!screens.map}" id="map">
        <div class="card">
          <div class="card-block">
            <h5 class="card-title text-left px-3 py-4">
              Localisations
              <small>(sur un total {{ count.students }} etudiants)</small>
              <font-awesome-icon icon="expand" v-on:click="expandFrame('map')"
                                 ref="studentMap" class="float-right"></font-awesome-icon>
            </h5>

            <l-map :zoom=3 :center="[47.413220, -1.219482]" :maxZoom="7"
                   style="position: relative;padding: 0;width: 100%;height: 600px;">

              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            :attribute="map.attribution"></l-tile-layer>
              <l-circle v-for="point in map.points" :key="point.coo.lat" :lat-lng="point.coo"
                        :radius="map.circle.radius"
                        color="green">
                <l-tooltip>{{ point.text }}</l-tooltip>
              </l-circle>

            </l-map>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ScaleLoader from 'vue-spinner/src/ScaleLoader'
  import find from 'lodash/find'
  import map from 'lodash/map'
  import size from 'lodash/size'
  import sumBy from 'lodash/sumBy'
  import take from 'lodash/take'
  import MenuBar from './MenuBar'
  import 'leaflet/dist/leaflet.css'
  import * as am4core from '@amcharts/amcharts4/core'
  import * as am4charts from '@amcharts/amcharts4/charts'
  import {LCircle, LMap, LTileLayer, LTooltip} from 'vue2-leaflet'

  require('./../api')
  require('./../assets/vendor/wordLow')

  export default {
    name: 'Home',
    components: {MenuBar, LMap, LTileLayer, LTooltip, LCircle, ScaleLoader},
    data () {
      return {
        loading: true,
        lodash: {
          size
        },
        map: {
          points: [],
          circle: {
            center: {'lat': 47.41322, 'lng': -1.219482},
            radius: 70500
          },
          zoom: 13,
          center: {'lat': 47.41322, 'lng': -1.219482},
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          marker: {'lat': 47.41322, 'lng': -1.219482},
        },
        count: {
          industry: 0,
          activities: 0,
          students: 0
        },
        charts: {},
        screens: {}
      }
    },
    methods: {
      expandFrame: function (id) {
        if (this.screens.hasOwnProperty(id)) {
          this.screens = {}
        }
        else {
          this.screens = {}
          this.screens[id] = 1
        }
      },
      mountTopEnterpriseChart: function (entreprises) {
        this.charts.chart1 = am4core.create('chart1', am4charts.PieChart)
        this.charts.chart1.responsive.enabled = true

        this.charts.chart1.data = take(map(entreprises.data, item => {
          return {
            'competence': item[0],
            'compteur': item[1]
          }
        }), 5)

        var pieSeries = this.charts.chart1.series.push(new am4charts.PieSeries())

        pieSeries.dataFields.value = 'compteur'
        pieSeries.dataFields.category = 'competence'
      },
      mountTopSectorsChart: function (sectors) {
        /**
         * Chart 2: TOP secteurs
         */
        this.charts.chart2 = am4core.create('chart2', am4charts.XYChart)
        this.charts.chart2.responsive.enabled = true
        this.charts.chart2.data = take(map(sectors.data, item => {
          return {
            'category': item[0],
            'value': item[1]
          }
        }), 3)

        let categoryAxis = this.charts.chart2.xAxes.push(new am4charts.CategoryAxis())
        categoryAxis.dataFields.category = 'category'

        var label = categoryAxis.renderer.labels.template
        label.wrap = true
        label.maxWidth = 120

        this.charts.chart2.yAxes.push(new am4charts.ValueAxis())

        var series = this.charts.chart2.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = 'value'
        series.dataFields.categoryX = 'category'
        series.name = 'secteurs_old'
      },
      mountMapChart: function (countries) {
        /**
         * Chart 3: MAP
         */
        for (let i = 0; i < countries.data.length; i++) {
          let featureSearch = find(window.countryLatLong, {
            'country_code': countries.data[i][0].toUpperCase()
          })

          this.map.points.push({
            text: featureSearch.name + ' - ' + countries.data[i][1] + ' Etudiants',
            coo:
              {
                lat: featureSearch.latlng[0],
                lng: featureSearch.latlng[1]
              }
          })
        }
      }
    },
    async mounted () {

      /**
       * ---------------------------------------
       * This charts was created using amCharts 4.
       *
       * For more information visit:
       * https://www.amcharts.com/
       *
       * Documentation is available at:
       * https://www.amcharts.com/docs/v4/
       * ---------------------------------------
       */
      let countries = await this.getGroupByCountryCode()
      this.mountMapChart(countries)

      let topSectors = await this.getGroupByIndustryName()
      this.mountTopSectorsChart(topSectors)

      let topEnterprises = await this.getGroupByCompany()
      this.mountTopEnterpriseChart(topEnterprises)

      this.count.industry = topEnterprises.data.length
      this.count.activities = await topSectors.data.length
      this.count.students = sumBy(countries.data, item => item[1])

      this.loading = false
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "./../assets/home.css";
</style>
