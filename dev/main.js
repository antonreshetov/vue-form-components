import Vue from 'vue'
import App from './App.vue'
import VFC from '../src/components'

Vue.config.productionTip = false
Vue.use(VFC)

new Vue({
  render: h => h(App)
}).$mount('#app')
