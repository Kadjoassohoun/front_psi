// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import MenuBar from './components/MenuBar'
import router from './router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
  faAddressCard,
  faBriefcase,
  faChartBar,
  faExpand,
  faInfinity,
  faLocationArrow,
  faSearch,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

library.add(faBriefcase, faLocationArrow, faUser, faExpand, faSearch, faAddressCard, faChartBar, faUsers, faInfinity)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  components: {App, MenuBar}
}).$mount('#app')
