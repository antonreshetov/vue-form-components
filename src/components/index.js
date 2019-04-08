import Input from './input/Input'
import Button from './button/Button'
import Checkbox from './checkbox/Checkbox.vue'
import CheckboxGroup from './checkbox/CheckboxGroup.vue'
import Radio from './radio/Radio.vue'
import Select from './select/Select.vue'
import Option from './select/Option.vue'
import Form from './form/Form.vue'
import FormItem from './form/FormItem.vue'
import VeeValidate from 'vee-validate'

const components = [
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  Option,
  Form,
  FormItem
]

export default {
  install (Vue, options = {}) {
    let veeValidateOptions = {
      events: 'change|input|blur'
    }

    if (options.veeValidate) {
      veeValidateOptions = Object.assign(veeValidateOptions, options.veeValidate)
    }

    Vue.use(VeeValidate, veeValidateOptions)

    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export {
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  Option,
  Form,
  FormItem
}
