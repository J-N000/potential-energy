// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGoogleCharts from 'vue-google-charts'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'

Vue.config.productionTip = false

const apiKey = 'AIzaSyDq8NHbKHAd2HE3SCtIpxq8yYVD16PzUlY'

Vue.use(VueGoogleMaps, {
  load: {
    key: apiKey,
    libraries: 'places'
  }
})

Vue.use(VueGoogleCharts)
Vue.use(BootstrapVue)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
