<template>
  <div
    class="vue-select__option"
    :class="{
      'vue-select__option--selected': isSelected,
      'vue-select__option--hovered': index === select.aheadPointer
      }"
    @click="onSelect"
    @mouseover="onHover">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'VueOption',

  inject: ['select'],

  props: {
    value: [String, Number],
    label: [String, Number]
  },

  computed: {
    isSelected () {
      if (this.select.multiple) {
        return !!this.select.selected.find(item => item.value === this.value)
      } else {
        return this.select.value === this.value
      }
    },
    index () {
      if (!Array.isArray(this.select.data)) return
      return this.select.data.findIndex(item => item.value === this.value)
    }
  },

  methods: {
    onSelect () {
      this.select.$emit('option:select', { value: this.value, label: this.label })
    },
    onHover () {
      this.select.aheadPointer = this.index
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';

.vue-select__option {
  cursor: pointer;
  margin: 0 -10px;
  padding: 10px 15px;
  font-size: 14px;
  &--hovered {
    background-color: $color-grey-light;
  }
  &--selected {
    color: $color-primary;
    &:hover {
      background-color: $color-grey-light;
    }
  }
}
</style>
