<template>
  <div class="vue-checkbox-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VueCheckboxGroup',

  model: {
    prop: 'modelValue',
    event: 'change'
  },

  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      value: []
    }
  },

  watch: {
    modelValue () {
      this.value = this.modelValue
    },
    value () {
      this.$emit('change', this.value)
    }
  },

  created () {
    this.value = this.modelValue
  }
}
</script>
