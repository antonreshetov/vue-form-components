<template>
  <label
    class="vue-radio"
    :class="{
      'vue-radio--checked': isChecked,
      'vue-radio--disabled': disabled,
      'vue-radio--bordered': type === 'border'
    }">
    <span class="vue-radio__input">
      <span class="vue-radio__inner"></span>
      <input
        type="radio"
        :id="`vue-radio-${_uid}`"
        :name="name"
        :checked="isChecked"
        :value="value"
        @change="onChange">
    </span>
    <span class="vue-radio__label">
      <span v-if="label">{{ label }}</span>
      <slot v-else></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'VueRadio',

  props: {
    modelValue: {},
    value: [String, Number],
    label: String,
    type: String,
    name: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },

  model: {
    prop: 'modelValue',
    event: 'change'
  },

  computed: {
    isChecked () {
      return this.modelValue === this.value
    }
  },
  methods: {
    onChange () {
      if (this.disabled) return
      return this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.vue-radio {
  $r: &;
  font-size: 14px;
  cursor: pointer;
  color: $color-text-regular;
  + #{$r} {
    margin-left: 10px;
  }
  &__inner {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    display: inline-block;
    border: $input-border;
    margin-right: 10px;
    position: relative;
    top: 2px;
    box-sizing: border-box;
  }
  &--checked {
    #{$r}__inner {
      background-color: $color-primary;
      border-color: $color-primary;
      &::after {
        position: absolute;
        content: '';
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &#{$r}--bordered {
      border-color: $color-primary;
    }
  }
  &--disabled {
    color: $color-grey-dark;
    cursor: no-drop;
    #{$r}__inner {
      background-color: $color-grey-light;
      border-color: $color-grey-dark;
      &::after {
        background-color: $color-grey;
      }
    }
  }
  &--bordered {
    border-color: $color-primary;

    border: $input-border;
    border-radius: $input-border-radius;
    padding: $input-inner-padding;
    line-height: calc(#{$input-height} - 2px);
    height: calc(#{$input-height} - 2px);
    transition: all 0.2s;
    display: inline-block;
  }
  input {
    display: none;
  }
}
</style>
