import { shallowMount } from '@vue/test-utils'
import Input from '../../src/components/input/Input.vue'

describe('Input.vue', () => {
  it('is rendered as input', () => {
    const wrapper = shallowMount(Input, {
      propsData: {
        name: 'name',
        type: 'text',
        value: 1,
        min: 1,
        max: 2,
        rows: 4,
        autocomplete: true
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().name).toBe('name')
    expect(wrapper.props().type).toBe('text')
    expect(wrapper.props().value).toBe(1)
    expect(wrapper.props().min).toBe(1)
    expect(wrapper.props().max).toBe(2)
    expect(wrapper.props().rows).toBe(4)
    expect(wrapper.props().autocomplete).toBe(true)
  })
  it('is rendered as textarea ', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps({ type: 'textarea' })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
  it('placeholder is rendered ', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps({ placeholder: 'text' })
    const placeholderAttr = wrapper.find('input').attributes().placeholder
    expect(wrapper.props().placeholder).toBe('text')
    expect(placeholderAttr).toContain('text')
  })
  it('is disabled ', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps({ disabled: true })
    const disabledAttr = wrapper.find('input').attributes().disabled
    expect(disabledAttr).toContain('disabled')
  })
  describe('slots', () => {
    it('prefix is rendered', () => {
      const wrapper = shallowMount(Input, {
        slots: {
          prefix: '<div/>'
        }
      })
      expect(wrapper.find('.vue-input__prefix').exists()).toBe(true)
    })
    it('suffix is rendered', () => {
      const wrapper = shallowMount(Input, {
        slots: {
          suffix: '<div/>'
        }
      })
      expect(wrapper.find('.vue-input__suffix').exists()).toBe(true)
    })
    it('prepend is rendered', () => {
      const wrapper = shallowMount(Input, {
        slots: {
          prepend: '<div/>'
        }
      })
      expect(wrapper.find('.vue-input__prepend').exists()).toBe(true)
    })
    it('append is rendered', () => {
      const wrapper = shallowMount(Input, {
        slots: {
          append: '<div/>'
        }
      })
      expect(wrapper.find('.vue-input__append').exists()).toBe(true)
    })
  })
})
