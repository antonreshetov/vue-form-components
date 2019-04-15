# Form builder

Is a schema-based builder to generate form with components and validation

## Basic usage

```example
<template>
  <div>
    <vue-form-builder
      ref="form"
      v-model="model"
      :schema="schema"
      :options="schema.formOptions"
      @action="onAction"
    ></vue-form-builder>
    <!-- <pre>{{ model }}</pre> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {
        id: 1,
        name: 'John Doe',
        password: '',
        passwordConfirm: '',
        skills: [1],
        email: 'john.doe@gmail.com',
        status: true,
        addons: [1, 3],
        delivery: 1,
        comment: 'Some comment'
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'input',
            label: 'ID',
            name: 'input',
            model: 'id',
            readonly: true,
            disabled: true,
            validate: {
              required: true
            }
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Type password',
            model: 'password',
            validate: {
              required: true
            }
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password confirm',
            name: 'passwordConfirm',
            placeholder: 'Confirm password',
            model: 'passwordConfirm',
            validate: {
              required: true,
              confirmed: 'password'
            }
          },
          {
            type: 'select',
            label: 'Skills',
            model: 'skills',
            name: 'skills',
            placeholder: 'Select',
            options: [
              { label: 'label 1', value: 1 },
              { label: 'label 2', value: 2 },
              { label: 'label 3', value: 3 }
            ],
            validate: {
              required: true,
              included: [1, 2]
            }
          },
          {
            type: 'input',
            inputType: 'input',
            label: 'Email',
            name: 'email',
            placeholder: 'Type email',
            model: 'email',
            validate: {
              required: true,
              email: true
            }
          },
          {
            type: 'checkbox',
            label: 'Status',
            name: 'status',
            checkboxLabel: 'Some text',
            model: 'status',
            validate: {
              required: [true]
            }
          },
          {
            type: 'checkbox',
            label: 'Addons',
            name: 'addons',
            model: 'addons',
            options: [
              { label: 'label 1', value: 1 },
              { label: 'label 2', value: 2 },
              { label: 'label 3', value: 3 }
            ],
            validate: {
              required: true
            }
          },
          {
            type: 'radio',
            label: 'Delivery',
            name: 'delivery',
            model: 'delivery',
            options: [
              { label: 'label 1', value: 1 },
              { label: 'label 2', value: 2 },
              { label: 'label 3', value: 3 }
            ],
            validate: {
              required: true
            }
          },
          {
            type: 'input',
            inputType: 'textarea',
            name: 'comment',
            label: 'Comment',
            model: 'comment',
            validate: {
              required: true,
              min: 10
            }
          },
          {
            type: 'actions',
            buttons: [
              {
                type: 'cancel',
                buttonType: 'default',
                buttonLabel: 'Cancel'
              },
              {
                type: 'submit',
                buttonType: 'success',
                buttonLabel: 'Submit'
              }
            ]
          }
        ],
        formOptions: {
          labelPosition: 'right',
          labelWidth: '120px'
        }
      }
    }
  },

  methods: {
    async onAction (e) {
      if (e.type === 'submit') {
        const res = await this.$refs.form.$validator.validate()
        if (res) alert('Form is valid')
      }
    }
  }
}
</script>
```

## Attributes

| Attributes | Description                                  | Type     | Accepted values | Default |
| ---------- | -------------------------------------------- | -------- | --------------- | ------- |
| `model`    | Model for form fields (components `v-model`) | `Object` | -               | -       |
| `schema`   | Schema to generate form                      | `Object` | -               | -       |
| `options`  | Options for <a href="#/components/form">Form</a> component: label position & label width                 | `Object` | -               | -       |

## Schema

| Property              | Description                                                 | Type               | Accepted values                                         |
| --------------------- | ----------------------------------------------------------- | ------------------ | ------------------------------------------------------- |
| `type`                | Type of field                                               | `String`           | input, select, checkbox, radio, actions                 |
| `inputType`           | Type of input                                               | `String`           | text, number, textarea, password and border<sup>1</sup> |
| `buttons`             | Form action buttons. Available if type is `actions`         | `Array`            |                                                         |
| `buttons.type`        | Type of button. Also event emitter type for `@action`       | `String`           | submit, cancel                                          |
| `buttons.buttonType`  | Type of <a href="#/components/button">Button</a> component | `String`           | primary, success, warning, danger                       |
| `buttons.buttonLabel` | Label for button                                           | `String`           |                                                         |
| `name`                | Field detection to start validation and error messages      | `Object`           |                                                         |
| `label`               | Label of the form item                                      | `String`           |                                                         |
| `model`               | Name of property in the model                               | `String`           |                                                         |
| `disabled`            | Disable the field                                           | `Boolean`          |                                                         |
| `readonly`            | Same as `readonly` in native input                          | `Boolean`          |                                                         |
| `placeholder`         | Placeholder of value                                        | `Boolean`          |                                                         |
| `options`             | Options for list components, like Select or Checkbox        | `Array`            |                                                         |
| `options.label`       | Label of option                                             | `String`           |                                                         |
| `options.value`       | Value of option                                             | `String`, `Number` |                                                         |
| `validate`            | VeeValidate <a href="https://baianat.github.io/vee-validate/guide/rules.html?ref=vfc">rules</a>                                                            | `Object`           |                                                         |

 - <sup>1</sup> `border` is available only if `type` is checkbox or radio.

## Form events

| Name     | Description                       | Payload               |
| -------- | --------------------------------- | --------------------- |
| `action` | Triggers when clicked action button | Type of action button |
