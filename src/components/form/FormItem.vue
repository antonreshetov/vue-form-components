<template>
  <div
    class="vue-form__item">
    <div
      v-if="label || form.labelPosition !== 'top'"
      class="vue-form__item-label"
      :style="{'flex-basis': form.labelWidth }">{{ label }}</div>
    <div class="vue-form__item-content">
      <slot></slot>
      <transition name="form-slide-fade">
        <div class="vue-form__item-error" v-if="!isValid">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueFormItem',

  inject: ['form'],

  props: {
    label: String,
    rules: [Object, Array],
    field: String
  },

  data () {
    return {
      isValid: true,
      validateMessage: '',
      validateState: false
    }
  }
}
</script>

<style lang="scss">
.form-slide-fade-enter-active {
  transition: all 0.2s;
}
.form-slide-fade-leave-active {
  transition: all 0.2s;
}
.form-slide-fade-enter,
.form-slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
