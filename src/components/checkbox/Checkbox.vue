<template>
  <div class="vue-checkbox">
    <label
    class="vue-checkbox"
    :class="{'vue-checkbox--checked': isChecked}">
    <input
      type="checkbox"
      :id="`vue-checkbox-${_uid}`"
      :checked="isChecked"
      :value="value"
      @change="onChange">
    <div class="vue-checkbox__inner">
      <i class="icon-check" v-if="isChecked"></i>
    </div>
    <span v-if="label">{{ label }}</span>
    <span v-else class="vue-checkbox__label">
      <slot></slot>
    </span>
  </label>
  </div>
</template>

<script>
export default {
  name: 'VueCheckbox',

  props: {
    checked: Boolean,
    value: [String, Number, Object],
    name: String,
    label: String
  },

  model: {
    prop: 'checked',
    event: 'change'
  },

  computed: {
    isGroup () {
      if (this.$parent.$options.name === 'VueCheckboxGroup') return true
    },
    isChecked () {
      if (!this.isGroup) return this.checked
      if (this.$parent.modelValue) {
        if (typeof this.value === 'object') {
          return !!this.$parent.modelValue.find(item => item.id === this.value.id)
        }
        if (typeof this.value === 'string' || typeof this.value === 'number') {
          return !!this.$parent.modelValue.find(item => item === this.value)
        }
      }
    }
  },

  methods: {
    onChange () {
      if (!this.isGroup) return this.$emit('change', !this.checked)

      if (!this.isChecked) {
        this.$parent.value.push(this.value)
      } else {
        this.$parent.value.find(item => {
          if (typeof this.value === 'object') {
            this.$nextTick(() => {
              if (item.id === this.value.id) this.$parent.value.splice(this.$parent.value.indexOf(item), 1)
            })
          }
          if (typeof this.value === 'string' || typeof this.value === 'number') {
            this.$nextTick(() => {
              if (item === this.value) this.$parent.value.splice(this.$parent.value.indexOf(item), 1)
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';
@import '../../scss/fonts';

.vue-checkbox {
  $r: &;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  display: table;
  color: $color-text-regular;
  &--checked {
    color: $color-primary;
    #{$r}__inner {
      background-color: $color-primary;
      border-color: $color-primary;
    }
  }
  &:last-of-type {
    margin-right: 0;
  }
  &__label {
    display: table-cell;
    width: 100%;
    line-height: 1.3em;
  }
  &__inner {
    top: 3px;
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border: $input-border;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    i {
      position: absolute;
      color: #fff;
      left: 0;
    }
  }
  input {
    display: none;
  }
}
</style>
