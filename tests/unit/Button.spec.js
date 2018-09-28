import { shallowMount } from '@vue/test-utils'
import Button from '../../src/components/button/Button.vue'

describe('Button.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'primary',
        disabled: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().type).toBe('primary')
    expect(wrapper.props().disabled).toBe(false)
  })
  it('all types is rendered', () => {
    const wrapper = shallowMount(Button)
    const types = ['primary', 'success', 'warning', 'danger']
    types.forEach(type => {
      wrapper.setProps({ type })
      expect(wrapper.find(`.vue-button--${type}`))
    })
  })
  it('is disabled', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.attributes().disabled).toBe('disabled')
  })
  it('default slot is rendered', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'text'
      }
    })
    expect(wrapper.text()).toBe('text')
  })
  it('emitted "click"', () => {
    const wrapper = shallowMount(Button)
    wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })
})
