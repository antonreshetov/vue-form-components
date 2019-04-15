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
          v-if="showErrorMsg"
          class="vue-form__item-error"
        >
          {{ showErrorMsg }}
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
    field: {
      type: String,
      default: ''
    }
  },

  computed: {
    showErrorMsg () {
      let msg
      if (this.errors.items.length) {
        const item = this.errors.items.find(i => i.field === this.field)
        if (item) msg = item.msg
      }
      return msg
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
