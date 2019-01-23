import { shallowMount, mount } from '@vue/test-utils'
import Input from '../../src/components/input/Input.vue'

const defaultProps = {
  placeholder: 'text',
  autocomplete: true,
  name: 'text',
  disabled: true,
  readonly: true,
  min: 1,
  max: 1,
  rows: 1
}

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
  it('input attributes is rendered', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps(defaultProps)
    const attrs = wrapper.find('input').attributes()
    expect(attrs.type).toContain('text')
    expect(attrs.autocomplete).toContain('off')
    expect(attrs.placeholder).toContain('text')
    expect(attrs.name).toContain('text')
    expect(attrs.disabled).toContain('disabled')
    expect(attrs.readonly).toContain('readonly')
    expect(attrs.min).toContain(1)
    expect(attrs.max).toContain(1)
  })
  it('textarea attributes is rendered', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps({ ...defaultProps, type: 'textarea' })
    const attrs = wrapper.find('textarea').attributes()
    expect(attrs.type).toContain('textarea')
    expect(attrs.placeholder).toContain('text')
    expect(attrs.name).toContain('text')
    expect(attrs.disabled).toContain('disabled')
    expect(attrs.readonly).toContain('readonly')
    expect(attrs.rows).toContain(1)
  })
  it('is disabled ', () => {
    const wrapper = shallowMount(Input)
    wrapper.setProps({ disabled: true })
    const disabledAttr = wrapper.find('input').attributes().disabled
    expect(disabledAttr).toContain('disabled')
  })
  it('input event (v-model)', () => {
    const wrapper = mount({
      template: `<vue-input v-model="inputVal"></vue-input>`,
      components: {
        [Input.name]: Input
      },
      data () {
        return {
          inputVal: null
        }
      }
    })
    const inputEl = wrapper.find('input')
    inputEl.element.value = 'text'
    inputEl.trigger('input')
    expect(wrapper.vm.inputVal).toBe('text')
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
