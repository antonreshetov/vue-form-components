import { shallowMount, mount } from '@vue/test-utils'
import Select from '../../src/components/select/Select.vue'
import Option from '../../src/components/select/option.vue'

const options = [
  { label: 'label 1', value: 1, disabled: false },
  { label: 'label 2', value: 2, disabled: false },
  { label: 'label 3', value: 3, disabled: true }
]

const singleTemplate = `
<vue-select
  v-model="selectedOption"
  :data="options">
  <vue-option
    v-for="i in options"
    :key="i.value"
    :value="i.value"
    :label="i.label"
    :disabled="i.disabled">
  </vue-option>
</vue-select>
`
const multipleTemplate = `
<vue-select
  v-model="selectedOption"
  :data="options"
  :multiple="true">
  <vue-option
    v-for="i in options"
    :key="i.value"
    :value="i.value"
    :label="i.label"
    :disabled="i.disabled">
  </vue-option>
</vue-select>
`

const selectBase = {
  template: singleTemplate,
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data () {
    return {
      options,
      selectedOption: 1
    }
  }
}

const selectMultipleBase = Object.assign({}, selectBase, {
  template: multipleTemplate,
  data () {
    return {
      options,
      selectedOption: []
    }
  }
})

describe('Select.vue', () => {
  it('is rendered', () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        data: options,
        value: 1,
        placeholder: 'placeholder',
        multiple: false,
        disabled: false,
        emptyText: 'text'
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().data).toEqual(options)
    expect(wrapper.props().value).toBe(1)
    expect(wrapper.props().placeholder).toBe('placeholder')
    expect(wrapper.props().multiple).toBe(false)
    expect(wrapper.props().disabled).toBe(false)
    expect(wrapper.props().emptyText).toBe('text')
  })
  it('placeholder is rendered', () => {
    const wrapper = mount(Select, {
      propsData: {
        placeholder: 'placeholder'
      }
    })
    const placeholderAttr = wrapper.find('input').attributes().placeholder
    expect(placeholderAttr).toBe('placeholder')
  })
  it('is disabled', () => {
    const wrapper = mount(Select, {
      propsData: {
        disabled: true
      }
    })
    const disabledAttr = wrapper.find('input').attributes().disabled
    expect(disabledAttr).toBe('disabled')
    expect(wrapper.find('.vue-select--disabled').exists()).toBe(true)
  })
  it('option is disabled', () => {
    const wrapper = mount(selectBase)
    wrapper.trigger('click')
    expect(
      wrapper
        .findAll('.vue-select__option')
        .at(2)
        .attributes().disabled
    ).toBe('disabled')
  })
  it('is render with empty list', () => {
    const selectBaseExtended = Object.assign({}, selectBase, {
      data () {
        return {
          options: [],
          selectedOption: ''
        }
      }
    })
    const wrapper = mount(selectBaseExtended)
    wrapper.trigger('click')
    const emptyEl = wrapper.find('.vue-select__option-list-empty')
    expect(emptyEl.exists()).toBe(true)
    expect(emptyEl.text()).toBe('Empty list')
  })
  it('is rendered with options with init value', () => {
    const wrapper = mount(selectBase)
    wrapper.trigger('click')
    const selectedEl = wrapper.find('.vue-select__option--selected')
    expect(wrapper.find('.vue-select__option').exists()).toBe(true)
    expect(selectedEl.exists()).toBe(true)
    expect(selectedEl.text()).toBe('label 1')
  })
  it('change event (v-model)', done => {
    const wrapper = mount(selectBase)
    wrapper.trigger('click')
    wrapper.vm.$nextTick(() => {
      const option = wrapper.findAll('.vue-select__option').at(1)
      option.trigger('click')
      expect(wrapper.vm.selectedOption).toBe(2)
      done()
    })
  })
  it('change event (v-model) multiple', done => {
    const wrapper = mount(selectMultipleBase)
    wrapper.trigger('click')
    wrapper.vm.$nextTick(() => {
      const option = wrapper.findAll('.vue-select__option').at(0)
      option.trigger('click')
      const tagEl = wrapper.find('.vue-select__tag-item')
      expect(tagEl.exists()).toBe(true)
      expect(tagEl.text()).toBe('label 1')
      expect(wrapper.vm.selectedOption).toEqual([
        { label: 'label 1', value: 1, disabled: false }
      ])
      tagEl.find('i').trigger('click')
      expect(wrapper.vm.selectedOption).toEqual([])
      expect(wrapper.find('.vue-select__tag-item').exists()).toBe(false)
      done()
    })
  })
  it('is rendered as multiple with init value', () => {
    const selectMultipleBaseExtended = Object.assign({}, selectMultipleBase, {
      data () {
        return {
          options,
          selectedOption: [{ label: 'label 1', value: 1, disabled: false }]
        }
      }
    })
    const wrapper = mount(selectMultipleBaseExtended)
    expect(wrapper.find('.vue-select__tag-item').text()).toBe('label 1')
  })
})
