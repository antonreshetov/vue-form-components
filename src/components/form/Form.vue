<template>
  <div
    class="vue-form"
    :class="{
      'vue-form--label-left': labelPosition === 'left',
      'vue-form--label-right': labelPosition === 'right',
      'vue-form--label-top': labelPosition === 'top',
      }">
    <slot></slot>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'

export default {
  name: 'VueForm',

  provide () {
    return {
      form: this
    }
  },

  props: {
    model: Object,
    rules: Object,
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },

  data () {
    return {
      validator: new AsyncValidator(this.rules)
    }
  },

  methods: {
    validate () {
      return new Promise((resolve, reject) => {
        console.warn(this.validator)
        this.validator.validate(this.model, (err, f) => {
          this.$children.forEach(child => {
            if (!this.isChildFormItem(child)) return

            this.setChildOptions(child, '', true, true)
          })

          if (!err) return resolve('Form is valid')

          Object.keys(this.model).forEach(item => {
            err.forEach(err => {
              if (err.field === item) {
                this.$children.forEach(child => {
                  if (!this.isChildFormItem(child)) return

                  if (child.field === item) {
                    this.setChildOptions(child, err.message, false, true)
                  }
                })
              }
            })
            return reject(new Error('Form is not valid'))
          })
        })
      })
    },
    resetValidation () {
      this.$children.forEach(child => {
        if (!this.isChildFormItem(child)) return

        this.setChildOptions(child, '', true, false)
      })
    },
    resetFieldValidation (field) {
      this.$children.forEach(child => {
        if (!this.isChildFormItem(child)) return

        if (child.field === field) {
          this.setChildOptions(child, '', true, false)
        }
      })
    },
    isChildFormItem (child) {
      return child.$options.name === 'VueFormItem'
    },
    setChildOptions (child, message, valid, state) {
      child.validateMessage = message
      child.isValid = valid
      child.validateState = state
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';

.vue-form {
  $r: &;
  width: 400px;
  &--label-right {
    #{$r}__item-label {
      text-align: right;
    }
  }
  &--label-top {
    #{$r}__item {
      flex-flow: column;
      &-label {
        flex-basis: auto !important;
        align-self: flex-start;
        margin-bottom: 15px;
      }
    }
  }
  &__item {
    margin-bottom: 22px;
    display: flex;
    flex-flow: row wrap;
    &-label {
      box-sizing: border-box;
      font-size: 14px;
      flex-basis: 150px;
      color: $color-text-regular;
      padding-right: 20px;
      align-self: center;
    }
    &-content {
      flex-grow: 1;
    }
    &-error {
      position: absolute;
      font-size: 12px;
      color: $color-danger;
      line-height: 20px;
    }
    &-validate {
      overflow: hidden;
    }
  }
}
</style>
