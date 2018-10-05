<template>
  <div
    class="app-tabs__item"
    :class="{'app-tabs__item--active': isActive}"
    v-show="isActive">
    <div class="app-tabs__item-body" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTabsItem',

  props: {
    name: String
  },

  computed: {
    isActive () {
      return this.name === this.$parent.value
    }
  }
}
</script>

<style lang="scss">

</style>
