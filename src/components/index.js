import Input from './input/Input'
import Button from './button/Button'

const components = [Input, Button]

export default {
  install (Vue, options) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export { Input }
