import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import FormBuilder from '../../src/components/from-builder/FormBuilder.vue'
import schema from './data/formSchema'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()
localVue.use(VeeValidate)

describe('FormBuilder', () => {
  const wrapper = mount(FormBuilder, {
    localVue,
    propsData: {
      model: {
        id: 1,
        name: 'John Doe',
        password: '123',
        passwordConfirm: '123',
        skills: [1],
        email: 'john.do@gmail.com',
        status: true,
        addons: [1, 3],
        delivery: 1,
        comment: 'some text'
      },
      schema
    }
  })
  it('rendered all fields from schema', () => {
    expect(wrapper.exists()).toBe(true)
    schema.fields.map(f => {
      if (f.type !== 'actions') {
        expect(wrapper.find(`[name="${f.name}"]`).exists()).toBe(true)
      } else {
        f.buttons.map((b, i) => {
          expect(wrapper.findAll('.vue-button').at(i).exists()).toBe(true)
        })
      }
    })
  })
  it('check validation', async () => {
    const input = wrapper.find('[name="delivery"]')
    expect(wrapper.vm.errors.count()).toBe(0)
    wrapper.setData({ clonedModel: { ...wrapper.vm.clonedModel, delivery: null } })
    input.trigger('input')
    await flushPromises()
    expect(wrapper.vm.errors.count()).toBe(1)
  })
})
