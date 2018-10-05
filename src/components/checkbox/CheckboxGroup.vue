<template>
  <div class="vue-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VueCheckboxGroup',

  props: {
    modelValue: Array
  },

  model: {
    prop: 'modelValue',
    event: 'change'
  },

  data () {
    return {
      value: []
    }
  },

  created () {
    this.value = this.modelValue
  },

  watch: {
    modelValue () {
      this.value = this.modelValue
    },
    value () {
      this.$emit('change', this.value)
    }
  }
}
</script>
