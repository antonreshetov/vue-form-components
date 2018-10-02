import Vue from 'vue/dist/vue'
import VFC from '../src/components'
import Tabs from './components/Tabs/Tabs.vue'
import TabsItem from './components/Tabs/TabsItem.vue'
import { escape } from 'he'
import marked from 'marked'

Vue.use(VFC)
Vue.component('app-tabs', Tabs)
Vue.component('app-tabs-item', TabsItem)

function sluggify (text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/:.*:/g, '')
    .replace(/ +$/g, '')
    .replace(/(&amp;| & )/g, '-and-')
    .replace(/&(.+?);/g, '')
    .replace(/[\s\W-]+/g, '-')
}

export function parse (markdown, cb) {
  const renderer = new marked.Renderer({ langPrefix: 'lang-' })
  const base = new marked.Renderer({ langPrefix: 'lang-' })
  const vms = []
  let vm

  const example = code => {
    let template = code.match(/<template>(.|\n)*<\/template>/g)
    let params = code.match(/export default\s+((.|\s)+(?=<\/script>))/)

    /* eslint-disable no-eval */
    params = eval(`params = ${params[1]}`)

    const exampleOptions = Object.assign({}, params, {
      template: `<div>${template}</div>`
    })

    const exampleVm = new Vue(exampleOptions).$mount()

    vm = new Vue({
      template: `
      <app-tabs v-model="activeTab">
        <app-tabs-item name="preview"></app-tabs-item>
        <app-tabs-item name="code">
          <pre>
            <code id="code">${escape(code)}</code>
          </pre>
        </app-tabs-item>
      </app-tabs>
      `,
      data () {
        return {
          activeTab: 'preview'
        }
      }
    }).$mount()

    vm.$el.querySelector('.app-tabs__item').appendChild(exampleVm.$el)
    vms.push(vm)

    return `<div id="demo-${vms.length - 1}"></div>`
  }

  renderer.strong = text => {
    return text === 'Note'
      ? `<span class="app-label">${text}</span>`
      : `<strong>${text}</strong>`
  }
  renderer.list = text => `<ul class="app-list">${text}</ul>`
  renderer.link = (href, title, text) => {
    return href.match(/\.md/)
      ? base.link(href.replace(/.md(.*)/, '$1'), title, text)
      : base.link(href, title, text)
  }
  renderer.code = (code, lang, escaped) => {
    return lang === 'example'
      ? example(code)
      : `<div>${base.code(code, lang, escaped)}</div>`
  }
  renderer.hr = () => `<hr class="app-hr">`
  renderer.table = (header, body) => {
    return `<table class="app-table">
        <thead>${header}</thead>
        <tbody>${body}</tbody>
      </table>`
  }
  renderer.heading = (text, level) => {
    return `<h${level} id="${sluggify(text)}"><a href="#${sluggify(
      text
    )}">${text}</a></h${level}>`
  }

  return [marked(markdown, { renderer }), vms]
}
