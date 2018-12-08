<template>
  <div
    class="vue-select"
    :class="{
      'vue-select--opened': showPopper,
      'vue-select--disabled': disabled
      }"
    @click="togglePopper"
    @keydown.38="scrollByArrow"
    @keydown.40="scrollByArrow"
    @keydown.enter="onEnter">
    <span
      class="vue-select__tag"
      v-if="multiple">
      <span ref="tags">
        <template v-for="(item, index) in selected">
          <span
            v-if="collapseTags && index < 1"
            class="vue-select__tag-item"
            :key="item.value">
            {{ item.label }}
            <i
              class="icon-close"
              @click.stop="onRemoveTag(item)">
            </i>
          </span>
          <span
            v-if="collapseTags && index === 1"
            :key="item.value"
            class="vue-select__tag-item vue-select__tag-item--collapsed">
            +{{ selected.length - 1 }}
          </span>
          <span
            v-if="!collapseTags"
            class="vue-select__tag-item"
            :key="item.value">
            {{ item.label }}
            <i
              class="icon-close"
              @click.stop="onRemoveTag(item)">
            </i>
          </span>
        </template>
      </span>
    </span>
    <vue-input
      v-model="selected.label"
      :readonly="true"
      :placeholder="computedPlaceholder"
      :disabled="disabled"
      :name="name"
      ref="input">
      <template slot="suffix">
        <i class="icon-chevron-down"></i>
      </template>
    </vue-input>
    <vue-popper
      v-click-outside="onClosePopper"
      :appendTo="appendEl"
      v-if="showPopper"
      :fullSize="true"
      ref="popper">
      <div class="vue-select__option-list" ref="list">
        <div v-if="!data.length" class="vue-select__option-list-empty">{{ emptyText }}</div>
        <slot v-else></slot>
      </div>
    </vue-popper>
  </div>
</template>

<script>
import Input from '../input/Input.vue'
import Popper from '../popper/Popper.vue'
import { clickOutside } from '../../utils/directives'

export default {
  name: 'VueSelect',

  components: {
    [Input.name]: Input,
    [Popper.name]: Popper
  },

  directives: {
    clickOutside
  },

  provide () {
    return {
      select: this
    }
  },

  props: {
    data: Array,
    value: [String, Number, Array],
    placeholder: String,
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'Empty list'
    },
    name: String
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  data () {
    return {
      appendEl: '',
      selected: this.multiple ? [] : {},
      showPopper: false,
      aheadPointer: 0,
      pointerPosTop: null,
      viewportHeight: null,
      tagsHeight: null
    }
  },

  watch: {
    showPopper (v) {
      if (v) {
        this.$nextTick(() => {
          this.getViewportHeight()
          this.getPointerPosTop()
        })
        this.$refs.input.$el.querySelector('input').focus()
      }
    },
    value () {
      this.setInitValue()
      if (this.multiple) this.refreshInputHeight()
    }
  },

  computed: {
    computedPlaceholder () {
      if (this.multiple) {
        return this.selected.length === 0 ? this.placeholder : ''
      }
      return this.placeholder
    }
  },

  created () {
    this.setInitValue()
    this.$on('option:select', (e) => {
      if (this.multiple) {
        this.addItem(e)
        this.refreshInputHeight()
        this.$emit('change', this.selected)
        this.$refs.popper.update()
      } else {
        this.selected = e
        this.$emit('change', e.value)
        this.onClosePopper()
      }
    })
  },

  mounted () {
    this.appendEl = this.$el
    this.refreshInputHeight()
  },

  methods: {
    setInitValue () {
      if (!this.value) return

      if (this.multiple) {
        this.selected = this.value.map(item => {
          return this.data.find(i => i.value === item.value)
        })
      } else {
        this.selected = this.data.find(item => item.value === this.value)
      }
    },
    togglePopper () {
      if (this.disabled) return

      this.showPopper = !this.showPopper
    },
    onClosePopper () {
      if (this.showPopper) this.showPopper = false
    },
    onEnter () {
      const item = this.data[this.aheadPointer]

      if (this.multiple) {
        this.addItem(item)
        this.$emit('change', this.selected)
      } else {
        this.$emit('change', item.value)
      }
      this.showPopper = false
    },
    getViewportHeight () {
      this.viewportHeight = this.$refs.popper.$el.offsetHeight
    },
    getPointerPosTop () {
      this.pointerPosTop = this.$refs.list.children[this.aheadPointer].offsetTop
    },
    getTagsHeight () {
      if (!this.multiple) return

      this.tagsHeight = this.$refs.tags.offsetHeight
    },
    setInputHeight () {
      if (!this.multiple) return

      const inputEL = this.$refs.input.$el.querySelector('input')

      if (this.tagsHeight > 40) {
        inputEL.style.height = this.tagsHeight + 14 + 'px'
      } else {
        inputEL.style.height = 40 + 'px'
      }
    },
    addItem (item) {
      if (item.disabled) return

      const index = this.selected.findIndex(i => i.value === item.value)
      index === -1 ? this.selected.push(item) : this.selected.splice(index, 1)
    },
    scrollByArrow (e) {
      if (!this.data || !this.showPopper) return

      const optionItemHeight = this.$refs.list.children[0].offsetHeight
      const popperInner = this.$refs.popper.$el.querySelector(
        '.vue-popper__inner'
      )
      const offsetTop = 10
      const offsetBottom = 6

      if (e.keyCode === 38) {
        if (this.aheadPointer > 0) this.aheadPointer--
        this.getPointerPosTop()
      }
      if (e.keyCode === 40) {
        if (this.aheadPointer < this.data.length - 1) this.aheadPointer++
        this.getPointerPosTop()
      }
      if (this.pointerPosTop < popperInner.scrollTop) {
        popperInner.scrollTop = this.pointerPosTop - offsetTop
      }
      if (
        this.pointerPosTop >
        popperInner.scrollTop + this.viewportHeight - optionItemHeight
      ) {
        popperInner.scrollTop =
          this.pointerPosTop -
          this.viewportHeight +
          optionItemHeight +
          offsetBottom
      }
    },
    refreshInputHeight () {
      this.$nextTick(() => {
        this.getTagsHeight()
        this.setInputHeight()
      })
    },
    onRemoveTag (tag) {
      const index = this.selected.findIndex(item => item.value === tag.value)
      this.$emit('remove-tag', this.selected[index])
      this.selected.splice(index, 1)
      this.$emit('change', this.selected)
      if (this.showPopper) this.$refs.popper.update()
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/variables';
@import '../../scss/mixins';
@import '../../scss/fonts';

.vue-select {
  $r: &;
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 100%;
  &__tag {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 2px 40px 2px 5px;
    z-index: 10;
    &-item {
      box-sizing: border-box;
      font-size: 14px;
      background-color: $color-grey-light;
      border: $input-border;
      border-radius: $input-border-radius;
      color: $color-text-regular;
      padding: 2px 5px;
      flex-shrink: 0;
      margin: 2px;
      display: inline-block;
      > i {
        position: relative;
        top: 1px;
        color: $color-grey-dark;
        &:hover {
          color: $color-text-regular;
        }
      }
    }
  }
  &__option {
    &-list-empty {
      font-size: 14px;
    }
  }
  .vue-input {
    &__inner {
      cursor: pointer;
    }
    i {
      transition: all 0.2s;
    }
  }
  &--opened {
    .vue-input {
      i {
        transform: rotate(180deg);
      }
    }
  }
  &--disabled {
    .vue-input__suffix {
      i {
        color: $color-grey-dark;
      }
    }
    .vue-input__inner {
      color: $color-grey-dark;
      cursor: no-drop !important;
    }
  }
}
</style>
