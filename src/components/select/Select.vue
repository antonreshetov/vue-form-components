<template>
  <div
    v-click-outside="onClosePopper"
    :class="{
      'vue-select--opened': showPopper,
      'vue-select--disabled': disabled
    }"
    class="vue-select"
    @click="togglePopper"
    @keydown.38="scrollByArrow"
    @keydown.40="scrollByArrow"
    @keydown.enter="onEnter"
  >
    <span
      v-if="multiple"
      class="vue-select__tag"
    >
      <span ref="tags">
        <template v-for="(item, index) in selected">
          <span
            v-if="collapseTags && index < 1"
            :key="item.value"
            class="vue-select__tag-item"
          >
            {{ item.label }}
            <i
              class="icon-close"
              @click.stop="onRemoveTag(item)"
            />
          </span>
          <span
            v-if="collapseTags && index === 1"
            :key="item.value"
            class="vue-select__tag-item vue-select__tag-item--collapsed"
          >
            +{{ selected.length - 1 }}
          </span>
          <span
            v-if="!collapseTags"
            :key="item.value"
            class="vue-select__tag-item"
          >
            {{ item.label }}
            <i
              class="icon-close"
              @click.stop="onRemoveTag(item)"
            />
          </span>
        </template>
      </span>
    </span>
    <vue-input
      ref="input"
      v-model="selected.label"

      :readonly="true"
      :placeholder="computedPlaceholder"
      :disabled="disabled"
      :name="name"
    >
      <template slot="suffix">
        <i class="icon-chevron-down" />
      </template>
    </vue-input>
    <vue-popper
      v-if="showPopper"
      ref="popper"
      :append-to="appendEl"
      :full-size="true"
    >
      <vue-input
        v-if="searchable"
        v-model="search"
        placeholder="Search"
        class="vue-select__search"
      />
      <div
        ref="list"
        class="vue-select__option-list"
      >
        <vue-option
          v-for="i in filteredData"
          :key="i.value"
          :value="i.value"
          :label="i.label"
        />
        <div
          v-if="!data.length || !filteredData.length"
          class="vue-select__option-list-empty"
        >
          {{ emptyText }}
        </div>
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

  $_veeValidate: {
    name () {
      return this.name
    },
    value () {
      return this.value
    }
  },

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

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
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
    name: {
      type: String,
      default: ''
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      appendEl: '',
      selected: this.multiple ? [] : {},
      showPopper: false,
      aheadPointer: 0,
      pointerPosTop: null,
      viewportHeight: null,
      tagsHeight: null,
      search: ''
    }
  },

  computed: {
    computedPlaceholder () {
      if (this.multiple) {
        return this.selected.length === 0 ? this.placeholder : ''
      }
      return this.placeholder
    },
    selectedValue () {
      return this.selected.map(i => i.value)
    },
    filteredData () {
      return this.data.filter(item => {
        return item.label.toLowerCase().includes(this.search.toLowerCase())
      })
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

  created () {
    this.setInitValue()
    this.$on('option:select', (e) => {
      if (this.multiple) {
        this.addItem(e)
        this.refreshInputHeight()
        this.$emit('change', this.selectedValue)
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
          return this.data.find(i => i.value === item)
        })
      } else {
        this.selected = this.data.find(item => item.value === this.value)
      }
    },
    togglePopper () {
      if (this.disabled) return

      this.showPopper = !this.showPopper
    },
    onClosePopper (e) {
      const isPopperInput = e.target.classList.contains('vue-input__inner')
      if (this.showPopper && !isPopperInput) this.showPopper = false
    },
    onClosePopper2 () {
      console.warn('sss')
    },
    onEnter () {
      const item = this.data[this.aheadPointer]

      if (this.multiple) {
        this.addItem(item)
        this.$emit('change', this.selectedValue)
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
      this.$emit('change', this.selectedValue)
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
  &__search {
    margin-bottom: 10px;
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
