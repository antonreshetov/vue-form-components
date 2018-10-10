import Input from './input/Input'
import Button from './button/Button'
import Checkbox from './checkbox/Checkbox.vue'
import CheckboxGroup from './checkbox/CheckboxGroup.vue'
import Radio from './radio/Radio.vue'
import Select from './select/Select.vue'
import Option from './select/Option.vue'

const components = [
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Radio,
  Select,
  Option
]

export default {
  install (Vue, options) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export { Input, Button, Checkbox, CheckboxGroup, Radio, Select, Option }
