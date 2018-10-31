# VFC - Vue form components

## Install

### NPM

Installing with npm is recommended and it works seamlessly with webpack.

```js
npm i vfc
```

### Download

You can download latest version from the Github: Download

## Quick start

### Global

To use in your project, just import vfc and install into Vue.

```js
import Vue from 'vue'
import App from './App.vue'
import VFC from 'vfc'
import 'vfc/dist/vfc.css'

Vue.use(VFC)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### On demand

```html
<template>
  <vue-input></vue-input>
</template>

<script>
import 'vfc/dist/vfc.css'
import { Input } from 'vfc'

export default {
  components: {
    [Input.name]: Input
  }
}
</script>
```

Full component list:

```js
import {
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  Option,
  Form,
  FormItem
} from 'vfc'
```

## License

MIT © 2018-present [Anton Reshetov](http://antonreshetov.com)
