<template>
  <div
    class="vue-form__item"
  >
    <div
      v-if="label || form.labelPosition !== 'top'"
      :style="{'flex-basis': form.labelWidth }"
      class="vue-form__item-label"
    >
      {{ label }}
    </div>
    <div class="vue-form__item-content">
      <slot />
      <transition name="form-slide-fade">
        <div
          v-if="!isValid"
          class="vue-form__item-error"
        >
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
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, Array],
      default: () => {}
    },
    field: {
      type: String,
      default: ''
    }
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
