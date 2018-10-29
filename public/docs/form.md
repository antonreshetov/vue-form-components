# Form

Form may consist of components: `input`, `select`, `checkbox`, `radio`, `button`

## Basic usage

Each of the `form` components must include form item, which is a container for input field

```example
<template>
  <vue-form
    :model="form"
    style="width: 500px;">
    <vue-form-item label="Name">
      <vue-input
        v-model="form.name"
        style="width: 100%">
      </vue-input>
    </vue-form-item>
    <vue-form-item label="City">
      <vue-select
        v-model="form.city"
        :data="options"
        placeholder="Please select">
        <vue-option
          v-for="i in options"
          :key="i.value"
          :value="i.value"
          :label="i.label">
        </vue-option>
      </vue-select>
    </vue-form-item>
    <vue-form-item label="Delivery">
      <vue-radio
        v-model="form.delivery"
        value="1">
        Company 1
      </vue-radio>
      <vue-radio
        v-model="form.delivery"
        value="2">
        Company 2
      </vue-radio>
    </vue-form-item>
    <vue-form-item label="Terms">
      <vue-checkbox v-model="form.terms">I'am agree</vue-checkbox>
    </vue-form-item>
    <vue-form-item>
      <vue-button type="default">Cancel</vue-button>
      <vue-button type="success">Submit</vue-button>
    </vue-form-item>
  </vue-form>
</template>
<script>
  export default {
    data () {
      return {
        options: [{ label: 'City 1', value: 1}, {label: 'City 2', value: 2}],
        form: {
          email: '',
          password: '',
          terms: false,
          delivery: '',
          city: ''
        },
      }
    }
  }
</script>
```

## Alignment

Change the alignment of labels

```example
<template>
  <vue-radio
    v-model="align"
    value="left">
    Left
  </vue-radio>
  <vue-radio
    v-model="align"
    value="right">
    Right
  </vue-radio>
  <vue-radio
    v-model="align"
    value="top">
    Top
  </vue-radio>
  <br><br>
  <vue-form
    style="width: 500px;"
    :label-position="align">
    <vue-form-item label="First Name">
      <vue-input v-model="form.input"></vue-input>
    </vue-form-item>
    <vue-form-item label="Last Name">
      <vue-input v-model="form.input2"></vue-input>
    </vue-form-item>
    <vue-form-item label="Password">
      <vue-input v-model="form.input3"></vue-input>
    </vue-form-item>
  </vue-form>
</template>
<script>
  export default {
    data () {
      return {
        align: 'left',
        form: {
          input: '',
          input2: '',
          input3: ''
        },
      }
    }
  }
</script>
```

## Validation

Form component allows you to verify your input data.

To validate form item just add the `rules` attribute for `vue-form` to pass validation rules, and set `field` attribute for `vue-form-item` as a specific key that needs to be validated.

See more information at [async-validator](https://github.com/yiminghe/async-validator).

```example
<template>
  <vue-form :model="form" :rules="formRules" style="width: 500px;" label-position="right" label-width="150px" ref="form">
    <vue-form-item field="email" label="Email">
      <vue-input v-model="form.email" style="width: 100%"></vue-input>
    </vue-form-item>
    <vue-form-item field="password" label="Password">
      <vue-input v-model="form.password"></vue-input>
    </vue-form-item>
    <vue-form-item field="delivery" label="Delivery">
      <vue-radio v-model="form.delivery" value="1">Radio 1</vue-radio>
      <vue-radio v-model="form.delivery" value="2">Radio 2</vue-radio>
    </vue-form-item>
    <vue-form-item field="city" label="City">
      <vue-select v-model="form.city" :data="options" placeholder="Select">
        <vue-option v-for="i in options" :key="i.value" :value="i.value" :label="i.label"></vue-option>
      </vue-select>
    </vue-form-item>
     <vue-form-item field="terms" label="Terms">
      <vue-checkbox v-model="form.terms">I'm agree</vue-checkbox>
    </vue-form-item>
    <vue-form-item>
      <vue-button @click="onReset">Reset</vue-button>
      <vue-button @click="onSubmit" type="success">Submit</vue-button>
    </vue-form-item>
  </vue-form>
</template>
<script>
  export default {
    data () {
      return {
        options: [{ label: 'City 1', value: 1}, {label: 'City 2', value: 2}],
        form: {
          email: '',
          password: '',
          terms: false,
          delivery: '',
          city: '',
        },
        formRules: {
          email: [
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Email is not correct' }
          ],
          password: [
            { required: true, message: 'Password is required' },
            { min: 3, message: 'Password length must be greater than 3 characters' }
          ],
          terms: [
            { pattern: /true/, message: 'Terms is required' }
          ],
          delivery: [
            { required: true, message: 'Delivery is required' }
          ],
          city: [
            { required: true, message: 'City is required' }
          ]
        }
      }
    },
    methods: {
      async onSubmit () {
        try {
          await this.$refs.form.validate()
        } catch (err) {
          console.warn('Form is not valid')
        }
      },
      onReset () {
        for (let i in this.form) {
          i === 'terms' ? this.form[i] = false : this.form[i] = ''
        }
        this.$refs.form.resetValidation()
      }
    }
  }
</script>
```

## Form attributes

| Attributes       | Description                 | Type     | Accepted values  | Default |
| ---------------- | --------------------------- | -------- | ---------------- | ------- |
| `model`          | Data of form components     | `Object` | -                | -       |
| `rules`          | Validation rules of form    | `Object` | -                | -       |
| `label-position` | Position of label form item | `String` | left, right, top | right   |
| `label-width`    | Width of label form item    | `String` |                  | 100px   |

## Form methods

| Method                        | Description                            | Parameters               |
| ----------------------------- | -------------------------------------- | ------------------------ |
| `validate()`                  | Validate all form item. Return promise |                          |
| `resetValidation()`           | Remove all validation result           |                          |
| `resetFieldValidation(field)` | Remove all validation result           | `field` - Field to reset |

## Form item attributes

| Attributes | Description                   | Type     | Accepted values | Default |
| ---------- | ----------------------------- | -------- | --------------- | ------- |
| `field`    | A key for `model` to validate | `String` | -               | -       |
| `label`    | Label of the form item        | `String` | -               | -       |
