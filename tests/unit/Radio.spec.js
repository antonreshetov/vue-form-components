import { shallowMount, mount } from '@vue/test-utils'
import Radio from '../../src/components/radio/Radio.vue'

describe('Radio.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        value: 1,
        label: 'label',
        type: 'border',
        name: 'name',
        disabled: false
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().value).toBe(1)
    expect(wrapper.props().label).toBe('label')
    expect(wrapper.props().type).toBe('border')
    expect(wrapper.props().name).toBe('name')
    expect(wrapper.props().disabled).toBe(false)
  })
  it('label is rendered (label & slot)', () => {
    const wrapper = shallowMount(Radio, {
      slots: {
        default: '<div/>'
      }
    })
    expect(wrapper.find('.vue-radio__label').contains('div')).toBe(true)
    wrapper.setProps({ label: 'label' })
    expect(wrapper.find('.vue-radio__label span').text()).toBe('label')
  })
  it('is disabled', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.find('.vue-radio--disabled').exists()).toBe(true)
  })
  it('attributes is rendered', () => {
    const wrapper = shallowMount(Radio)
    wrapper.setProps({ name: 'text', disabled: true })
    const attrs = wrapper.find('input').attributes()
    expect(attrs.name).toContain('text')
    expect(attrs.disabled).toContain('disabled')
  })
  it('is checked', () => {
    const wrapper = mount({
      template: '<vue-radio v-model="radio" value="1"></vue-radio>',
      components: {
        [Radio.name]: Radio
      },
      data () {
        return {
          radio: '1'
        }
      }
    })
    expect(wrapper.find('.vue-radio--checked').exists()).toBe(true)
  })
  it('type is border', () => {
    const wrapper = shallowMount(Radio, {
      propsData: {
        type: 'border'
      }
    })
    expect(wrapper.find('.vue-radio--bordered').exists()).toBe(true)
  })
  it('change event (v-model)', () => {
    const wrapper = mount({
      template: `
      <div>
        <vue-radio v-model="radio" value="1"></vue-radio>
        <vue-radio v-model="radio" value="2"></vue-radio>
      </div>
      `,
      components: {
        [Radio.name]: Radio
      },
      data () {
        return {
          radio: '2'
        }
      }
    })
    const radioInput = wrapper.find('.vue-radio input')
    radioInput.trigger('change')
    expect(wrapper.vm.radio).toBe('1')
  })
})
