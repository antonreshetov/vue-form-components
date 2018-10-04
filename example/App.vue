<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import nav from './navigation'

export default {
  name: 'App',

  data () {
    return {
      nav
    }
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';
</style>
