import Input from './input/Input'
import Button from './button/Button'
import Checkbox from './checkbox/Checkbox.vue'
import CheckboxGroup from './checkbox/CheckboxGroup.vue'

const components = [Input, Button, Checkbox, CheckboxGroup]

export default {
  install (Vue, options) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export { Input }
