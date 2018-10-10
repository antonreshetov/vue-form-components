<template>
  <div
    class="vue-select"
    :class="{'vue-select--opened': showPopper}"
    @click="togglePopper"
    @keydown.38="scrollByArrow"
    @keydown.40="scrollByArrow"
    @keydown.enter="onEnter">
    <vue-input
      v-model="selectedLabel"
      :readonly="true"
      :placeholder="placeholder">
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
        <slot></slot>
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
    value: [String, Number],
    placeholder: String,
    type: String
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  data () {
    return {
      appendEl: '',
      selectedLabel: '',
      showPopper: false,
      aheadPointer: 0,
      pointerPosTop: null,
      viewportHeight: null
    }
  },

  watch: {
    showPopper (v) {
      if (v) {
        this.$nextTick(() => {
          this.getViewportHeight()
          this.getPointerPosTop()
        })
      }
    }
  },

  created () {
    this.setInitValue()
    this.$on('option:select', (e) => {
      this.$emit('change', e.value)
      this.selectedLabel = e.label
      this.onClosePopper()
    })
  },

  mounted () {
    this.appendEl = this.$el
  },

  methods: {
    setInitValue () {
      if (!this.value) return

      const selected = this.data.find(item => item.value === this.value)
      this.selectedLabel = selected.label
    },
    togglePopper () {
      this.showPopper = !this.showPopper
    },
    onClosePopper () {
      if (this.showPopper) this.showPopper = false
    },
    onEnter () {
      const option = this.data[this.aheadPointer]
      this.$emit('change', option.value)
      this.selectedLabel = option.label
      this.showPopper = false
    },
    getViewportHeight () {
      this.viewportHeight = this.$refs.popper.$el.offsetHeight
    },
    getPointerPosTop () {
      this.pointerPosTop = this.$refs.list.children[this.aheadPointer].offsetTop
    },
    scrollByArrow (e) {
      if (!this.data || !this.showPopper) return

      const optionItemHeight = this.$refs.list.children[0].offsetHeight
      const popperInner = this.$refs.popper.$el.querySelector('.vue-popper__inner')
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
      if (this.pointerPosTop > popperInner.scrollTop + this.viewportHeight - optionItemHeight) {
        popperInner.scrollTop = this.pointerPosTop - this.viewportHeight + optionItemHeight + offsetBottom
      }
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
}
</style>
