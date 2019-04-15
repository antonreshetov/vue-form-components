<template>
  <div
    :class="{
      'vue-form--label-left': labelPosition === 'left',
      'vue-form--label-right': labelPosition === 'right',
      'vue-form--label-top': labelPosition === 'top',
    }"
    class="vue-form"
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'VueForm',

  provide () {
    return {
      form: this
    }
  },

  props: {
    model: {
      type: Object,
      default: () => {}
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.vue-form {
  $r: &;
  width: 400px;
  &--label-right {
    #{$r}__item-label {
      text-align: right;
    }
  }
  &--label-top {
    #{$r}__item {
      flex-flow: column;
      &-label {
        flex-basis: auto !important;
        align-self: flex-start;
        margin-bottom: 15px;
      }
    }
  }
  &__item {
    margin-bottom: 22px;
    display: flex;
    flex-flow: row wrap;
    position: relative;
    &-label {
      box-sizing: border-box;
      font-size: 14px;
      color: $color-text-regular;
      padding-right: 20px;
      align-self: center;
    }
    &-content {
      flex-grow: 1;
    }
    &-error {
      position: absolute;
      font-size: 12px;
      color: $color-danger;
      line-height: 20px;
    }
    &-validate {
      overflow: hidden;
    }
  }
}
</style>
