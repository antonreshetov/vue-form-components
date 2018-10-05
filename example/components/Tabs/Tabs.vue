<template>
  <div class="app-tabs">
    <div class="app-tabs__labels">
      <div
        class="app-tabs__labels-item"
        :class="{'active': isActive(label)}"
        v-for="label in tabsLabels"
        :key="label"
        @click="onChangeTab(label)">
        {{ label }}
      </div>
    </div>
    <div class="app-tabs__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTabs',

  props: {
    active: String
  },

  model: {
    event: 'change',
    prop: 'active'
  },

  data () {
    return {
      value: '',
      tabsLabels: []
    }
  },

  created () {
    this.value = this.active
  },

  mounted () {
    this.getTabsLabels()
  },

  watch: {
    active () {
      this.value = this.active
    },
    value () {
      this.$emit('change', this.value)
    }
  },

  methods: {
    onChangeTab (tab) {
      this.$emit('change', tab)
    },
    getTabsLabels () {
      this.tabsLabels = this.$children.map(item => item.name)
    },
    isActive (name) {
      return name === this.value
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/variables.scss';

.app-tabs {
  $r: &;
  &__labels {
    display: flex;
    &-item {
      padding: 5px 5px 5px 0;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid $color-primary;
      }
      + #{$r}__labels-item {
        margin-left: 10px;
        padding: 5px 5px;
      }

    }
  }
  &__item {
    &-body {
      box-sizing: border-box;
    }
    margin-top: 15px;
    pre, code {
      margin-top: 0;
    }
    pre {
      margin-top: -15px;
    }
  }
}
</style>
