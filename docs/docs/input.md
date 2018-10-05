# Input

Input data component

## Basic usage

```example
<template>
  <vue-input placeholder="Please input"></vue-input>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Disabled

```example
<template>
  <vue-input
    placeholder="Please input"
    :disabled="true">
  </vue-input>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Prefix or suffix

You can add for example icons

```example
<template>
  <vue-input placeholder="Please input">
    <template slot="prefix">
      <i class="fas fa-search"></i>
    </template>
  </vue-input>
  <vue-input placeholder="Please input">
    <template slot="suffix">
      <i class="fas fa-search"></i>
    </template>
  </vue-input>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Prepend or append

```example
<template>
  <vue-input placeholder="Please input">
    <template slot="prepend">
      http://
    </template>
  </vue-input>
  <vue-input placeholder="Please input">
    <template slot="append">
      .com
    </template>
  </vue-input>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## As textarea

```example
<template>
  <vue-input
    type="textarea"
    placeholder="Please input">
  </vue-input>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Attributes

| Attributes     | Description                                                            | Type               | Accepted values              | Default |
| -------------- | ---------------------------------------------------------------------- | ------------------ | ---------------------------- | ------- |
| `type`         | Type of input                                                          | `String`           | `text`, `number`, `textarea` | `text`  |
| `value`        | Binding value                                                          | `String`, `Number` | -                            | -       |
| `disabled`     | Disable the input                                                      | `Boolean`          | -                            | false   |
| `placeholder`  | Placeholder of value                                                   | `String`           | -                            | -       |
| `autocomplete` | Same as `autocomplete` in native input                                 | `Boolean`          | -                            | `false` |
| `name`         | Same as `name` in native input                                         | `String`           | -                            | -       |
| `readonly`     | Same as `readonly` in native input                                     | `Boolean`          | -                            | `false` |
| `min`          | Same as `min` in native input                                          | `Number`           | -                            | -       |
| `max`          | Same as `max` in native input                                          | `Number`           | -                            | -       |
| `rows`         | Same as `rows` in native textarea, only work when `type` is `textarea` | `Number`           | -                            | -       |

## Input slots

Only works when type is `text`

| Name      | Description                     |
| --------- | ------------------------------- |
| `prefix`  | content as Input prefix         |
| `suffix`  | content as Input sufix          |
| `prepend` | content to prepend before Input |
| `append`  | content to append before Input  |
