<template>
  <div class="home">
    <div class="home__hero">
      <div class="logo">
        <img src="../assets/logo.svg" alt="">
      </div>
      <div class="logo__text">Vue Form Components</div>
      <div class="description">Clean & minimal vue form elements with validation</div>
      <router-link to="/components/install"><vue-button>Get started</vue-button></router-link>
    </div>
  </div>
</template>

<script>
import { Button } from '../../src/components'

export default {
  name: 'Home',

  components: {
    [Button.name]: Button
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  &__hero {
    text-align: center;
  }
  .logo {
    font-size: 42px;
    font-weight: 400;
    &__text {
      font-size: 18px;
      font-weight: 400;
    }
  }
  .description {
    margin: 10px 0 20px 0;
  }
}
</style>
