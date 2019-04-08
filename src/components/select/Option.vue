<template>
  <div
    :class="{
      'vue-select__option--selected': isSelected,
      'vue-select__option--hovered': index === select.aheadPointer
    }"
    :disabled="disabled"
    class="vue-select__option"
    @click="onSelect"
    @mouseover="onHover"
  >
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'VueOption',

  inject: ['select'],

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
      if (!Array.isArray(this.select.data) || !this.select.data.length) return
      return this.select.data.findIndex(item => item.value === this.value)
    }
  },

  methods: {
    onSelect () {
      this.select.$emit('option:select', {
        value: this.value,
        label: this.label,
        disabled: this.disabled
      })
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
  &[disabled] {
    cursor: no-drop !important;
    color: $color-grey;
  }
  &--hovered {
    background-color: $color-grey-light;
    &[disabled] {
      background-color: inherit;
    }
  }
  &--selected {
    color: $color-primary;
    &:hover {
      background-color: $color-grey-light;
    }
  }
}
</style>
