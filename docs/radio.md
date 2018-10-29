# Radio

## Basic usage

```example
<template>
  <vue-radio
    v-model="radio"
    value="1">
    Radio 1
  </vue-radio>
  <vue-radio
    v-model="radio"
    value="2">
    Radio 2
  </vue-radio>
</template>
<script>
  export default {
    data () {
      return {
        radio: '1'
      }
    }
  }
</script>
```

## Disabled

```example
<template>
  <vue-radio
    v-model="radio"
    value="1"
    :disabled="true">
    Radio 1
  </vue-radio>
  <vue-radio
    v-model="radio"
    value="2"
    :disabled="true">
    Radio 2
  </vue-radio>
</template>
<script>
  export default {
    data () {
      return {
        radio: '2'
      }
    }
  }
</script>
```

## Bordered

```example
<template>
  <vue-radio
    v-model="radio"
    value="1"
    type="border">
    Radio 1
  </vue-radio>
  <vue-radio
    v-model="radio"
    value="2"
    type="border">
    Radio 2
  </vue-radio>
  <vue-radio
    v-model="radio"
    value="3"
    type="border"
    :disabled="true">
    Radio 3
  </vue-radio>
</template>
<script>
  export default {
    data () {
      return {
        radio: '1',
      }
    }
  }
</script>
```

## Attributes

| Attributes | Description                    | Type               | Accepted values | Default |
| ---------- | ------------------------------ | ------------------ | --------------- | ------- |
| `value`    | Value of radio                 | `String`, `Number` | -               | -       |
| `type`     | Type of radio                  | `String`           | `border`        | -       |
| `disabled` | Disable the radio              | `Boolean`          | -               | `false` |
| `label`    | Label of the radio             | `String`           | -               | -       |
| `name`     | Same as `name` in native radio | `String`           | -               | -       |

## Events

| Name     | Description                      | Payload |
| -------- | -------------------------------- | ------- |
| `change` | Triggers when radio change value | `value` |
