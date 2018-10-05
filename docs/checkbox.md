# Checkbox

## Basic usage

Simple two state `true` and `false` checkbox

```example
<template>
  <vue-checkbox v-model="checkbox">Option</vue-checkbox>
</template>
<script>
  export default {
    data () {
      return {
        checkbox: false
      }
    }
  }
</script>
```

## Disabled

```example
<template>
  <vue-checkbox
    v-model="checkbox"
    :disabled="true">Option
  </vue-checkbox>
</template>
<script>
  export default {
    data () {
      return {
        checkbox: false
      }
    }
  }
</script>
```

## Checkbox group

```example
<template>
  <vue-checkbox-group v-model="checkboxGroup">
    <vue-checkbox value="1">Option 1</vue-checkbox>
    <vue-checkbox value="2">Option 2</vue-checkbox>
  </vue-checkbox-group>
</template>
<script>
  export default {
    data () {
      return {
        checkboxGroup: ['2']
      }
    }
  }
</script>
```

## Bordered

```example
<template>
  <vue-checkbox
    v-model="checkbox"
    type="border">
    Option
  </vue-checkbox>
  <vue-checkbox
    v-model="checkbox2"
    type="border"
    :disabled="true">
    Option
  </vue-checkbox>
</template>
<script>
  export default {
    data () {
      return {
        checkbox: false,
        checkbox2: false,
      }
    }
  }
</script>
```

## Checkbox attributes

| Attributes | Description                               | Type               | Accepted values | Default |
| ---------- | ----------------------------------------- | ------------------ | --------------- | ------- |
| `value`    | Value of checkbox when used in group mode | `String`, `Number` | -               | -       |
| `type`     | Type of checkbox                          | `String`           | `border`        | -       |
| `disabled` | Disable the checkbox                      | `Boolean`          | -               | false   |
| `label`    | Label of the checkbox                     | `String`           | -               | -       |
| `name`     | Same as `name` in native checkbox         | `String`           | -               | -       |

## Checkbox events

| Name     | Description                         | Payload |
| -------- | ----------------------------------- | ------- |
| `change` | Triggers when checkbox change value | `value` |

## Checkbox group events

| Name     | Description                               | Payload |
| -------- | ----------------------------------------- | ------- |
| `change` | Triggers when checkbox group change value | `value` |
