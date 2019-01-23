import { shallowMount, mount } from '@vue/test-utils'
import Checkbox from '../../src/components/checkbox/Checkbox.vue'
import CheckboxGroup from '../../src/components/checkbox/CheckboxGroup.vue'

describe('Checkbox.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        name: 'name',
        label: 'label',
        value: true,
        type: 'border',
        disabled: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().name).toBe('name')
    expect(wrapper.props().label).toBe('label')
    expect(wrapper.props().value).toBe(true)
    expect(wrapper.props().type).toBe('border')
    expect(wrapper.props().disabled).toBe(false)
  })
  it('label is rendered', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        label: 'label'
      }
    })
    expect(wrapper.find('.vue-checkbox__label span').text()).toBe('label')
  })
  it('attributes is rendered', () => {
    const wrapper = shallowMount(Checkbox)
    wrapper.setProps({ name: 'text', disabled: true })
    const attrs = wrapper.find('input').attributes()
    expect(attrs.name).toContain('text')
    expect(attrs.disabled).toContain('disabled')
  })
  it('is checked', () => {
    const wrapper = mount({
      template: `<vue-checkbox v-model="check"></vue-checkbox>`,
      components: {
        [Checkbox.name]: Checkbox
      },
      data () {
        return {
          check: true
        }
      }
    })
    expect(wrapper.find('.vue-checkbox--checked').exists()).toBe(true)
    expect(wrapper.find('.icon-check').exists()).toBe(true)
  })
  it('is disabled', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.find('.vue-checkbox--disabled').exists()).toBe(true)
  })
  it('type is border', () => {
    const wrapper = shallowMount(Checkbox, {
      propsData: {
        type: 'border'
      }
    })
    expect(wrapper.find('.vue-checkbox--bordered').exists()).toBe(true)
  })
})

describe('CheckboxGroup.vue', () => {
  it('is rendered with checkbox and checked initially', () => {
    const wrapper = mount({
      template: `
      <vue-checkbox-group v-model="group">
        <vue-checkbox value="1">Option</vue-checkbox>
      </vue-checkbox-group>
      `,
      components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
      },
      data () {
        return {
          group: ['1']
        }
      }
    })
    expect(wrapper.find('.vue-checkbox-group').exists()).toBe(true)
    expect(wrapper.find('.vue-checkbox').exists()).toBe(true)
    expect(wrapper.find('.vue-checkbox__label').text()).toBe('Option')
    expect(wrapper.find('.vue-checkbox--checked').exists()).toBe(true)
    expect(wrapper.find('.icon-check').exists()).toBe(true)
  })
  it('change event (v-model)', () => {
    const wrapper = mount({
      template: `
      <vue-checkbox-group v-model="group">
        <vue-checkbox value="1">Option</vue-checkbox>
      </vue-checkbox-group>
      `,
      components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
      },
      data () {
        return {
          group: []
        }
      }
    })
    const checkboxInput = wrapper.find('.vue-checkbox input')
    checkboxInput.trigger('change')
    expect(wrapper.vm.group[0]).toBe('1')
    expect(wrapper.find('.vue-checkbox--checked').exists()).toBe(true)
    expect(wrapper.find('.icon-check').exists()).toBe(true)
  })
})
