import Vue from 'vue'
import App from './App'

import './assets/css/reset.css'
import './assets/css/border.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
