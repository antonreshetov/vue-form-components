export default {
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
      placeholder: 'Type password',
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
