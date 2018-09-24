import Input from './input/Input'

const components = [Input]

export default {
  install (Vue, options) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export { Input }
