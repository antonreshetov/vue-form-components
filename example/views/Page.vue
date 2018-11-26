<template>
  <div class="page">
    <div class="header">
      <div class="header__logo">
        <router-link to="/">Vue Form Components</router-link></div>
      <div class="header__link">
        <router-link to="/changelog">Changelog</router-link>
        <a href="https://github.com/antonreshetov/vue-form-components" target="_blank">Github</a>
      </div>
    </div>
    <div class="sidebar">
      <nav class="nav">
        <div class="nav__category">Development</div>
        <div
          class="nav__item"
          v-for="item in nav.development"
          :key="item.title">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
        <div class="nav__category">Component</div>
        <div
          class="nav__item"
          v-for="item in nav.components"
          :key="item.title">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
      </nav>
    </div>
    <div class="content" ref="content">
      <div id="html" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import { parse } from '../util'
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
import nav from '../navigation'

export default {
  name: 'Page',

  data () {
    return {
      html: '',
      nav
    }
  },

  mounted () {
    this.buildPage()
  },

  watch: {
    '$route.path' () {
      this.buildPage()
      if (process.env.NODE_ENV === 'production') {
        window.ga('set', 'page', this.$route.path)
        window.ga('send', 'pageview')
      }
    }
  },

  methods: {
    buildPage () {
      const path = process.env.NODE_ENV === 'production' ? '/vue-form-components/docs/' : '/docs/'

      if (this.$route.meta === 'docs') {
        axios.get(`${path}${this.$route.params.component}.md`).then(res => {
          let vms
            ;[this.html, vms] = parse(res.data)
          this.$nextTick(() => {
            for (let i = 0; i < vms.length; i++) {
              document.getElementById(`demo-${i}`).appendChild(vms[i].$el)
            }
            document.querySelectorAll('pre code').forEach(block => {
              hljs.highlightBlock(block)
            })
            this.scrollToTop()
            this.addScrollToHeading()
            this.setScrollByUrlHash()
          })
        })
      } else {
        axios.get(`${path}CHANGELOG.md`).then(res => {
          this.html = parse(res.data)[0]
        })
      }
    },
    addScrollToHeading () {
      const elems = document.querySelectorAll('h2')

      elems.forEach(el => {
        el.children[0].addEventListener('click', () => {
          const url = window.location.hash
          const re = /#[^\/].+/

          if (re.test(url)) {
            window.location.hash = url.replace(re, `#${el.id}`)
          } else {
            window.location.hash = `${window.location.hash}#${el.id}`
          }

          this.$refs.content.scrollTo(0, el.offsetTop - 100)
        })
      })
    },
    setScrollByUrlHash () {
      const url = window.location.hash
      const re = /#[^\/].+/

      if (re.test(url)) {
        const heading = url.match(re)
        const el = document.querySelector(heading)
        this.$refs.content.scrollTo(0, el.offsetTop - 100)
      }
    },
    scrollToTop () {
      this.$refs.content.scrollTop = 0
    }
  }
}
</script>

<style lang="scss">
@import '../assets/variables';
.page {
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-template-rows: 70px 1fr;
  grid-template-areas:
    'header header'
    'sidebar content';
  height: 100vh;
  overflow-y: hidden;
  .header {
    grid-area: header;
    align-items: center;
    display: grid;
    grid-template-columns: 300px 1fr;
    &__logo {
      padding-left: 50px;
      font-size: 18px;
      font-weight: 500;
      a {
        color: inherit;
        &:hover {
          color: inherit;
        }
      }
    }
    &__link {
      text-align: right;
      padding-right: 50px;
      a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        color: inherit;
        + a {
          margin-left: 20px;
        }
      }
    }
  }
  .sidebar {
    grid-area: sidebar;
    padding-left: 50px;
    .nav {
      margin-top: 25px;
      &__category {
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 500;
        &:not(:first-child) {
          margin-top: 15px;
        }
      }
      &__item {
        a {
          display: block;
          padding: 10px 0;
          font-weight: 400;
          color: inherit;
          &.active {
            color: $color-primary;
          }
        }
      }
    }
  }
  .content {
    grid-area: content;
    overflow-y: auto;
    height: calc(100vh - 150px);
    padding: 0 50px 50px 25px;
    table.app-table {
      width: 100%;
      border-collapse: collapse;
      thead {
        tr {
          text-align: left;
        }
        th {
          padding: 15px 10px;
        }
      }
      tr {
        line-height: 1.5em;
      }
      td {
        padding: 15px 10px;
        border-bottom: 1px solid $color-grey;
      }
    }
  }
  .hljs {
    font-family: 'Fira Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    padding: 1.5em;
    line-height: 1.8;
    background-color: $color-grey-light;
  }
  a {
    color: $color-primary;
    text-decoration: none;
    transition: all 0.3s;
    &:hover {
      color: $color-primary;
    }
  }
  p {
    line-height: 1.5em;
  }
  .vue-input,
  .vue-select {
    width: 250px;
  }
  .vue-form {
    .vue-input,
    .vue-select {
      width: 100%;
    }
  }
}
</style>
