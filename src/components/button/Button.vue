<template>
  <button
    :class="{
      'vue-button--primary': type === 'primary',
      'vue-button--success': type === 'success',
      'vue-button--warning': type === 'warning',
      'vue-button--danger': type === 'danger',
    }"
    :disabled="disabled"
    class="vue-button"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VueButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.vue-button {
  $r: &;
  position: relative;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid $color-border;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -webkit-appearance: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s;
  @include button-hover-active(#fff, $color-text-regular, 0, 5);
  border: 1px solid $color-border;
  &[disabled] {
    background-color: $color-grey-light;
    border-color: $color-grey-light;
    cursor: no-drop;
  }
  + #{$r} {
    margin-left: 10px;
  }
  &--primary {
    @include button-hover-active($color-primary, #fff, 5, 5);
    &[disabled] {
      @include button-disabled($color-primary, 15);
    }
  }
  &--success {
    @include button-hover-active($color-success, #fff, 5, 5);
    &[disabled] {
      @include button-disabled($color-success, 15);
    }
  }
  &--warning {
    @include button-hover-active($color-warning, #fff, 5, 5);
    &[disabled] {
      @include button-disabled($color-warning, 10);
    }
  }
  &--danger {
    @include button-hover-active($color-danger, #fff, 5, 5);
    &[disabled] {
      @include button-disabled($color-danger, 25);
    }
  }
}
</style>
