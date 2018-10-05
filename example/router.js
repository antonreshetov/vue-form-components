import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Page from './views/Page.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/components/:component',
      component: Page,
      meta: 'docs'
    },
    {
      path: '/changelog',
      component: Page
    }
  ]
})
