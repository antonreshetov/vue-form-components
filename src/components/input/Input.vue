<template>
  <div
    :class="{
      'vue-input': type !== 'textarea',
      'vue-textarea': type === 'textarea',
      'vue-input--prefix': $slots.prefix,
      'vue-input--suffix': $slots.suffix,
      'vue-input--prepend': $slots.prepend,
      'vue-input--append': $slots.append,
    }"
  >
    <div
      v-if="$slots.prefix && type !== 'textarea'"
      class="vue-input__prefix"
    >
      <slot name="prefix" />
    </div>
    <div
      v-if="$slots.suffix && type !== 'textarea'"
      class="vue-input__suffix"
    >
      <slot name="suffix" />
    </div>
    <div
      v-if="$slots.prepend && type !== 'textarea'"
      class="vue-input__prepend"
    >
      <slot name="prepend" />
    </div>
    <input
      v-if="type !== 'textarea'"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      :min="min"
      :autocomplete="[ autocomplete ? 'off' : 'on' ]"
      class="vue-input__inner"
      @input="onInput"
    >
    <textarea
      v-else
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :value="value"
      :rows="rows"
      class="vue-textarea__inner"
    />
    <div
      v-if="this.$slots.append && type !== 'textarea'"
      class="vue-input__append"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueInput',

  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  },

  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    }
  },

  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.vue-input {
  $r: &;
  display: inline-block;
  position: relative;
  font-family: $font;
  font-size: $input-font-size;
  width: 100%;
  &__inner {
    position: relative;
    width: 100%;
    @include form-input-default();
    &[disabled] {
      cursor: no-drop;
      background-color: $color-grey-light;
    }
    &[type='number'] {
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }
  }
  &__prefix,
  &__suffix {
    color: $color-text-regular;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  &__prefix {
    left: 0;
  }
  &__suffix {
    right: 0;
  }
  &__prepend {
    display: table-cell;
    border-left: $input-border;
    border-top: $input-border;
    border-bottom: $input-border;
    color: $color-text-faded-low;
    padding: $input-inner-padding;
    border-top-left-radius: $input-border-radius;
    border-bottom-left-radius: $input-border-radius;
    background-color: $color-grey-light;
    position: relative;
    width: 1px;
    white-space: nowrap;
  }
  &__append {
    display: table-cell;
    border-top: $input-border;
    border-right: $input-border;
    border-bottom: $input-border;
    border-top-right-radius: $input-border-radius;
    border-bottom-right-radius: $input-border-radius;
    padding: $input-inner-padding;
    color: $color-text-faded-low;
    background-color: $color-grey-light;
    position: relative;
    width: 1px;
    white-space: nowrap;
  }
  &--prefix {
    #{$r}__inner {
      padding-left: 40px;
    }
  }
  &--suffix {
    #{$r}__inner {
      padding-right: 40px;
    }
  }
  &--prepend {
    display: inline-table;
    border-collapse: separate;
    #{$r}__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &--append {
    display: inline-table;
    border-collapse: separate;
    #{$r}__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

.vue-textarea {
  &__inner {
    @include form-input-default();
    padding: 5px 15px;
    height: auto;
    line-height: 1.5;
    resize: vertical;
    &[disabled] {
      cursor: no-drop;
      background-color: $color-grey-light;
    }
  }
}
</style>
