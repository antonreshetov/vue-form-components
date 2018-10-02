import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VFC from '../src/components'

Vue.use(VFC)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
