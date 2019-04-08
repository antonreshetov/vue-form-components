<template>
  <div class="vue-checkbox">
    <label
      :class="{
        'vue-checkbox--checked': isChecked,
        'vue-checkbox--bordered': type === 'border',
        'vue-checkbox--disabled': disabled
      }"
      class="vue-checkbox"
    >
      <input
        :id="`vue-checkbox-${_uid}`"
        :checked="isChecked"
        :name="name"
        :disabled="disabled"
        :value="value"
        type="checkbox"
        @change="onChange"
      >
      <div class="vue-checkbox__inner">
        <i
          v-if="isChecked"
          class="icon-check"
        />
      </div>
      <span class="vue-checkbox__label">
        <span v-if="label">{{ label }}</span>
        <slot v-else />
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'VueCheckbox',

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    checked: Boolean,
    value: {
      type: [String, Number, Object, Boolean],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isGroup () {
      return this.$parent.$options.name === 'VueCheckboxGroup'
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
      return false
    }
  },

  methods: {
    onChange () {
      if (this.disabled) return
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
  display: inline-table;
  color: $color-text-regular;
  + #{$r} {
    margin-left: 10px;
  }
  &--checked {
    color: $color-primary;
    #{$r}__inner {
      background-color: $color-primary;
      border-color: $color-primary;
    }
    &#{$r}--bordered {
      border-color: $color-primary;
    }
    &#{$r}--disabled {
      #{$r}__inner {
        border-color: $color-grey-dark;
      }
      i {
        color: $color-grey-dark;
      }
    }
  }
  &--disabled {
    cursor: no-drop;
    #{$r}__inner {
      background-color: $color-grey-light;
      cursor: no-drop;
    }
    #{$r}__label {
      color: $color-grey-dark;
    }
  }
  &--bordered {
    border: $input-border;
    border-radius: $input-border-radius;
    padding: $input-inner-padding;
    line-height: calc(#{$input-height} - 2px);
    box-sizing: content-box;
    transition: all 0.2s;
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
