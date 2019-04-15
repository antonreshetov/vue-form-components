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

To validate form item just add the `v-validate` attribute for Input, Select, Radio or Checkbox components to pass validation rules.

See more information at [VeeValidate](https://baianat.github.io/vee-validate/guide/rules.html?ref=vfc).

```example
<template>
  <vue-form :model="form" style="width: 500px;" label-position="right" label-width="150px" ref="form">
    <vue-form-item field="email" label="Email">
      <vue-input v-model="form.email" name="email" v-validate="'required|email'"  style="width: 100%"></vue-input>
    </vue-form-item>
    <vue-form-item field="password" label="Password">
      <vue-input v-model="form.password" name="password" v-validate="'required'"></vue-input>
    </vue-form-item>
    <vue-form-item field="delivery" label="Delivery">
      <vue-radio v-model="form.delivery" name="delivery" v-validate="'required'" value="1">Radio 1</vue-radio>
      <vue-radio v-model="form.delivery" name="delivery" v-validate="'required'" value="2">Radio 2</vue-radio>
    </vue-form-item>
    <vue-form-item field="city" label="City">
      <vue-select v-model="form.city" :data="options" name="city" v-validate="'required'" placeholder="Select">
        <vue-option v-for="i in options" :key="i.value" :value="i.value" :label="i.label"></vue-option>
      </vue-select>
    </vue-form-item>
    <vue-form-item field="terms" label="Terms">
      <vue-checkbox v-model="form.terms" name="terms" v-validate="'required:true'">I'm agree</vue-checkbox>
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
        }
      }
    },
    methods: {
      async onSubmit () {
        const res = await this.$validator.validate()
        if (res) alert('Form is valid')
      },
      onReset () {
        Object.keys(this.form).map(f => {
          if (typeof this.form[f] === 'boolean') {
            this.form[f] = false
          } else {
            this.form[f] = ''
          }
        })
        this.$validator.reset()
      }
    }
  }
</script>
```

## Form attributes

| Attributes       | Description                 | Type     | Accepted values  | Default |
| ---------------- | --------------------------- | -------- | ---------------- | ------- |
| `model`          | Data of form components     | `Object` | -                | -       |
| `label-position` | Position of label form item | `String` | left, right, top | right   |
| `label-width`    | Width of label form item    | `String` |                  | 100px   |

## Form item attributes

| Attributes | Description                   | Type     | Accepted values | Default |
| ---------- | ----------------------------- | -------- | --------------- | ------- |
| `field`    | A key for `model` to validate | `String` | -               | -       |
| `label`    | Label of the form item        | `String` | -               | -       |
